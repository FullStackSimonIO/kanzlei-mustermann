# 🚀 Quick Start - Intelligente Block-Generierung aus Figma

Optimierte Cursor .mdc-Dateien für die **intelligente Generierung** von PayloadCMS Blocks und Hero-Sections mit **conditional Fields** basierend auf deinem Figma-Design.

---

## ⚡ TL;DR - Schnellster Weg

```bash
# In Cursor AI (Cmd/Ctrl+K):

# 1. Figma scannen
> Fetch Used Figma Components

# 2. Heroes generieren (mit conditional fields!)
> Generate Heroes from Figma Inventory

# 3. Blocks generieren
> Generate Blocks from Figma Inventory
```

**Das war's!** 🎉

**Dauer:** ~15 Minuten  
**Output:** 
- Heroes unter `/src/heros/` (mit conditional fields)
- Blocks unter `/src/blocks/`
- Nur tatsächlich verwendete Komponenten

---

## 🎯 Das Besondere

### 1. Intelligente Hero-Erkennung 🦸
**Figma-Komponenten mit "Header" im Namen** werden automatisch als **Hero-Sections** erkannt und unter `/src/heros/` gespeichert (nicht unter `/src/blocks/`).

### 2. Conditional Fields ✨
Jeder Hero-Typ zeigt **nur die relevanten Felder** im Admin-Panel:

```
Hero1 (mit Bild):
├── Titel ✓
├── Beschreibung ✓
├── Bild ✓
└── 2 Buttons ✓

Hero2 (mit Galerie):
├── Titel ✓
├── Beschreibung ✓
├── Bild-Galerie ✓  ← Statt einzelnem Bild
└── 1 Button ✓

Hero3 (mit Features):
├── Titel ✓
├── Beschreibung ✓
├── Feature-Liste ✓  ← Neu!
├── Bild ✓
└── 1 Button ✓

Hero4 (mit Formular):
├── Titel ✓
├── Beschreibung ✓
├── Formular-Felder ✓  ← Neu!
└── Bild ✓
```

### 3. Nur verwendete Komponenten 📦
Statt alle 1071 Relume-Templates werden nur die **im Figma verwendeten** Komponenten generiert (typisch 30-80).

---

## 🔄 Drei-Schritt-Workflow

### Schritt 1: Figma scannen 📷

```bash
> Fetch Used Figma Components
```

**Was passiert:**
1. Scannt alle Seiten im Figma
2. Identifiziert Komponenten
3. **Erkennt "Header"-Komponenten als Heroes**
4. Kategorisiert restliche Komponenten
5. Erstellt `FIGMA_INVENTORY.json`

**Dauer:** ~3 Minuten

**Output Beispiel:**
```json
{
  "categorized": {
    "Hero": [
      { "name": "Header 1 - Homepage", "page": "01 Homepage" },
      { "name": "Header 2 - Contact", "page": "03 Contact" },
      { "name": "Header 3 - About", "page": "02 About" }
    ],
    "Layout": [
      { "name": "Features Grid", "page": "01 Homepage" }
    ],
    "CTA": [
      { "name": "Newsletter CTA", "page": "01 Homepage" }
    ]
  }
}
```

---

### Schritt 2: Heroes generieren 🦸

```bash
> Generate Heroes from Figma Inventory
```

**Was passiert:**
1. Lädt Hero-Komponenten aus Inventory
2. **Analysiert Struktur jedes Heroes:**
   - Wie viele Bilder? → Galerie oder einzelnes Bild
   - Hat Formular? → Form-Felder hinzufügen
   - Hat Liste? → Feature-Array hinzufügen
3. **Generiert conditional Fields:**
   - Typ-Auswahl Dropdown
   - Felder werden dynamisch geladen
4. Speichert unter `/src/heros/Header1/index.tsx`
5. Erstellt `/src/heros/config.ts` mit allen conditionals
6. Updated `/src/heros/RenderHero.tsx`

