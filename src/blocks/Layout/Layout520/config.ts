import type { Block } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  HeadingFeature,
  BlockquoteFeature,
  OrderedListFeature,
  UnorderedListFeature,
  ChecklistFeature,
  IndentFeature,
  AlignFeature,
  HorizontalRuleFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import {
  BgColorFeature,
  TextColorFeature,
  HighlightColorFeature,
  YoutubeFeature,
  VimeoFeature,
} from 'payloadcms-lexical-ext'
import type { TextFieldSingleValidation } from 'payload'
import type { LinkFields } from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const Layout520: Block = {
  slug: 'layout520',
  interfaceName: 'Layout520Block',
  labels: {
    singular: 'Layout 520 - Karten mit Logo & Bild Overlay',
    plural: 'Layout 520 - Karten mit Logo & Bild Overlay',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Unterüberschrift / Tagline',
      admin: {
        description: 'Optionale Unterüberschrift oder Tagline über der Hauptüberschrift',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Die Hauptüberschrift für diesen Abschnitt',
      },
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description:
          'Der Hauptinhalt des Textbereichs. Hier können Sie formatieren, Links einfügen, Listen erstellen und vieles mehr.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            HeadingFeature({
              enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            }),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
            StrikethroughFeature(),
            SubscriptFeature(),
            SuperscriptFeature(),
            OrderedListFeature(),
            UnorderedListFeature(),
            ChecklistFeature(),
            BlockquoteFeature(),
            IndentFeature(),
            AlignFeature(),
            HorizontalRuleFeature(),
            TextColorFeature(),
            HighlightColorFeature(),
            BlocksFeature({}),
            BgColorFeature(),
            LinkFeature({
              enabledCollections: ['pages', 'posts'],
              fields: ({ defaultFields }) => {
                const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
                  if ('name' in field && field.name === 'url') return false
                  return true
                })

                return [
                  ...defaultFieldsWithoutUrl,
                  {
                    name: 'url',
                    type: 'text',
                    admin: {
                      condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
                    },
                    label: ({ t }) => t('fields:enterURL'),
                    required: true,
                    validate: ((value, options) => {
                      if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                        return true
                      }
                      return value ? true : 'URL is required'
                    }) as TextFieldSingleValidation,
                  },
                ]
              },
            }),
            YoutubeFeature(),
            VimeoFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Karten',
      admin: {
        description: 'Karten mit Logo, Hintergrund-Bild und Link',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          admin: {
            description: 'Logo für die Karte. Empfohlen: Quadratisch, 120x120px oder größer',
          },
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Hintergrund-Bild',
          admin: {
            description:
              'Hintergrund-Bild für die Karte. Empfohlen: Quadratisch, mindestens 400x400px',
          },
          required: true,
        },
        {
          name: 'cardHeading',
          type: 'text',
          label: 'Überschrift',
          admin: {
            description: 'Überschrift der Karte',
          },
          required: true,
        },
        {
          name: 'cardDescription',
          type: 'textarea',
          label: 'Beschreibung',
          admin: {
            description: 'Kurze Beschreibung der Karte',
          },
          required: true,
        },
        linkGroup({
          overrides: {
            label: 'Link',
            admin: {
              description: 'Link/Button für die Karte',
            },
            maxRows: 1,
          },
        }),
      ],
      minRows: 1,
    },
    {
      name: 'spacing',
      type: 'select',
      label: 'Abstände',
      defaultValue: 'medium',
      admin: {
        description: 'Wählen Sie den Abstand über und unter diesem Abschnitt',
      },
      options: [
        {
          label: 'Klein',
          value: 'small',
        },
        {
          label: 'Mittel (Standard)',
          value: 'medium',
        },
        {
          label: 'Groß',
          value: 'large',
        },
        {
          label: 'Kein Abstand',
          value: 'none',
        },
      ],
    },
  ],
}
