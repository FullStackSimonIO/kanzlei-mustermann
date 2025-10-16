# Hero Conditional Fields - Dokumentation

## 🎯 Konzept

Figma-Komponenten mit **"Header"** im Namen werden automatisch als **Hero-Sections** erkannt und mit **conditional Fields** generiert.

---

## 📍 Speicherort

Heroes werden **NICHT** unter `/src/blocks/` gespeichert, sondern:

```
src/heros/
├── Header1/
│   └── index.tsx       ← React-Komponente
├── Header2/
│   └── index.tsx
├── Header3/
│   └── index.tsx
├── config.ts           ← ✨ Conditional Fields Config!
└── RenderHero.tsx      ← Dynamisches Rendering
```

---

## 🎨 Conditional Fields im Admin-Panel

### Konzept
Basierend auf der **Hero-Typ Auswahl** im Dropdown werden **nur die relevanten Felder** angezeigt.

### Beispiel

#### Schritt 1: Hero-Typ wählen
```
Pages → Hero Section → Typ: [Dropdown ▼]
├── Kein Hero
├── Header1 - Hero mit Bild
├── Header2 - Hero mit Galerie
├── Header3 - Hero mit Features
└── Header4 - Hero mit Formular
```

#### Schritt 2: Conditional Fields erscheinen

**Bei Auswahl "Header1":**
```typescript
// Sichtbare Felder:
- title: text (immer)
- description: textarea (conditional für Header1)
- media: upload (conditional für Header1)
- primaryCTA: group (conditional für Header1)
- secondaryCTA: group (conditional für Header1)
```

**Bei Auswahl "Header3":**
```typescript
// Sichtbare Felder:
- title: text (immer)
- description: textarea (conditional für Header3)
- features: array (conditional für Header3) ← NEU!
  ├── text: string
  └── icon: upload
- media: upload (conditional für Header3)
- primaryCTA: group (conditional für Header3)
```

---

## 🏗️ Technische Umsetzung

### 1. Hero-Config (`src/heros/config.ts`)

```typescript
import { Field } from 'payload/types'

export const heroField: Field = {
  name: 'hero',
  type: 'group',
  label: 'Hero Section',
  fields: [
    // Type Selector (immer sichtbar)
    {
      name: 'type',
      type: 'select',
      label: 'Hero-Typ',
      required: true,
      options: [
        { label: 'Kein Hero', value: 'none' },
        { label: 'Header1 - Mit Bild', value: 'Header1' },
        { label: 'Header2 - Galerie', value: 'Header2' },
        { label: 'Header3 - Features', value: 'Header3' },
      ],
    },
    
    // Gemeinsame Felder (immer wenn Hero !== 'none')
    {
      name: 'title',
      type: 'text',
      label: 'Titel',
      required: true,
      admin: {
        condition: (data) => data?.hero?.type !== 'none',
      },
    },
    
    // Conditional Field: Description (für Header1, Header2, Header3)
    {
      name: 'description',
      type: 'textarea',
      label: 'Beschreibung',
      admin: {
        condition: (data) => 
          ['Header1', 'Header2', 'Header3'].includes(data?.hero?.type),
      },
    },
    
    // Conditional Field: Media (nur für Header1)
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      label: 'Bild',
      admin: {
        condition: (data) => data?.hero?.type === 'Header1',
      },
    },
    
    // Conditional Field: Gallery (nur für Header2)
    {
      name: 'mediaGallery',
      type: 'array',
      label: 'Bild-Galerie',
      admin: {
        condition: (data) => data?.hero?.type === 'Header2',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Bild',
          required: true,
        },
      ],
    },
    
    // Conditional Field: Features (nur für Header3)
    {
      name: 'features',
      type: 'array',
      label: 'Features',
      admin: {
        condition: (data) => data?.hero?.type === 'Header3',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Feature-Text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
        },
      ],
    },
    
    // CTAs (für Header1, Header3)
    {
      name: 'primaryCTA',
      type: 'group',
      label: 'Haupt-Button',
      admin: {
        condition: (data) => 
          ['Header1', 'Header3'].includes(data?.hero?.type),
      },
      fields: [
        { name: 'label', type: 'text', label: 'Button-Text' },
        { name: 'url', type: 'text', label: 'URL' },
      ],
    },
  ],
}
```

### 2. Pages Collection Integration

```typescript
// src/collections/Pages/config.ts
import { heroField } from '@/heros/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    // Hero Field (mit conditional logic)
    heroField,
    
    // Rest der Felder
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        // Alle anderen Blocks (KEINE Heroes!)
      ],
    },
  ],
}
```

