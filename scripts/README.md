# Relume Block Generator

Automatischer Generator der Relume-Komponenten vom GitHub Repository holt und in PayloadCMS Blöcke umwandelt.

## 🚀 Verwendung

```bash
pnpm generate-blocks Layout1 Layout2 Layout3 CTA1 FAQ1
```

## 📦 Was macht das Script?

1. **Fetcht Komponenten** vom [Relume Components Repository](https://github.com/FullStackSimonIO/relume-components)
2. **Analysiert die Struktur** (Props wie tagline, heading, description, buttons, images)
3. **Generiert PayloadCMS Dateien**:
   - `config.ts` - Block-Konfiguration mit allen Feldern
   - `Component.tsx` - React Frontend-Komponente
4. **Registriert automatisch**:
   - In `RenderBlocks.tsx`
   - In `Pages Collection`
5. **Regeneriert Types** mit `pnpm generate:types`

## 📝 Beispiele

### Einzelner Block
```bash
pnpm generate-blocks Layout1
```

### Mehrere Blöcke auf einmal
```bash
pnpm generate-blocks Layout1 Layout2 Layout3 Layout4
```

### Mix aus verschiedenen Kategorien
```bash
pnpm generate-blocks Layout1 CTA1 FAQ1 Team1 Contact1
```

## 📂 Kategorien

Das Script erkennt automatisch die Kategorie aus dem Namen:

- **Layout1-500** → `src/blocks/Layout/`
- **CTA1-50** → `src/blocks/CTA/`
- **FAQ1-50** → `src/blocks/FAQ/`
- **Team1-50** → `src/blocks/Team/`
- **Contact1-50** → `src/blocks/Contact/`
- **Hero1-50** → `src/blocks/Hero/`

## ✨ Features

### Automatische Feld-Erkennung
Das Script analysiert die Relume-Komponente und erstellt automatisch die richtigen PayloadCMS Felder:

- ✅ **Tagline** - Unterüberschrift
- ✅ **Heading** - Hauptüberschrift
- ✅ **Description** → **RichText** mit vollem Lexical Editor
- ✅ **Buttons** → **linkGroup()** mit bis zu 2 Links
- ✅ **Images** → **Media Upload** mit `relationTo: 'media'`
- ✅ **Image Position** - Links/Rechts Auswahl
- ✅ **Spacing** - Abstände (Klein/Mittel/Groß/Keine)

### RichText Editor Features
Alle generierten RichText-Felder enthalten:
- Textformatierung (Fett, Kursiv, Unterstrichen, etc.)
- Überschriften (H1-H6)
- Listen (geordnet, ungeordnet, Checklisten)
- Farben (Text, Hintergrund, Markierungen)
- Links (intern & extern)
- Video-Einbettung (YouTube, Vimeo)
- Toolbars (Fixed & Inline)

### Deutsche Labels
Alle Felder haben deutsche Beschreibungen für benutzerfreundliche Bedienung.

## 🎯 Workflow

1. **Komponente auswählen** auf [Relume.io](https://relume.io/components)
2. **Namen notieren** (z.B. "Layout1")
3. **Script ausführen**: `pnpm generate-blocks Layout1`
4. **Fertig!** Block ist einsatzbereit

## 🔧 Anpassungen

Nach der Generierung können Sie:

1. **Labels anpassen** in `config.ts`:
   ```typescript
   labels: {
     singular: 'Mein Custom Block',
     plural: 'Meine Custom Blöcke',
   }
   ```

2. **Styling ändern** in `Component.tsx`:
   ```tsx
   className="text-3xl md:text-4xl lg:text-5xl font-bold"
   ```

3. **Felder hinzufügen/entfernen** in `config.ts`:
   ```typescript
   fields: [
     // Ihre eigenen Felder hier
   ]
   ```

## 📖 Struktur der generierten Dateien

```
src/blocks/
└── Layout/
    └── Layout1/
        ├── config.ts       # Block-Konfiguration für PayloadCMS
        └── Component.tsx   # React Frontend-Komponente
```

### config.ts
- Block Slug und Interface Name
- Deutsche Labels und Beschreibungen
- Alle Felder mit Admin-Beschreibungen
- RichText mit vollem Lexical Editor
- linkGroup() für Buttons
- Media Upload
- Bild Position & Spacing Optionen

### Component.tsx
- Type-safe Props
- Responsive Grid Layout
- RichText Rendering
- Media Component
- CMSLink für Buttons
- Flexible Bild-Position
- Spacing Classes

## ⚡ Performance

Das Script arbeitet parallel und generiert mehrere Blöcke gleichzeitig:

```bash
# Generiert 10 Blöcke in ~5-10 Sekunden
pnpm generate-blocks Layout1 Layout2 Layout3 Layout4 Layout5 Layout6 Layout7 Layout8 Layout9 Layout10
```

## 🐛 Troubleshooting

### "Error fetching [BlockName]"
- Überprüfen Sie, ob der Block im Repository existiert
- Korrekte Schreibweise? (Layout1, nicht layout1)

### "Error regenerating types"
- Manuell ausführen: `pnpm generate:types`
- Dev-Server neustarten: `pnpm dev`

### Block wird nicht angezeigt
- Types regeneriert? `pnpm generate:types`
- Dev-Server neugestartet?
- Browser-Cache geleert?

## 📚 Weitere Informationen

- [PayloadCMS Blocks Dokumentation](https://payloadcms.com/docs/configuration/blocks)
- [Relume Components Library](https://relume.io/components)
- [Relume GitHub Repository](https://github.com/FullStackSimonIO/relume-components)

## 🎉 Happy Coding!

Mit diesem Generator können Sie in Sekunden professionelle Blöcke erstellen und direkt in Ihrem PayloadCMS verwenden.
