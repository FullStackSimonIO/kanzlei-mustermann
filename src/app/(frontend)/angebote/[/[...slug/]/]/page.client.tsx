'use client'

import { useEffect } from 'react'

export default function PageClient() {
  useEffect(() => {
    document.documentElement.classList.add('light')
  }, [])

  return null
}