### 3. Dynamisches Rendering

```typescript
// src/heros/RenderHero.tsx
import { Header1 } from './Header1'
import { Header2 } from './Header2'
import { Header3 } from './Header3'

const heroComponents = {
  'Header1': Header1,
  'Header2': Header2,
  'Header3': Header3,
}

export const RenderHero = ({ hero }) => {
  if (!hero?.type || hero.type === 'none') return null
  
  const HeroComponent = heroComponents[hero.type]
  if (!HeroComponent) return null
  
  return <HeroComponent hero={hero} />
}
```

---

## 🔍 Hero-Typ Erkennung

Die Generierung analysiert automatisch die Figma-Struktur:

```typescript
function categorizeHeroType(figmaStructure) {
  const { images, texts, buttons, inputs, lists } = figmaStructure
  
  // Hat Formular-Elemente?
  if (inputs.length > 0) {
    return 'heroWithForm'
  }
  
  // Viele Bilder (Galerie)?
  if (images.length > 3) {
    return 'heroWithGallery'
  }
  
  // Hat Stichpunkte/Features?
  if (lists.length > 0) {
    return 'heroWithFeatures'
  }
  
  // 2 Bilder (Split-Screen)?
  if (images.length === 2) {
    return 'heroSplitScreen'
  }
  
  // Standard: 1 Bild
  if (images.length === 1) {
    return 'heroWithImage'
  }
  
  // Nur Text
  return 'heroSimple'
}
```

---

## 📊 Hero-Typen Übersicht

| Hero-Typ | Erkennungs-Kriterium | Conditional Fields |
|----------|---------------------|-------------------|
| **heroSimple** | Nur Text | title, description |
| **heroWithImage** | 1 Bild | + media, primaryCTA, secondaryCTA |
| **heroSplitScreen** | 2 Bilder | + leftMedia, rightMedia, primaryCTA |
| **heroWithGallery** | 3+ Bilder | + mediaGallery[], primaryCTA |
| **heroWithFeatures** | Hat Liste | + features[], media, primaryCTA |
| **heroWithForm** | Hat Input-Felder | + showForm, formHeading, media |
| **heroWithVideo** | Hat Video | + video, posterImage, primaryCTA |

---

## 🎯 Beispiel-Flow

### 1. Figma-Komponente
```
Komponente: "Header 1 - Homepage"
Struktur:
├── Titel
├── Beschreibung
├── Bild (1x)
├── Button 1
└── Button 2
```

### 2. Automatische Erkennung
```typescript
analyzeHeroStructure() 
→ images.length === 1
→ buttons.length === 2
→ Typ: "heroWithImage"
```

### 3. Generierte Config
```typescript
{
  type: 'Header1',
  heroType: 'heroWithImage',
  conditionalFields: [
    'title',        // immer
    'description',  // conditional
    'media',        // conditional
    'primaryCTA',   // conditional
    'secondaryCTA', // conditional
  ]
}
```

### 4. Im Admin
```
Hero-Typ wählen: "Header1" ✓

Sichtbare Felder:
✓ Titel
✓ Beschreibung
✓ Bild
✓ Haupt-Button
✓ Zweiter Button
```

---

## ✅ Vorteile

### 1. Bessere UX
- Keine verwirrenden, irrelevanten Felder
- Schnellere Inhaltspflege
- Geführter Workflow

### 2. Weniger Fehler
- Nur valide Kombinationen möglich
- Required-Felder je nach Typ
- Automatische Validierung

### 3. Performance
- Kleinere Payload-Dokumente
- Schnellere Ladezeiten
- Optimierte Queries

### 4. Wartbarkeit
- Klare Struktur
- Einfache Erweiterung
- Type-safe

---

## 🚀 Verwendung

```bash
# 1. Figma scannen
> Fetch Used Figma Components

# 2. Heroes mit conditional fields generieren
> Generate Heroes from Figma Inventory

# 3. Dev-Server starten
npm run dev

# 4. Testen
open http://localhost:3000/admin/collections/pages/create
```

Im Admin:
1. Hero-Typ aus Dropdown wählen
2. ✨ Passende Felder erscheinen automatisch
3. Inhalte eingeben
4. Speichern & Vorschau

---

**Version:** 3.1  
**Feature:** Conditional Fields für Heroes  
**Ziel:** Perfektes Admin-UX für unterschiedliche Hero-Typen
