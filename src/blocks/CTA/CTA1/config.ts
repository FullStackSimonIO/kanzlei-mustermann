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

export const CTA1: Block = {
  slug: 'cta1',
  interfaceName: 'Cta1Block',
  labels: {
    singular: 'CTA 1 - Text & Bild Nebeneinander',
    plural: 'CTA 1 - Text & Bild Nebeneinander',
  },
  fields: [
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
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      admin: {
        description:
          'Das Bild, das auf der rechten Seite neben dem Text angezeigt wird. Empfohlen: Querformat, mindestens 800x600px',
      },
      required: true,
    },
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
