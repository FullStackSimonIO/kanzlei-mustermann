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

export const Layout91: Block = {
  slug: 'layout91',
  interfaceName: 'Layout91Block',
  labels: {
    singular: 'Layout 91 - Video Modal mit Text & Buttons',
    plural: 'Layout 91 - Video Modal mit Text & Buttons',
  },
  fields: [
    // * Unterüberschrift / Tagline
    {
      name: 'tagline',
      type: 'text',
      label: 'Unterüberschrift / Tagline',
      admin: {
        description: 'Optionale Unterüberschrift oder Tagline über der Hauptüberschrift',
      },
    },
    // * Überschrift
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Die Hauptüberschrift für diesen Abschnitt',
      },
      required: true,
    },
    // * Fließtext mit allen möglichen Optionen
    {
      name: 'richText',
      type: 'richText',
      label: 'Fließtext',
      admin: {
        description:
          'Der Hauptinhalt des Textbereichs. Hier können Sie formatieren, Links einfügen, Listen erstellen und vieles mehr.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            // Basis Text Features
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
            // Listen und Strukturierung
            OrderedListFeature(),
            UnorderedListFeature(),
            ChecklistFeature(),
            BlockquoteFeature(),
            // Formatierung und Layout
            IndentFeature(),
            AlignFeature(),
            HorizontalRuleFeature(),
            // Farben und Styling
            TextColorFeature(),
            HighlightColorFeature(),
            BlocksFeature({}),
            BgColorFeature(),
            // Links
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
            // Video Einbettung
            YoutubeFeature(),
            VimeoFeature(),
            // Toolbars für bessere Bedienbarkeit
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      required: true,
    },
    // * Link Gruppe für Call-to-Action Buttons
    linkGroup({
      overrides: {
        label: 'Call-to-Action Buttons',
        admin: {
          description:
            'Fügen Sie bis zu 2 Buttons/Links hinzu, die unter dem Text angezeigt werden (z.B. "Mehr erfahren", "Kontakt")',
        },
        maxRows: 2,
      },
    }),
    // * Video URL (für Modal)
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        description: 'URL zum Video (z.B. YouTube oder Vimeo Embed URL)',
      },
      required: true,
    },
    // * Bild / Medien (Thumbnail für Video)
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Video Thumbnail',
      admin: {
        description: 'Das Vorschaubild für das Video. Empfohlen: Querformat, mindestens 800x600px',
      },
      required: true,
    },
    // * Abstand oben/unten
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
