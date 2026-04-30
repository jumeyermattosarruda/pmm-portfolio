import { useState, useEffect } from 'react'
import content from './content.json'
import { Portfolio } from './portfolio'

export default function App() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return <Portfolio content={content} mobile={mobile} titleScale={1} layout="grid" />
}
