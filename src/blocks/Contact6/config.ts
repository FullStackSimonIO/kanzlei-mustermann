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

export const Contact6: Block = {
  slug: 'contact6',
  interfaceName: 'Contact6Block',
  labels: {
    singular: 'Contact 6 - Kontaktformular',
    plural: 'Contact 6 - Kontaktformular',
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
    // * Beschreibung mit RichText
    {
      name: 'description',
      type: 'richText',
      label: 'Beschreibung',
      admin: {
        description: 'Die Beschreibung neben dem Kontaktformular.',
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
    // * Kontaktinformationen - E-Mail
    {
      name: 'email',
      type: 'text',
      label: 'E-Mail-Adresse',
      admin: {
        description: 'Die E-Mail-Adresse für Kontaktanfragen',
      },
      required: true,
    },
    // * Kontaktinformationen - Telefon
    {
      name: 'phone',
      type: 'text',
      label: 'Telefonnummer',
      admin: {
        description: 'Die Telefonnummer für Kontaktanfragen',
      },
      required: true,
    },
    // * Kontaktinformationen - Adresse
    {
      name: 'address',
      type: 'textarea',
      label: 'Adresse',
      admin: {
        description: 'Die physische Adresse oder Bürostandort',
      },
      required: true,
    },
    // * Formular Submit Button
    linkGroup({
      overrides: {
        label: 'Submit Button',
        admin: {
          description: 'Der Button zum Absenden des Formulars',
        },
        maxRows: 1,
      },
    }),
    // * Formular Thema Optionen (Select)
    {
      name: 'topicOptions',
      type: 'array',
      label: 'Thema-Optionen',
      admin: {
        description: 'Optionen für das "Wählen Sie ein Thema" Dropdown-Feld',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Wert',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 10,
    },
    // * Formular Beschreibungs-Optionen (Radio Buttons)
    {
      name: 'descriptionOptions',
      type: 'array',
      label: 'Beschreibungs-Optionen ("Was beschreibt Sie am besten?")',
      admin: {
        description: 'Optionen für die Radio-Button-Gruppe im Formular',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Wert',
          required: true,
        },
      ],
      minRows: 1,
      maxRows: 10,
    },
    // * Terms & Conditions Link
    {
      name: 'termsLink',
      type: 'text',
      label: 'Nutzungsbedingungen Link',
      admin: {
        description: 'Link zu den Nutzungsbedingungen (z.B. /terms)',
      },
    },
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
