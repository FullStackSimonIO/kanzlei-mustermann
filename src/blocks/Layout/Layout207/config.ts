import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Layout207: Block = {
  slug: 'layout207',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: false,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'paragraph',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        link(),
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
