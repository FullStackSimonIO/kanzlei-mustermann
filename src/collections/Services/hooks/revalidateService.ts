import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const revalidateService: CollectionAfterChangeHook<any> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const categorySlug = typeof doc.category === 'object' ? doc.category?.slug : doc.category
      const path = categorySlug ? `/angebote/${categorySlug}/${doc.slug}` : `/angebote/${doc.slug}`

      payload.logger.info(`Revalidating service at path: ${path}`)

      revalidatePath(path)
      revalidatePath('/angebote')
      revalidateTag('services-sitemap')
    }

    // If the service was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldCategorySlug =
        typeof previousDoc.category === 'object' ? previousDoc.category?.slug : previousDoc.category
      const oldPath = oldCategorySlug
        ? `/angebote/${oldCategorySlug}/${previousDoc.slug}`
        : `/angebote/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidatePath('/angebote')
      revalidateTag('services-sitemap')
    }
  }
  return doc
}

export const revalidateDeleteService: CollectionAfterDeleteHook<any> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const categorySlug = typeof doc?.category === 'object' ? doc.category?.slug : doc.category
    const path = categorySlug ? `/angebote/${categorySlug}/${doc?.slug}` : `/angebote/${doc?.slug}`
    revalidatePath(path)
    revalidatePath('/angebote')
    revalidateTag('services-sitemap')
  }

  return doc
}