**Dauer:** ~5 Minuten

**Output:**
```
src/heros/
├── Header1/
│   └── index.tsx       ← Hero mit Bild + 2 Buttons
├── Header2/
│   └── index.tsx       ← Hero mit Galerie
├── Header3/
│   └── index.tsx       ← Hero mit Features
├── config.ts           ← ✨ Conditional Fields!
└── RenderHero.tsx      ← Mapping
```

---

### Schritt 3: Blocks generieren 🏗️

```bash
> Generate Blocks from Figma Inventory
```

**Was passiert:**
1. Generiert restliche Komponenten (außer Heroes)
2. Speichert unter `/src/blocks/`
3. Registriert in Pages Collection
4. Updated PageRenderer

**Dauer:** ~8 Minuten

**Output:**
```
src/blocks/
├── Layout/
│   └── FeatureGrid/
├── CTA/
│   └── NewsletterCTA/
└── ... (weitere Kategorien)
```

---

## 🎨 Admin-Panel Erlebnis

### Hero-Auswahl mit Conditional Fields

#### 1. Hero-Typ wählen
```
Pages → Neue Page → Hero Section

┌─────────────────────────────────────┐
│ Hero Section                        │
├─────────────────────────────────────┤
│                                     │
│ Hero-Typ: [Dropdown ▼]             │
│  ├─ Kein Hero                       │
│  ├─ Header1 - Hero mit Bild         │
│  ├─ Header2 - Hero mit Galerie      │
│  ├─ Header3 - Hero mit Features     │
│  └─ Header4 - Hero mit Formular     │
│                                     │
└─────────────────────────────────────┘
```

#### 2. Wähle "Header1" → Passende Felder erscheinen!
```
┌─────────────────────────────────────┐
│ Hero-Typ: Header1 ✓                 │
│                                     │
│ ┌── Immer sichtbar ─────────────┐  │
│ │ Titel *                        │  │
│ │ [Ihre Überschrift...]          │  │
│ └────────────────────────────────┘  │
│                                     │
│ ┌── Conditional für Header1 ────┐  │
│ │ Beschreibung                   │  │ ← Nur für Header1
│ │ [...]                          │  │
│ │                                │  │
│ │ Bild                           │  │ ← Nur für Header1
│ │ [Upload...]                    │  │
│ │                                │  │
│ │ Haupt-Button                   │  │ ← Nur für Header1
│ │  Text: [...]                   │  │
│ │  URL: [...]                    │  │
│ │                                │  │
│ │ Zweiter Button                 │  │ ← Nur für Header1
│ │  Text: [...]                   │  │
│ └────────────────────────────────┘  │
└─────────────────────────────────────┘
```

#### 3. Wechsel zu "Header3" → Andere Felder!
```
┌─────────────────────────────────────┐
│ Hero-Typ: Header3 ✓                 │
│                                     │
│ Titel *                             │
│                                     │
│ ┌── Conditional für Header3 ────┐  │
│ │ Beschreibung                   │  │
│ │                                │  │
│ │ Feature-Liste ✓                │  │ ← NEU!
│ │  ┌─────────────────────────┐   │  │
│ │  │ Feature 1               │   │  │
│ │  │  Text: Schnelle Lieferung│   │  │
│ │  │  Icon: [truck.svg]       │   │  │
│ │  ├─────────────────────────┤   │  │
│ │  │ Feature 2               │   │  │
│ │  │  Text: 24/7 Support      │   │  │
│ │  │  Icon: [headset.svg]     │   │  │
│ │  └─────────────────────────┘   │  │
│ │  [+ Feature hinzufügen]        │  │
│ │                                │  │
│ │ Bild                           │  │
│ │ Haupt-Button                   │  │
│ └────────────────────────────────┘  │
└─────────────────────────────────────┘
```

---

## 📊 Beispiel-Projekt

