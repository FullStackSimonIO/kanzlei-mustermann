import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug | string, string>> = {
  posts: '/posts',
  pages: '',
  services: '/angebote',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
  categorySlug?: string
}

export const generatePreviewPath = ({ collection, slug, categorySlug }: Props) => {
  let path = `${collectionPrefixMap[collection as string]}/${slug}`

  // Für Services: /angebote/[kategorie]/[slug] oder /angebote/[slug]
  if ((collection as string) === 'services' && categorySlug) {
    path = `/angebote/${categorySlug}/${slug}`
  }

  const encodedParams = new URLSearchParams({
    slug,
    collection: String(collection),
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
