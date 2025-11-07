import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  // Generate params for services with categories
  const servicesWithCategory = await payload.find({
    collection: 'services',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
      category: true,
    },
  })

  const params = servicesWithCategory.docs
    ?.map(({ slug, category }) => {
      const categorySlug = typeof category === 'object' ? category?.slug : category
      if (categorySlug) {
        return { slug: [categorySlug, slug] }
      }
      return { slug: [slug] }
    })
    .filter(Boolean)

  // Add empty slug for /angebote listing
  params?.push({ slug: [] })

  return params
}

type Args = {
  params: Promise<{
    slug?: string[]
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = [] } = await paramsPromise

  // Handle different URL patterns:
  // /angebote - listing (slug: [])
  // /angebote/[kategorie] - category listing (slug: ['kategorie'])
  // /angebote/[slug] - service detail (slug: ['slug'])
  // /angebote/[kategorie]/[slug] - service detail with category (slug: ['kategorie', 'slug'])

  let service = null
  let isListing = false

  if (slug.length === 0) {
    // /angebote - listing page
    isListing = true
  } else if (slug.length === 1) {
    // Could be /angebote/[slug] or /angebote/[kategorie]
    // Try to find as service first, then as category
    service = await queryServiceBySlug({
      slug: slug[0] || '',
      draft,
    })

    if (!service) {
      // It's a category listing
      isListing = true
    }
  } else if (slug.length === 2) {
    // /angebote/[kategorie]/[slug]
    service = await queryServiceBySlug({
      slug: slug[1] || '',
      categorySlug: slug[0] || '',
      draft,
    })
  }

  // If it's a listing, return empty for now (you can add a services listing page later)
  if (isListing || !service) {
    const url = '/angebote/' + slug.join('/')
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = service

  return (
    <article className="pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={'/angebote/' + slug.join('/')} />

      {/* Always enable LivePreviewListener to catch updates from admin panel */}
      <LivePreviewListener />

      <RenderHero {...hero} />
      {/* @ts-expect-error Services blocks may differ from Pages blocks */}
      <RenderBlocks blocks={layout || []} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = [] } = await paramsPromise

  let service = null

  if (slug.length === 1) {
    service = await queryServiceBySlug({
      slug: slug[0] || '',
      draft: false,
    })
  } else if (slug.length === 2) {
    service = await queryServiceBySlug({
      slug: slug[1] || '',
      categorySlug: slug[0] || '',
      draft: false,
    })
  }

  return generateMeta({ doc: service })
}

const queryServiceBySlug = cache(
  async ({
    slug,
    categorySlug,
    draft,
  }: {
    slug: string
    categorySlug?: string
    draft: boolean
  }) => {
    const payload = await getPayload({ config: configPromise })

    let where: any = {
      slug: {
        equals: slug,
      },
    }

    if (categorySlug) {
      where = {
        and: [
          {
            slug: {
              equals: slug,
            },
          },
          {
            'category.slug': {
              equals: categorySlug,
            },
          },
        ],
      }
    }

    const result = await payload.find({
      collection: 'services',
      draft,
      limit: 1,
      pagination: false,
      overrideAccess: draft,
      where,
    })

    return result.docs?.[0] || null
  },
)
