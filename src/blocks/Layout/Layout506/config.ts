import type { Block } from 'payload'

import { link } from '@/fields/link'

export const Layout506: Block = {
  slug: 'layout506',
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
      name: 'defaultTabValue',
      type: 'text',
      defaultValue: 'tab-1',
      admin: {
        description: 'Default tab to display on page load (e.g., "tab-1")',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'Unique identifier for this tab (e.g., "tab-1")',
          },
        },
        {
          name: 'trigger',
          type: 'text',
          required: true,
          admin: {
            description: 'Label that appears in the tab list',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'contentHeading',
          type: 'text',
          required: true,
          admin: {
            description: 'Heading displayed in the tab content area',
          },
        },
        {
          name: 'contentDescription',
          type: 'textarea',
          required: false,
          admin: {
            description: 'Description text in the tab content area',
          },
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
    },
  ],
}
