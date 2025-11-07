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

export const FAQ5: Block = {
  slug: 'faq5',
  interfaceName: 'FAQ5Block',
  labels: {
    singular: 'FAQ 5 - Häufig gestellte Fragen',
    plural: 'FAQ 5 - Häufig gestellte Fragen',
  },
  fields: [
    // * Überschrift
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Die Hauptüberschrift für den FAQ-Abschnitt',
      },
      required: true,
    },
    // * Beschreibung mit RichText
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description: 'Die Beschreibung oder Einleitung für die FAQs.',
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
                      return value ? true : 'URL ist erforderlich'
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
    },
    // * FAQ-Fragen Array
    {
      name: 'questions',
      type: 'array',
      label: 'Fragen & Antworten',
      admin: {
        description:
          'Fügen Sie Fragen und Antworten hinzu, die in einem Accordion angezeigt werden',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Frage',
          admin: {
            description: 'Die FAQ-Frage',
          },
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Antwort',
          admin: {
            description: 'Die detaillierte Antwort auf die Frage',
          },
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                ParagraphFeature(),
                HeadingFeature({
                  enabledHeadingSizes: ['h2', 'h3', 'h4'],
                }),
                BoldFeature(),
                ItalicFeature(),
                UnderlineFeature(),
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
              ]
            },
          }),
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 20,
    },
    // * Footer Überschrift
    {
      name: 'footerHeading',
      type: 'text',
      label: 'Footer-Überschrift',
      admin: {
        description: 'Die Überschrift im Footer-Bereich (z.B. "Haben Sie noch Fragen?")',
      },
      required: true,
    },
    // * Footer Beschreibung mit RichText
    {
      name: 'footerDescription',
      type: 'richText',
      label: 'Footer-Beschreibung',
      admin: {
        description: 'Die Beschreibung im Footer-Bereich.',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            BoldFeature(),
            ItalicFeature(),
            UnderlineFeature(),
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
          ]
        },
      }),
    },
    // * Footer Button via linkGroup
    linkGroup({
      overrides: {
        label: 'Footer Button',
        admin: {
          description: 'Der Button im Footer-Bereich (z.B. "Kontakt")',
        },
        maxRows: 1,
      },
    }),
    // * Spacing
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
