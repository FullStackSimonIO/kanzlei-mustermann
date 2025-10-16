# Scope Definition - PayloadCMS Block-Generierung

## 🎯 Fokus: Intelligente Figma-basierte Generierung

Diese optimierten .mdc-Dateien generieren **NUR** die Blocks, die **tatsächlich im Figma-Design verwendet** werden.

---

## ✅ INKLUDIERT (Dynamisch nach Figma-Scan)

### Verwendungszweck
**Nur Komponenten, die im Figma-Design tatsächlich verwendet werden**

Typische Anzahl: 30-80 Blocks (statt alle 1071 Relume-Templates)

**Beispiel-Routes:**
- `/` - Homepage
- `/team` - Team-Seite
- `/preise` - Pricing
- `/kontakt` - Kontakt
- `/angebote` - **Übersichtsseite** (statisch)
- `/projekte` - **Übersichtsseite** (statisch)
- `/ueber-uns` - About

### Kategorien (dynamisch je nach Figma)

Beispiel für typisches Projekt:
1. **Header** (3-8 Blocks) - Hero Sections
2. **Layout** (5-12 Blocks) - Grids, Container
3. **CTA** (2-5 Blocks) - Call-to-Actions
4. **Testimonials** (1-3 Blocks) - Kundenbewertungen
5. **Contact** (2-4 Blocks) - Kontaktformulare
6. **Pricing** (1-2 Blocks) - Preistabellen
7. **Navbar** (1 Block) - Navigation
8. **Footer** (1 Block) - Footer
9. **Team** (1-3 Blocks) - Team-Sections
10. **Gallery** (1-2 Blocks) - Galerien
11. **FAQ** (1-2 Blocks) - FAQs
12. **Banners** (1-2 Blocks) - Benachrichtigungen

**Gesamt:** Typisch 30-80 Blocks (je nach Figma-Design)

**Nicht:** Alle 1071 Relume-Templates!

---

## ❌ AUSGESCHLOSSEN

### 1. Nicht im Figma verwendete Komponenten
Alle Relume-Templates, die nicht im Design vorkommen, werden **automatisch übersprungen**.

### 2. Komponenten für separate Module
Diese werden auch bei Verwendung im Figma separat behandelt:

### Blog-Modul (73 Komponenten)
**Kategorien:**
- Blog (68)
- BlogPostHeader (5)

**Routes:** `/blog/[slug]`

**Verwendung:**
- Blog-Post Detail-Seiten
- Author-Pages
- Category-Pages
- Tag-Pages

**Später erstellen mit separatem Prompt für:**
- Blog Collection
- Author Collection
- Category Taxonomy
- Tag Taxonomy
- Comment-System
- RSS Feed

---

### Service-/Angebotsmodul (27 Komponenten)
**Kategorien:**
- Career (27)

**Routes:** `/angebote/[slug]`

**Verwendung:**
- Service Detail-Seiten
- Angebots-Seiten
- Buchungs-Formulare
- Preiskalkulator

**Später erstellen mit separatem Prompt für:**
- Services Collection
- Booking-System
- Price-Calculator
- Service-Categories

---

### Projektmodul (72 Komponenten)
**Kategorien:**
- Events (37)
- Portfolio (23)
- PortfolioHeader (12)

**Routes:** `/projekte/[slug]`, `/events/[slug]`

**Verwendung:**
- Projekt Detail-Seiten
- Portfolio-Einträge
- Case Studies
- Event Detail-Seiten

**Später erstellen mit separatem Prompt für:**
- Projects Collection
- Portfolio Collection
- Events Collection
- Gallery-System
- Project-Filter

---

## 📊 Zusammenfassung

| Scope | Anzahl | Hinweis |
|-------|--------|---------|
| **✅ Im Figma verwendet** | 30-80 (typisch) | Wird generiert |
| **❌ Nicht im Figma** | ~990 | Wird übersprungen |
| **📦 Relume Gesamt** | 1071 | Nur Teilmenge wird verwendet |

**Vorteil:** Nur notwendige Blocks, kein Ballast!

---

## 🚀 Workflow

### Phase 1: Figma-Analyse (JETZT)
```bash
# Schritt 1: Figma scannen
> Fetch Used Figma Components

# Schritt 2: Blocks generieren
> Generate Blocks from Figma Inventory
```
**Generiert:** Nur verwendete Blocks (typisch 30-80)

---

### Phase 2: Blog-Modul (SPÄTER)
**Separater Prompt:**
```
"Erstelle vollständiges Blog-Modul mit:
- Blog Collection (mit Slug-Routing)
- 73 Blog-spezifische Blocks
- Author-System
- Categories & Tags
- Comment-System
- RSS Feed"
```

---

### Phase 3: Service-Modul (SPÄTER)
**Separater Prompt:**
```
"Erstelle Service-/Angebotsmodul mit:
- Services Collection (mit Slug-Routing)
- 27 Service-spezifische Blocks
- Buchungs-System
- Preis-Kalkulator
- Service-Kategorien"
```

---

### Phase 4: Projekt-Modul (SPÄTER)
**Separater Prompt:**
```
"Erstelle Projektmodul mit:
- Projects Collection (mit Slug-Routing)
- 72 Projekt-spezifische Blocks
- Portfolio-Filter
- Case-Study-Templates
- Event-Management"
```

---

## 🎯 Vorteile dieser Trennung

### 1. Klare Abgrenzung
- Pages Collection = Statische Seiten
- Separate Collections = Dynamische Detail-Seiten

### 2. Performance
- Weniger Blocks im Admin-Panel
- Schnellerer Build
- Bessere Übersicht

### 3. Wartbarkeit
- Modulare Struktur
- Einfachere Updates
- Gezielte Anpassungen

### 4. Skalierbarkeit
- Module können unabhängig entwickelt werden
- Einfaches Hinzufügen neuer Module
- Keine Abhängigkeiten zwischen Modulen

---

## 💡 Beispiele

### ✅ Richtig: Pages Collection
```typescript
// Route: /angebote (statisch)
{
  slug: 'angebote',
  title: 'Unsere Angebote',
  layout: [
    { blockType: 'headerHero1', ... },    // Hero
    { blockType: 'layoutGrid3', ... },    // Service-Grid
    { blockType: 'testimonial4', ... },   // Kundenbewertungen
    { blockType: 'ctaCTA12', ... },       // "Jetzt anfragen"
    { blockType: 'faqFAQ3', ... },        // FAQs
  ]
}
```

### ❌ Falsch: Pages Collection
```typescript
// Route: /angebote/rasen-mähen
// → Gehört in Services Collection!
```

---

**Version:** 2.1  
**Letzte Aktualisierung:** 2025-10-16  
**Gültig für:** PayloadCMS Pages Collection
