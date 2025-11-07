# CTA39 Block

**CTA39 - Überschrift mit Beschreibung und Buttons** ist ein PayloadCMS Block für Call-to-Action Sections.

## Features

✅ **Responsive Design**: 1 Spalte (Mobile) → 2 Spalten (Desktop)
✅ **Flexible Bildposition**: Links oder rechts vom Text
✅ **Rich Text Editor**: Vollständiger Lexical Editor für Beschreibungstext
✅ **Multiple Buttons**: Bis zu 2 CTA-Buttons/Links
✅ **Spacing Optionen**: Klein/Mittel/Groß/Keine Abstände
✅ **Server Component**: Keine `use client` - Optimal für SEO
✅ **Type-Safe**: Vollständige TypeScript Unterstützung

## Struktur

```
src/blocks/CTA/CTA39/
├── config.ts          # Payload Block Konfiguration
└── Component.tsx      # React Server Component
```

## Verwendung im CMS

### 1. Neue Seite erstellen

```
CMS Admin → Pages → Create new
```

### 2. Hero section hinzufügen

```
Tab: Hero → Wähle einen Hero
```

### 3. CTA39 Block hinzufügen

```
Tab: Blöcke → Add Block → CTA39
```

### 4. Block ausfüllen

#### Überschrift (required)

- Text für die Hauptüberschrift
- Beispiel: "Professionelle Kanzleisoftware"

#### Beschreibung (required)

- Rich Text mit voller Formatierung
- Kann enthalten:
  - Text, Fettdruck, Kursiv, Unterstreichen
  - Überschriften (H1-H6)
  - Listen (geordnet/ungeordnet)
  - Zitate, Links
  - YouTube/Vimeo Videos

#### Call-to-Action Buttons (optional)

- Max. 2 Buttons
- Für jeden Button:
  - Label: Text auf dem Button
  - Typ: Internal Link (zu Seite) oder Custom (externe URL)
  - Appearance: Default oder Outline

#### Bild (required)

- Upload Bild für rechte/linke Seite
- Empfehlungen:
  - Quadratisch oder Hochformat
  - Mindestens 600x600px
  - Formate: JPG, PNG, WebP

#### Bild Position (optional)

- **Rechts** (Standard): Bild rechts, Text links
- **Links**: Bild links, Text rechts

#### Abstände (optional)

- **Klein**: py-8 md:py-12
- **Mittel** (Standard): py-12 md:py-16 lg:py-20
- **Groß**: py-16 md:py-24 lg:py-32
- **Keine**: py-0

## Rendert als

```html
<section class="w-full [spacing]">
  <div class="container">
    <div class="grid grid-cols-1 lg:grid-cols-2 border">
      <!-- Text Seite -->
      <div class="flex flex-col justify-center p-8">
        <h2>{{ heading }}</h2>
        <div>{{ description (RichText) }}</div>
        <div>{{ Buttons }}</div>
      </div>

      <!-- Bild Seite -->
      <div>
        <img src="{{ image }}" />
      </div>
    </div>
  </div>
</section>
```

## Styling

### CSS Classes

Der Block benutzt Tailwind CSS mit folgenden Patterns:

```
Sektion:        w-full + [spacing]
Container:      container mx-auto px-4
Grid:           grid grid-cols-1 lg:grid-cols-2 border
Text-Bereich:   flex flex-col justify-center p-6 md:p-8 lg:p-12
Überschrift:    text-4xl md:text-5xl lg:text-6xl font-bold mb-6
Beschreibung:   text-base md:text-lg text-gray-600
Buttons:        flex flex-col sm:flex-row gap-4
Bilder:         w-full h-full object-cover
```

### Responsive Breakpoints

```
Mobile:         1 Spalte, p-6
Tablet (md):    p-8, größere Text
Desktop (lg):   2 Spalten, p-12, größere Überschrift
```

## Beispiel

### CMS Eingabe

| Feld          | Wert                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| Überschrift   | "Jetzt durchstarten"                                                               |
| Beschreibung  | "Unsere innovative Softwarelösung hilft Ihrer Kanzlei, effizienter zu arbeiten..." |
| Button 1      | Label: "Kostenlose Demo", Type: Custom, URL: "https://calendly.com/..."            |
| Button 2      | Label: "Kontakt", Type: Internal, Reference: "Kontakt-Seite"                       |
| Bild          | [Software Dashboard Screenshot]                                                    |
| Bild Position | Rechts                                                                             |
| Abstände      | Mittel                                                                             |

### Rendered Output

```
┌────────────────────────────────────────┐
│                                        │
│  Jetzt durchstarten        ┌─────┐    │
│  Unsere innovative...      │ IMG │    │
│  [Details...]              │     │    │
│  [Demo] [Kontakt]          └─────┘    │
│                                        │
└────────────────────────────────────────┘
```

## Datenmodell (TypeScript)

```typescript
export interface CTA39Block {
  // Hauptüberschrift
  heading: string

  // Rich Text Beschreibung
  description: {
    root: {
      type: string
      children: Array<any>
      direction: 'ltr' | 'rtl' | null
      format: string
      indent: number
      version: number
    }
  }

  // Optionale Links/Buttons
  links?: Array<{
    link: {
      type?: 'reference' | 'custom' | null
      newTab?: boolean | null
      reference?: {
        relationTo: 'pages' | 'posts'
        value: number | Page | Post
      } | null
      url?: string | null
      label: string
      appearance?: 'default' | 'outline' | null
    }
    id?: string | null
  }> | null

  // Bild (required)
  image: number | Media

  // Bild Position
  imagePosition?: 'right' | 'left' | null

  // Vertical Spacing
  spacing?: 'small' | 'medium' | 'large' | 'none' | null

  // Metadata
  id?: string | null
  blockName?: string | null
  blockType: 'cta39'
}
```

## Best Practices

### ✅ DO's

- Verwende aussagekräftige Überschriften
- Nutze RichText für gut lesbare Formatierung
- Halte Button-Text kurz & prägnant
- Verwende hochwertige Bilder
- Teste auf Mobile-Geräten

### ❌ DON'Ts

- Zu viel Text in der Beschreibung (Nutzer scannen)
- Mehr als 2 Buttons
- Zu kleine Bilder (<600px)
- Automatisch spielende Videos (nutze iFrame)
- Zu viele verschiedene Link-Farben

## Frontend Implementation

Der Block wird automatisch in `/src/blocks/RenderBlocks.tsx` gerendert:

```tsx
// In Component.tsx:
import { CTA39Block } from '@/blocks/CTA/CTA39/Component'

// In RenderBlocks.tsx:
const blockComponents = {
  cta39: CTA39Block,
  // ... andere Blocks
}
```

Auf jeder Seite mit CTA39 Block wird die Komponente automatisch gerendert.

## Troubleshooting

### Block erscheint nicht im CMS

1. Checke: `src/collections/Pages/index.ts` → Block importiert?
2. Führe aus: `pnpm payload generate:types`
3. Restart Dev-Server: `pnpm dev`

### Block rendert nicht korrekt

1. Checke Console auf Fehler
2. Prüfe: Ist `image` gespeichert?
3. Prüfe: Sind `heading` & `description` gefüllt?

### Bilder zeigen nicht

1. Media in Vercel Blob Storage hochgeladen?
2. Überprüfe Bild-URL in DevTools
3. Check Payload Admin → Media → Bild vorhanden?

---

**Erstellt**: 2025-11-07
**Block Slug**: `cta39`
**Version**: 1.0.0
