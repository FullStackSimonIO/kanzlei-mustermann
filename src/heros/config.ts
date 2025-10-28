import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'
import { PostHero } from './PostHero'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Auswahl',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Post Hero',
          value: 'postHero',
        },
      ],
      required: true,
    },
    // * Hero Section Title
    {
      name: 'title',
      type: 'text',
      label: 'Hero Section Titel',
      required: true,
    },
    // * Hero Section Rich Text
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Hero Section Fließtext',
    },
    // * Hero Section Links
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      label: 'Hero Section Medien',
      type: 'array', // <-- Jetzt ein Array, damit du mehrere Bilder speichern kannst
      admin: {
        condition: (_, { type } = {}) => [PostHero].includes(type),
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media', // Verknüpfung zur Media Collection
          required: true,
        },
      ],
    },
  ],
  label: 'Hero Section Komponente',
}
