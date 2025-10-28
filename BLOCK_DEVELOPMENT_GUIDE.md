# PayloadCMS Block Development - Best Practices

## ⚠️ WICHTIG: Client vs. Server Components

### Das Problem

Wenn ein Block `'use client'` in der Haupt-Component.tsx verwendet, werden **ALLE Imports** client-seitig:
- `RichText` → `@payloadcms/richtext-lexical` → `payloadcms-lexical-ext` → `payload`
- PayloadCMS nutzt Node.js Module (`fs`, `worker_threads`, etc.)
- Diese Module können **nicht** im Browser laufen
- **Resultat:** `Module not found: Can't resolve 'fs'` Fehler

### ✅ Die Lösung: Separation of Concerns

#### Regel 1: Component.tsx ist IMMER ein Server Component
```tsx
// ✅ RICHTIG: Component.tsx (kein 'use client')
import React from 'react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { InteractiveFeature } from './InteractiveFeature' // Client Component

export const MyBlock: React.FC<Props> = ({ richText, media }) => {
  return (
    <section>
      <RichText data={richText} /> {/* Server-seitig OK */}
      <Media resource={media} /> {/* Server-seitig OK */}
      <InteractiveFeature /> {/* Client Component */}
    </section>
  )
}
```

```tsx
// ❌ FALSCH: Component.tsx mit 'use client'
'use client' // ← NIEMALS in Component.tsx!

import RichText from '@/components/RichText' // ← Wird client-seitig → FEHLER!
```

#### Regel 2: Interaktivität in separate Client Components auslagern

```tsx
// ✅ InteractiveFeature.tsx
'use client'

import React, { useState } from 'react'
// Nur UI-Komponenten importieren, KEINE PayloadCMS Imports!

export const InteractiveFeature: React.FC<Props> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      Toggle
    </button>
  )
}
```

## 📋 Block-Struktur Template

### Einfacher Block (keine Interaktivität)
```
src/blocks/Layout/MyBlock/
├── config.ts          # PayloadCMS Konfiguration
└── Component.tsx      # Server Component (kein 'use client')
```

### Block mit Interaktivität
```
src/blocks/Layout/MyBlock/
├── config.ts              # PayloadCMS Konfiguration
├── Component.tsx          # Server Component (kein 'use client')
└── InteractiveFeature.tsx # Client Component (mit 'use client')
```

## 🎯 Beispiele

### Beispiel 1: Layout1 (Server-Only)
```tsx
// Component.tsx
import React from 'react'
import RichText from '@/components/RichText'

export const Layout1Block: React.FC<Props> = ({ richText, media }) => {
  return (
    <section>
      <RichText data={richText} />
      <Media resource={media} />
    </section>
  )
}
```

### Beispiel 2: Layout2 (mit Video Modal)
```tsx
// Component.tsx (Server Component)
import React from 'react'
import RichText from '@/components/RichText'
import { VideoPlayer } from './VideoPlayer' // Client Component

export const Layout2Block: React.FC<Props> = ({ richText, videoUrl, media }) => {
  return (
    <section>
      <RichText data={richText} />
      <VideoPlayer videoUrl={videoUrl} media={media} />
    </section>
  )
}
```

```tsx
// VideoPlayer.tsx (Client Component)
'use client'

import React, { useState } from 'react'
import { Media } from '@/components/Media'

export const VideoPlayer: React.FC<Props> = ({ videoUrl, media }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <Media resource={media} />
      </button>
      {isOpen && <VideoModal videoUrl={videoUrl} />}
    </>
  )
}
```

## 🚀 Automated Generator

Das Script `scripts/generate-blocks.mjs` erstellt automatisch die richtige Struktur:

```bash
pnpm generate-blocks Layout3 CTA1 FAQ1
```

Die AI (Claude Sonnet 4.5) wurde instruiert:
- ✅ Component.tsx **ohne** `'use client'`
- ✅ Separate Client Components bei Bedarf
- ✅ Keine PayloadCMS Imports in Client Components

## 🔧 Troubleshooting

### Fehler: `Module not found: Can't resolve 'fs'`
**Ursache:** `'use client'` in Component.tsx, die RichText oder andere PayloadCMS-Komponenten importiert

**Lösung:**
1. Entferne `'use client'` aus Component.tsx
2. Erstelle separate Client Component für interaktive Features
3. Importiere Client Component in Component.tsx

### Fehler: `Can't resolve 'worker_threads'`
**Ursache:** Gleiche wie oben

**Lösung:** Gleiche wie oben

## 📝 Checklist für neue Blöcke

- [ ] `config.ts` erstellt mit deutschen Labels
- [ ] `Component.tsx` ist ein Server Component (kein `'use client'`)
- [ ] Interaktive Features in separate `*.tsx` Dateien ausgelagert
- [ ] Client Components importieren NUR UI-Komponenten
- [ ] Block in `RenderBlocks.tsx` registriert
- [ ] Block in `Pages/index.ts` registriert
- [ ] Types regeneriert: `pnpm generate:types`
- [ ] Dev-Server startet ohne Fehler: `pnpm dev`

## 🎓 Warum ist das wichtig?

Next.js 13+ nutzt **React Server Components** als Standard:
- Server Components: Rendern auf dem Server, können Node.js APIs nutzen
- Client Components: Rendern im Browser, kein Zugriff auf Node.js APIs

PayloadCMS ist ein **Backend-System** und nutzt Node.js:
- `fs` für File System
- `worker_threads` für Logging
- `crypto`, `path`, `os`, etc.

Wenn wir `'use client'` in Component.tsx verwenden, versucht Next.js, das gesamte PayloadCMS-System im Browser zu laden → **Fehler**.

## 📚 Weitere Ressourcen

- [Next.js Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [PayloadCMS Blocks](https://payloadcms.com/docs/fields/blocks)
- [React Server vs. Client Components](https://react.dev/reference/rsc/server-components)
