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

export const Contact16: Block = {
  slug: 'contact16',
  interfaceName: 'Contact16Block',
  labels: {
    singular: 'Contact 16 - Kontakt mit Karte',
    plural: 'Contact 16 - Kontakt mit Karte',
  },
  fields: [
    // * Tagline
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      admin: {
        description: 'Optionale Tagline über der Hauptüberschrift',
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
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description: 'Die Beschreibung neben den Kontaktinformationen.',
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
                      return value ? true : 'URL ist erforderlich'
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
    },
    // * Kontaktinformationen als Array
    {
      name: 'contacts',
      type: 'array',
      label: 'Kontaktinformationen',
      admin: {
        description: 'Fügen Sie Kontaktinformationen hinzu (E-Mail, Telefon, Adresse, etc.)',
      },
      fields: [
        // * Icon / Symbol für den Kontakt
        {
          name: 'iconType',
          type: 'select',
          label: 'Icon-Typ',
          admin: {
            description: 'Wählen Sie das Icon für diese Kontaktmethode',
          },
          options: [
            {
              label: 'E-Mail',
              value: 'email',
            },
            {
              label: 'Telefon',
              value: 'phone',
            },
            {
              label: 'Standort / Karte',
              value: 'location',
            },
            {
              label: 'Website',
              value: 'web',
            },
            {
              label: 'Social Media',
              value: 'social',
            },
          ],
          required: true,
        },
        // * Titel / Name der Kontaktmethode
        {
          name: 'title',
          type: 'text',
          label: 'Titel',
          admin: {
            description: 'z.B. "E-Mail", "Telefon", "Büro"',
          },
          required: true,
        },
        // * Beschreibung oder Adresse
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung / Adresse',
          admin: {
            description: 'z.B. vollständige Adresse oder weitere Informationen',
          },
        },
        // * Link Gruppe für Contact Link/Button
        linkGroup({
          overrides: {
            label: 'Kontakt-Link',
            admin: {
              description: 'E-Mail-Link, Telefon-Link oder andere Links',
            },
            maxRows: 1,
          },
        }),
      ],
      minRows: 1,
      maxRows: 5,
    },
    // * Karten-Bild
    {
      name: 'mapImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Karten-Bild',
      admin: {
        description:
          'Das Bild der Karte oder ein anderes visuelles Element unterhalb der Kontaktinformationen. Empfohlen: Querformat, mindestens 800x600px',
      },
      required: true,
    },
    // * Karten-Link/URL
    {
      name: 'mapUrl',
      type: 'text',
      label: 'Karten-Link',
      admin: {
        description:
          'Link zur Google Maps oder einer anderen Kartenseite (z.B. https://maps.google.com/...)',
      },
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
