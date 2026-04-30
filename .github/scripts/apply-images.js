#!/usr/bin/env node
// Scans public/images/{profile,work} and updates src/content.json with real image paths.
// Run by the "Apply Uploaded Images" GitHub Action whenever images are pushed.

const fs = require('fs')
const path = require('path')

const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])
const CONTENT_PATH = 'src/content.json'

function listImages(dir) {
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .filter(f => EXTENSIONS.has(path.extname(f).toLowerCase()) && !f.startsWith('.'))
    .sort()
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
  // Build a lookup: project-id → image path
  const byId = {}
  workImages.forEach(f => {
    const id = path.basename(f, path.extname(f))
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
    const id = path.basename(f, path.extname(f))
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
