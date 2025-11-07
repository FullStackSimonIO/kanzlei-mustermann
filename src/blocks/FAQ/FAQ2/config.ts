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

export const FAQ2: Block = {
  slug: 'faq2',
  interfaceName: 'Faq2Block',
  labels: {
    singular: 'FAQ2 - Häufig gestellte Fragen mit Accordion',
    plural: 'FAQ2 - Häufig gestellte Fragen mit Accordion',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Überschrift',
      admin: {
        description: 'Die Hauptüberschrift für den FAQ Abschnitt',
      },
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description: 'Der Beschreibungstext unter der Überschrift',
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
      name: 'questions',
      type: 'array',
      label: 'Häufig gestellte Fragen',
      admin: {
        description: 'Fügen Sie Fragen und Antworten hinzu',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Frage',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          label: 'Antwort',
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
                }),
              ]
            },
          }),
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'footerHeading',
      type: 'text',
      label: 'Footer Überschrift',
      admin: {
        description: 'Überschrift für den Footer Bereich',
      },
      required: true,
    },
    {
      name: 'footerDescription',
      type: 'richText',
      label: 'Footer Beschreibung',
      admin: {
        description: 'Beschreibungstext für den Footer Bereich',
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            ParagraphFeature(),
            BoldFeature(),
            ItalicFeature(),
            LinkFeature({
              enabledCollections: ['pages', 'posts'],
            }),
          ]
        },
      }),
      required: true,
    },
    linkGroup({
      overrides: {
        label: 'Footer Button',
        admin: {
          description: 'Button im Footer Bereich (z.B. "Kontakt")',
        },
        maxRows: 1,
      },
    }),
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