### Dein Figma-Design:
```
Figma File: "Meine Website"
├── Homepage
│   ├── Header 1 (Bild rechts, 2 Buttons)
│   ├── Features Grid
│   └── Newsletter CTA
├── About
│   ├── Header 2 (Galerie mit 4 Bildern)
│   └── Team Grid
└── Contact
    ├── Header 3 (Formular)
    └── Contact Form
```

### Nach Generierung:

#### Heroes (`/src/heros/`):
```typescript
// Header1/index.tsx - Typ: heroWithImage
export const Header1 = ({ hero }) => (
  <section>
    <div className="grid md:grid-cols-2">
      <div>
        <h1>{hero.title}</h1>
        <p>{hero.description}</p>
        <div>
          <CMSLink {...hero.primaryCTA} />
          <CMSLink {...hero.secondaryCTA} />
        </div>
      </div>
      <Media resource={hero.media} />
    </div>
  </section>
)

// Header2/index.tsx - Typ: heroWithGallery  
export const Header2 = ({ hero }) => (
  <section>
    <h1>{hero.title}</h1>
    <div className="grid grid-cols-2 gap-4">
      {hero.mediaGallery.map(item => (
        <Media resource={item.image} />
      ))}
    </div>
  </section>
)

// Header3/index.tsx - Typ: heroWithForm
export const Header3 = ({ hero }) => (
  <section>
    <h1>{hero.title}</h1>
    {hero.showForm && (
      <form>
        <input type="email" placeholder="..." />
        <button>Absenden</button>
      </form>
    )}
  </section>
)
```

#### Config (`/src/heros/config.ts`):
```typescript
export const heroField = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'Header1 - Mit Bild', value: 'Header1' },
        { label: 'Header2 - Galerie', value: 'Header2' },
        { label: 'Header3 - Mit Form', value: 'Header3' },
      ]
    },
    {
      name: 'title',
      type: 'text',
      // Immer sichtbar
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        condition: (data) => 
          ['Header1', 'Header2', 'Header3'].includes(data?.hero?.type)
      }
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (data) => data?.hero?.type === 'Header1'  // ← Nur Header1!
      }
    },
    {
      name: 'mediaGallery',
      type: 'array',
      admin: {
        condition: (data) => data?.hero?.type === 'Header2'  // ← Nur Header2!
      }
    },
    {
      name: 'showForm',
      type: 'checkbox',
      admin: {
        condition: (data) => data?.hero?.type === 'Header3'  // ← Nur Header3!
      }
    },
    // ... weitere conditional fields
  ]
}
```

---

## 💡 Hero-Typ Erkennung

Die Generierung analysiert automatisch die Struktur:

```typescript
function categorizeHeroType(structure) {
  // Formular vorhanden?
  if (structure.inputs.length > 0) {
    return 'heroWithForm'
  }
  
  // Viele Bilder?
  if (structure.images.length > 3) {
    return 'heroWithGallery'
  }
  
  // Liste/Stichpunkte?
  if (structure.lists.length > 0) {
    return 'heroWithFeatures'
  }
  
  // Video?
  if (structure.videos.length > 0) {
    return 'heroWithVideo'
  }
  
  // Standard: Einzelnes Bild
  return 'heroWithImage'
}
```

---

## 🎯 Vorteile

### 1. Perfektes UX im Admin
- ✅ Keine verwirrenden, irrelevanten Felder
- ✅ Nur die Felder, die für den gewählten Hero relevant sind
- ✅ Klare Strukturierung

### 2. Typ-Sicherheit
- ✅ TypeScript-Interfaces pro Hero-Typ
- ✅ Automatische Validierung
- ✅ IntelliSense im Code

### 3. Performance
- ✅ Schnellere Ladezeiten (weniger Felder)
- ✅ Kleinere Datenbank-Queries
- ✅ Übersichtlicheres Admin-Panel

