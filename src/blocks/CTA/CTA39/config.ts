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

export const CTA39: Block = {
  slug: 'cta39',
  interfaceName: 'CTA39Block',
  labels: {
    singular: 'CTA39 - Überschrift mit Beschreibung und Buttons',
    plural: 'CTA39 - Überschrift mit Beschreibung und Buttons',
  },
  fields: [
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
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description:
          'Der Beschreibungstext. Hier können Sie formatieren, Links einfügen, Listen erstellen und vieles mehr.',
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
            'Fügen Sie bis zu 2 Buttons/Links hinzu, die neben der Überschrift angezeigt werden (z.B. "Jetzt starten", "Kontakt")',
        },
        maxRows: 2,
      },
    }),
    // * Bild / Medien
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      admin: {
        description:
          'Das Bild, das neben dem Text angezeigt wird. Empfohlen: Quadratisch oder Hochformat, mindestens 600x600px',
      },
      required: true,
    },
    // * Bild Position (für Flexibilität)
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Bild Position',
      defaultValue: 'right',
      admin: {
        description: 'Wählen Sie, ob das Bild rechts oder links vom Text angezeigt werden soll',
      },
      options: [
        {
          label: 'Rechts (Standard)',
          value: 'right',
        },
        {
          label: 'Links',
          value: 'left',
        },
      ],
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
