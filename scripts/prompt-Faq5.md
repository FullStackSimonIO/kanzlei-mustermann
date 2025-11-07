# Aufgabe: Relume Komponente "Faq5" in PayloadCMS Block umwandeln

## Kontext
Du bist ein Experte für PayloadCMS und React. Deine Aufgabe ist es, die folgende Relume-Komponente in einen vollständigen PayloadCMS Block umzuwandeln.

## Relume Komponente: Faq5

```tsx
import {
  Button,
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@relume_io/relume-ui";

import type { ButtonProps } from "@relume_io/relume-ui";
import { RxPlus } from "react-icons/rx";

type QuestionsProps = {
  title: string;
  answer: string;
};

type Props = {
  heading: string;
  description: string;
  footerHeading: string;
  footerDescription: string;
  button: ButtonProps;
  questions: QuestionsProps[];
};

export type Faq5Props = React.ComponentPropsWithoutRef<"section"> &
  Partial<Props>;

export const Faq5 = (props: Faq5Props) => {
  const {
    heading,
    description,
    questions,
    footerHeading,
    footerDescription,
    button,
  } = {
    ...Faq5Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="md:text-md">{description}</p>
        </div>
        <Accordion
          type="multiple"
          className="grid items-start justify-stretch gap-4"
        >
          {questions.map((question, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border-primary px-5 md:px-6"
            >
              <AccordionTrigger
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
              >
                {question.title}
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                {question.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12  md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {footerHeading}
          </h4>
          <p className="md:text-md">{footerDescription}</p>
          <div className="mt-6 md:mt-8">
            <Button {...button}>{button.title}</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Faq5Defaults: Props = {
  heading: "FAQs",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  questions: [
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
    {
      title: "Question text goes here",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat. Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.",
    },
  ],
  footerHeading: "Still have questions?",
  footerDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  button: {
    title: "Contact",
    variant: "secondary",
  },
};

```

## Anforderungen

### 1. Erstelle config.ts
- Block Slug: `faq5`
- Interface Name: `Faq5Block`
- **WICHTIG: KEINE Farboptionen (backgroundColor, etc.)**
- Deutsche Labels und Beschreibungen
- Verwende für Fließtexte: RichText mit vollem Lexical Editor (siehe Beispiel)
- Verwende für Links/Buttons: `linkGroup()` mit maxRows: 2
- Verwende für Bilder: `type: 'upload', relationTo: 'media'`
- Immer Felder: imagePosition (left/right), spacing (small/medium/large/none)

### 2. Erstelle Component.tsx
- **WICHTIG: KEIN 'use client' in Component.tsx - Server Component!**
- Type-safe mit: `Extract<Page['layout'][0], { blockType: 'faq5' }>`
- Nutze: RichText, Media, CMSLink Komponenten
- Responsive Grid Layout
- Spacing Classes wie im Beispiel
- **KEINE Hintergrundfarben**

### 3. Interaktivität (falls nötig)
- **Falls** die Komponente Client-Interaktivität braucht (useState, onClick, etc.):
  * Erstelle separate Datei: `InteractiveComponent.tsx` mit `'use client'`
  * Importiere diese in `Component.tsx`
  * **NIEMALS** `'use client'` in `Component.tsx` selbst!
- **Grund**: `'use client'` macht alle Imports client-seitig, inkl. PayloadCMS → Node.js Module → Build-Fehler

## Beispiel Layout1 (Server Component - KEIN Interaktivität)

### config.ts Beispiel:
```typescript
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

export const Layout1: Block = {
  slug: 'layout1',
  interfaceName: 'Layout1Block',
  labels: {
    singular: 'Layout 1 - Text links, Bild rechts',
    plural: 'Layout 1 - Text links, Bild rechts',
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
    // * Unterüberschrift / Tagline
    {
      name: 'tagline',
      type: 'text',
      label: 'Unterüberschrift / Tagline',
      admin: {
        description: 'Optionale Unterüberschrift oder Tagline über der Hauptüberschrift',
      },
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
    // * Bild / Medien auf der rechten Seite
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

```

