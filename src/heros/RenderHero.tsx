import React from 'react'

import type { Page, Post } from '@/payload-types'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PostHero } from './PostHero'
import { HeroHeader1 } from './HeroHeader1'
import { HeroHeader9 } from './HeroHeader9'
import { HeroHeader62 } from './HeroHeader62'
import { HeroHeader102 } from './HeroHeader102'

const heroes = {
  postHero: PostHero,
  heroheader1: HeroHeader1,
  heroheader9: HeroHeader9,
  heroheader62: HeroHeader62,
  heroheader102: HeroHeader102,
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
