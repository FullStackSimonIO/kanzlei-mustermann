import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'

import { Layout1 } from '@/blocks/Layout/Layout1/config'
import { Layout19 } from '@/blocks/Layout/Layout19/config'
import { Layout207 } from '@/blocks/Layout/Layout207/config'
import { Layout484 } from '@/blocks/Layout/Layout484/config'
import { CTA25 } from '@/blocks/CTA/CTA25/config'
/* PLOP_IMPORT_BLOCK_CONFIG */

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { hero } from '@/heros/config'
import { revalidateDeleteService, revalidateService } from './hooks/revalidateService'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'Angebot',
    plural: 'Angebote',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
  },
  admin: {
    defaultColumns: ['title', 'category', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const categorySlug =
          typeof data?.category === 'object' ? data.category?.slug : data?.category
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'services',
          req,
          categorySlug: categorySlug as string,
        })

        return path
      },
    },
    preview: (data, { req }) => {
      const categorySlug =
        typeof data?.category === 'object' ? (data.category as any)?.slug : data?.category
      return generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'services',
        req,
        categorySlug: categorySlug as string,
      })
    },
    useAsTitle: 'title',
    group: 'Angebote',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Angebottitel',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'service-categories',
      required: false,
      label: 'Kategorie',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [Layout1, Layout19, Layout207, Layout484, CTA25 /* PLOP_BLOCKS */],
            },
          ],
          label: 'Layout',
        },
        {
          fields: [
            {
              name: 'meta',
              label: 'SEO',
              type: 'group',
              fields: [
                MetaTitleField({
                  hasGenerateFn: true,
                }),
                MetaImageField({
                  relationTo: 'media',
                }),
                MetaDescriptionField({}),
                PreviewField({
                  hasGenerateFn: true,
                  titlePath: 'meta.title',
                  descriptionPath: 'meta.description',
                }),
              ],
            },
          ],
          label: 'SEO',
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    beforeChange: [populatePublishedAt],
    afterChange: [revalidateService],
    afterDelete: [revalidateDeleteService],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 864000000,
      },
    },
  },
}
