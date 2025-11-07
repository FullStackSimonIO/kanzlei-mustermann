import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Layout484: Block = {
  slug: 'layout484',
  fields: [
    {
      name: 'tagline',
      type: 'text',
      required: false,
    },
    {
      name: 'heading',
      type: 'textarea',
      required: true,
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
  ],
}