### Component.tsx Beispiel:
```tsx
import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Layout1BlockType = Extract<Page['layout'][0], { blockType: 'layout1' }>

type Props = Layout1BlockType & {
  id?: string
}

export const Layout1Block: React.FC<Props> = ({
  heading,
  tagline,
  richText,
  links,
  media,
  imagePosition = 'right',
  spacing = 'medium',
}) => {
  // Abstände Mapping
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-24 lg:py-32',
  }

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        <div
          className={cn(
            'grid gap-8 md:gap-12 lg:gap-16 items-center',
            'grid-cols-1 md:grid-cols-2',
            imagePosition === 'left' && 'md:flex-row-reverse',
          )}
        >
          {/* Text Content - Links */}
          <div
            className={cn(
              'flex flex-col justify-center',
              imagePosition === 'left' ? 'md:order-2' : 'md:order-1',
            )}
          >
            {/* Tagline */}
            {tagline && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {tagline}
              </p>
            )}

            {/* Heading */}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
                {heading}
              </h2>
            )}

            {/* Rich Text Content */}
            {richText && (
              <div className="mb-8">
                <RichText
                  data={richText}
                  enableGutter={false}
                  enableProse={true}
                  className="text-gray-600 leading-relaxed"
                />
              </div>
            )}

            {/* Call-to-Action Buttons */}
            {links && links.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
                {links.map((linkItem: any, index: number) => {
                  const link = linkItem.link
                  return (
                    <CMSLink
                      key={index}
                      type={link?.type}
                      url={link?.url}
                      reference={link?.reference}
                      label={link?.label}
                      appearance={link?.appearance || 'default'}
                      newTab={link?.newTab}
                      className={cn(
                        'inline-flex items-center justify-center',
                        index === 0 ? 'font-semibold' : '',
                      )}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Content - Rechts (oder Links je nach imagePosition) */}
          <div
            className={cn(
              'relative w-full',
              imagePosition === 'left' ? 'md:order-1' : 'md:order-2',
            )}
          >
            {media && typeof media === 'object' && (
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                <Media
                  resource={media as MediaType}
                  className="w-full h-full object-cover"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

```

## Beispiel Layout2 (mit Client Interaktivität - Video Modal)

### Component.tsx (Server Component):
```tsx
import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { VideoPlayer } from './VideoPlayer'  // Client Component importiert

type Layout2BlockType = Extract<Page['layout'][0], { blockType: 'layout2' }>

export const Layout2Block: React.FC<Layout2BlockType> = ({
  heading,
  richText,
  videoUrl,
  media,
  // ... props
}) => {
  return (
    <section>
      <div>
        {/* Server-seitige Komponenten: RichText, CMSLink, etc. */}
        <RichText data={richText} />
        
        {/* Client-Komponente für Interaktivität */}
        <VideoPlayer videoUrl={videoUrl} media={media as MediaType} />
      </div>
    </section>
  )
}
```

### VideoPlayer.tsx (Client Component):
```tsx
'use client'

import React, { useState } from 'react'
// Nur UI-Komponenten importieren, KEINE PayloadCMS Imports!

export const VideoPlayer: React.FC<{ videoUrl: string, media: any }> = ({ videoUrl, media }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Play Video</button>
      {isOpen && <VideoModal videoUrl={videoUrl} />}
    </>
  )
}
```

## Wichtige Mappings

Relume → PayloadCMS:
- `tagline` → text field "Unterüberschrift / Tagline"
- `heading` → text field "Überschrift" (required)
- `description` → richText field "Fließtext" (mit vollem Lexical Editor)
- `buttons` → linkGroup() "Call-to-Action Buttons"
- `image` / `firstImage` → upload field "Bild" (relationTo: 'media')
- `icon` → upload field "Icon" (wenn vorhanden)
- `subHeadings` → Analysieren und passend umsetzen
- `sections` → Analysieren und passend umsetzen
- `features` → Analysieren und passend umsetzen
- `cards` → Analysieren und passend umsetzen

## Output Format

Gib mir bitte **zwei bis drei** Code-Blöcke zurück:

**Immer erforderlich:**
```typescript filename="config.ts"
// Vollständiger config.ts Inhalt hier
```

```tsx filename="Component.tsx"
// Vollständiger Component.tsx Inhalt hier (OHNE 'use client'!)
```

**Optional (nur bei Client-Interaktivität):**
```tsx filename="InteractiveComponent.tsx"
// Client Component mit 'use client' Directive
// NUR UI-Komponenten importieren, KEINE PayloadCMS Imports!
```

Keine zusätzlichen Erklärungen, nur die Code-Blöcke!