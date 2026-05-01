#!/usr/bin/env node
// Scans public/images/{profile,work} and updates src/content.json with real image paths.
// Run by the "Apply Uploaded Images" GitHub Action whenever images are pushed.

import fs from 'fs'
import path from 'path'

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])
const CONTENT_PATH = 'src/content.json'

// Maps normalized image filenames (lowercase, no extension) to project IDs.
// Add a new entry here whenever an image filename doesn't match the project ID directly.
const FILENAME_ALIASES = {
  'mobile feed': 'mobile-feed',
  'allocator pro': 'allocator-pro',
  'vtex dev portal': 'devportal',
  'frameroom': 'frameroom',
  'events': 'events',
  'the manuscript': 'manuscript-podcast',
  'vtex vision gif product teaser': 'vtex-vision',
  'tech writing br': 'tech-writing-br',
  're-engagement experiment': 'reengagement',
  'vtex faststore': 'faststore',
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => EXTENSIONS.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
    .sort()
}

// Resolves a work image filename to its project ID.
// 1. Try the alias map (lowercase filename stem)
// 2. Fall back to the raw filename stem (handles future files already named by ID)
function resolveProjectId(filename) {
  const stem = path.basename(filename, path.extname(filename))
  const normalized = stem.toLowerCase()
  return FILENAME_ALIASES[normalized] ?? stem
}

const content = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'))
let changed = false

// ── Profile photos ────────────────────────────────────────────
const profileImages = listImages('public/images/profile')
if (profileImages.length > 0) {
  const paths = profileImages.map(f => `/images/profile/${f}`)
  content.profile.photos = paths
  console.log(`Profile: mapped ${paths.length} image(s) →`, paths)
  changed = true
} else {
  console.log('Profile: no images found, keeping existing values')
}

// ── Work / project cards ──────────────────────────────────────
const workImages = listImages('public/images/work')
if (workImages.length > 0) {
  const byId = {}
  workImages.forEach(f => {
    const id = resolveProjectId(f)
    byId[id] = `/images/work/${f}`
  })

  content.projects = content.projects.map(project => {
    if (byId[project.id]) {
      console.log(`Work: matched "${project.id}" → ${byId[project.id]}`)
      changed = true
      return { ...project, image: byId[project.id] }
    }
    return project
  })

  const unmatched = workImages.filter(f => {
    const id = resolveProjectId(f)
    return !content.projects.some(p => p.id === id)
  })
  if (unmatched.length) {
    console.warn('Work: no matching project ID for:', unmatched.join(', '))
  }
} else {
  console.log('Work: no images found, keeping existing values')
}

if (changed) {
  fs.writeFileSync(CONTENT_PATH, JSON.stringify(content, null, 2) + '\n')
  console.log('\ncontent.json updated successfully.')
} else {
  console.log('\nNo changes made to content.json.')
}
