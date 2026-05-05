import { useState, useEffect } from 'react'
import rawContent from './content.json'
import { Portfolio } from './portfolio'

// Vite sets BASE_URL to '/pmm-portfolio/' on GitHub Pages and '/' locally.
// Images are stored as absolute paths (/images/...) but must be served
// relative to the base, so we prefix every path at runtime.
const base = import.meta.env.BASE_URL

function withBase(p) {
  if (!p || p.startsWith('http')) return p
  // Encode each segment so spaces, &, —, <> etc. don't break CSS url()
  const encoded = '/' + p.split('/').filter(Boolean).map(encodeURIComponent).join('/')
  return base.replace(/\/$/, '') + encoded
}

const content = {
  ...rawContent,
  profile: {
    ...rawContent.profile,
    photos: rawContent.profile.photos.map(withBase)
  },
  projects: rawContent.projects.map(p => ({
    ...p,
    image: withBase(p.image),
    images: (p.images || []).map(img => ({ ...img, src: withBase(img.src) }))
  }))
}

export default function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return <Portfolio content={content} mobile={mobile} titleScale={1} layout="grid" />
}
