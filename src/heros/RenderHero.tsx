import React from 'react'

import type { Page, Post } from '@/payload-types'
import { PostHero } from './PostHero'

const heroes = {
  postHero: PostHero,
}

export const RenderHero: React.FC<Page['hero'] & { post?: Post }> = (props) => {
  const { type, post } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Special case for PostHero which requires post prop
  if (type === 'postHero' && post) {
    return <PostHero post={post} />
  }

  // @ts-expect-error - Hero types may vary
  return <HeroToRender {...props} />
}
