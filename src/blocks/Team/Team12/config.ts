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

export const Team12: Block = {
  slug: 'team12',
  interfaceName: 'Team12Block',
  labels: {
    singular: 'Team 12 - Team Member Showcase',
    plural: 'Team 12 - Team Member Showcase',
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
    // * Team Members Array
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      admin: {
        description: 'Fügen Sie Team Members mit Foto, Name, Titel und Beschreibung hinzu',
      },
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Team Member Photo',
          admin: {
            description: 'Team Member Photo. Empfohlen: 3:2 Verhältnis, mindestens 600x400px',
          },
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          admin: {
            description: 'Vollständiger Name des Team Members',
          },
          required: true,
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: 'Job Title',
          admin: {
            description: 'Berufsbezeichnung oder Position',
          },
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Beschreibung',
          admin: {
            description: 'Kurze Beschreibung des Team Members',
          },
          required: true,
        },
        {
          name: 'socialLinks',
          type: 'array',
          label: 'Social Links',
          admin: {
            description: 'Social Media Links (LinkedIn, Twitter, etc.)',
          },
          minRows: 0,
          maxRows: 5,
          fields: [
            {
              name: 'platform',
              type: 'select',
              label: 'Platform',
              options: [
                { label: 'LinkedIn', value: 'linkedin' },
                { label: 'Twitter / X', value: 'twitter' },
                { label: 'GitHub', value: 'github' },
                { label: 'Dribbble', value: 'dribbble' },
                { label: 'Website', value: 'website' },
              ],
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              label: 'URL',
              admin: {
                description: 'Link zur Social Media Profile oder Website',
              },
              required: true,
            },
          ],
        },
      ],
    },
    // * Footer CTA Section
    {
      name: 'footerHeading',
      type: 'text',
      label: 'Footer Heading',
      admin: {
        description: 'Überschrift für die Footer Call-to-Action Section',
      },
    },
    {
      name: 'footerDescription',
      type: 'textarea',
      label: 'Footer Description',
      admin: {
        description: 'Beschreibung für die Footer CTA Section',
      },
    },
    // * Footer Button Link
    linkGroup({
      overrides: {
        name: 'footerLinks',
        label: 'Footer Button',
        admin: {
          description: 'Button für die Footer Section (z.B. "Open Positions")',
        },
        maxRows: 1,
      },
    }),
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
