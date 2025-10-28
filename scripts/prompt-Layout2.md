# Aufgabe: Relume Komponente "Layout2" in PayloadCMS Block umwandeln

## Kontext
Du bist ein Experte für PayloadCMS und React. Deine Aufgabe ist es, die folgende Relume-Komponente in einen vollständigen PayloadCMS Block umzuwandeln.

## Relume Komponente: Layout2

```tsx
"use client";

import { useState } from "react";
import { Button, Dialog, DialogContent, DialogTrigger } from "@relume_io/relume-ui";
import type { ButtonProps } from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import clsx from "clsx";
import { FaCirclePlay } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";

type ImageProps = {
  src: string;
  alt?: string;
};

type Props = {
  tagline: string;
  heading: string;
  description: string;
  buttons: ButtonProps[];
  video: string;
  image: ImageProps;
};

export type Layout2Props = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Layout2 = (props: Layout2Props) => {
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const { tagline, heading, description, buttons, video, image } = {
    ...Layout2Defaults,
    ...props,
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold md:mb-4">{tagline}</p>
            <h1 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h1>
            <p className="md:text-md">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button key={index} {...button}>
                  {button.title}
                </Button>
              ))}
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button className="relative flex w-full items-center justify-center">
                <img src={image.src} alt={image.alt} className="size-full object-cover" />
                <span className="absolute inset-0 z-10 bg-black/50" />
                <FaCirclePlay className="absolute z-20 size-16 text-white" />
              </button>
            </DialogTrigger>
            <DialogContent>
              {!isIframeLoaded && <CgSpinner className="mx-auto size-16 animate-spin text-white" />}
              <iframe
                className={clsx("z-0 mx-auto aspect-video size-full md:w-[738px] lg:w-[940px]", {
                  visible: isIframeLoaded,
                  hidden: !isIframeLoaded,
                })}
                src={video}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsIframeLoaded(true)}
              ></iframe>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export const Layout2Defaults: Props = {
  tagline: "Tagline",
  heading: "Medium length section heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [
    { title: "Button", variant: "secondary" },
    {
      title: "Button",
      variant: "link",
      size: "link",
      iconRight: <RxChevronRight />,
    },
  ],
  video: "https://www.youtube.com/embed/8DKLYsikxTs?si=Ch9W0KrDWWUiCMMW",
  image: {
    src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-video-thumbnail.svg",
    alt: "Relume placeholder image",
  },
};
    
```

## Anforderungen

### 1. Erstelle config.ts
- Block Slug: `layout2`
- Interface Name: `Layout2Block`
- **WICHTIG: KEINE Farboptionen (backgroundColor, etc.)**
- Deutsche Labels und Beschreibungen
- Verwende für Fließtexte: RichText mit vollem Lexical Editor (siehe Beispiel)
- Verwende für Links/Buttons: `linkGroup()` mit maxRows: 2
- Verwende für Bilder: `type: 'upload', relationTo: 'media'`
- Immer Felder: imagePosition (left/right), spacing (small/medium/large/none)

### 2. Erstelle Component.tsx
- Type-safe mit: `Extract<Page['layout'][0], { blockType: 'layout2' }>`
- Nutze: RichText, Media, CMSLink Komponenten
- Responsive Grid Layout
- Spacing Classes wie im Beispiel
- **KEINE Hintergrundfarben**

## Beispiel Layout1 (als Referenz)

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

Gib mir bitte **NUR** zwei Code-Blöcke zurück im folgenden Format:

```typescript filename="config.ts"
// Vollständiger config.ts Inhalt hier
```

```tsx filename="Component.tsx"
// Vollständiger Component.tsx Inhalt hier
```

Keine zusätzlichen Erklärungen, nur die beiden Code-Blöcke!