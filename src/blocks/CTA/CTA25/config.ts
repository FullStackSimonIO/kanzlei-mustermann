import type { Block } from 'payload'

import { link } from '@/fields/link'

export const CTA25: Block = {
  slug: 'cta25',
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
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