### 4. Wartbarkeit
- ✅ Klare Trennung Heroes vs. Blocks
- ✅ Einfache Erweiterung um neue Hero-Typen
- ✅ Automatisches Update bei Figma-Änderungen

---

## 🔧 Technische Details

### Dateistruktur
```
src/
├── heros/
│   ├── Header1/
│   │   └── index.tsx          ← React-Komponente
│   ├── Header2/
│   │   └── index.tsx
│   ├── config.ts              ← ✨ Conditional Fields Config
│   └── RenderHero.tsx         ← Dynamisches Rendering
│
├── blocks/
│   ├── Layout/
│   ├── CTA/
│   └── ... (keine Heroes!)
│
└── collections/
    └── Pages/
        └── config.ts          ← Importiert heroField
```

### Pages Collection Integration
```typescript
// src/collections/Pages/config.ts
import { heroField } from '@/heros/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    heroField,  // ← Hero mit conditional fields
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        // Alle anderen Blocks (keine Heroes!)
      ]
    }
  ]
}
```

---

## 🚀 Vollständiges Beispiel

### 1. Figma scannen
```bash
> Fetch Used Figma Components
```

Output: 45 Komponenten gefunden
- 3 Heroes (Header 1, 2, 3)
- 42 andere Komponenten

### 2. Heroes generieren
```bash
> Generate Heroes from Figma Inventory
```

Output:
```
✅ 3 Hero-Komponenten generiert
   - Header1 (heroWithImage)
   - Header2 (heroWithGallery)
   - Header3 (heroWithForm)

✅ Conditional fields konfiguriert
✅ RenderHero.tsx aktualisiert
```

### 3. Blocks generieren
```bash
> Generate Blocks from Figma Inventory
```

Output:
```
✅ 42 Blocks generiert
   (Heroes ausgeschlossen)
```

### 4. Im Admin testen
```bash
npm run dev
open http://localhost:3000/admin/collections/pages/create
```

Test im Admin:
1. **Hero-Typ wählen:** Header1
2. **Felder erscheinen:** Titel, Beschreibung, Bild, 2 Buttons
3. **Hero-Typ ändern:** Header2
4. **Andere Felder:** Titel, Beschreibung, Galerie (4 Bilder), 1 Button

✅ **Perfekt! Conditional Fields funktionieren!**

---

## 🐛 Troubleshooting

### Problem: Heroes werden nicht unter /src/heros/ gespeichert
```bash
# Lösung: Prüfe Figma-Komponenten-Namen
cat FIGMA_INVENTORY.json | grep -i "header"

# Müssen "Header" oder "Hero" im Namen haben
```

### Problem: Conditional Fields werden nicht angezeigt
```bash
# Lösung: Prüfe config.ts
cat src/heros/config.ts | grep "condition"

# Dev-Server neu starten
rm -rf .next
npm run dev
```

### Problem: Falscher Hero-Typ erkannt
```bash
# Lösung: Manuelle Anpassung in config.ts
# Ändere condition für spezifischen Hero-Typ
```

---

## 📚 Dokumentation

Nach erfolgreicher Generierung:
- `FIGMA_INVENTORY.md` - Alle gescannten Komponenten
- `BLOCKS_GENERATION_REPORT.md` - Generierungs-Report
- `src/heros/config.ts` - Hero-Config mit Erklärungen

---

## 🎉 Fertig!

Du hast jetzt:
- ✅ **Intelligente Hero-Sections** unter `/src/heros/`
- ✅ **Conditional Fields** im Admin-Panel
- ✅ **Automatische Typ-Erkennung**
- ✅ **Perfektes 1:1-Mapping** zu Figma
- ✅ **Nur benötigte Blocks** unter `/src/blocks/`

### Viel Erfolg! 🚀

---

**Version:** 3.1 - Heroes mit Conditional Fields  
**Letzte Aktualisierung:** 2025-10-16  
**Special Feature:** Intelligente Hero-Erkennung + Conditional Admin Fields
