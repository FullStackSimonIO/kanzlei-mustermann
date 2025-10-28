#!/usr/bin/env node

/**
 * AI-Powered Relume to PayloadCMS Block Generator
 *
 * Clont das Relume Repository temporär und nutzt KI (Claude Sonnet 4.5)
 * um Komponenten intelligent zu analysieren und in PayloadCMS Blöcke umzuwandeln
 *
 * Usage: pnpm generate-blocks Layout1 Layout2 CTA1 FAQ1
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import os from 'os'
import readline from 'readline'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GITHUB_REPO = 'https://github.com/FullStackSimonIO/relume-components.git'
const TEMP_DIR = path.join(os.tmpdir(), 'relume-components-temp')

// Farben für Console Output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

/**
 * Extrahiert Kategorie aus Block-Namen (z.B. "Layout1" -> "Layout")
 */
function extractCategory(blockName) {
  const match = blockName.match(/^([A-Za-z]+)/)
  return match ? match[1] : 'Layout'
}

/**
 * Clont das Relume Repository temporär
 */
function cloneRelumeRepo() {
  log(`\n📦 Cloning Relume repository...`, 'blue')

  // Lösche altes temp directory falls vorhanden
  if (fs.existsSync(TEMP_DIR)) {
    log(`  🗑️  Cleaning up old temp directory...`, 'yellow')
    fs.rmSync(TEMP_DIR, { recursive: true, force: true })
  }

  try {
    execSync(`git clone --depth 1 ${GITHUB_REPO} "${TEMP_DIR}"`, {
      stdio: 'pipe',
      encoding: 'utf-8',
    })
    log(`  ✅ Repository cloned successfully`, 'green')
    return true
  } catch (error) {
    log(`  ❌ Error cloning repository: ${error.message}`, 'red')
    return false
  }
}

/**
 * Liest Relume-Komponente aus dem geclonten Repo
 */
function readRelumeComponent(blockName) {
  const category = extractCategory(blockName)
  const componentPath = path.join(TEMP_DIR, category, blockName, 'component.tsx')

  log(`📂 Reading ${blockName} from local repo...`, 'blue')

  if (!fs.existsSync(componentPath)) {
    log(`  ❌ Component not found: ${componentPath}`, 'red')
    log(`  💡 Available in ${category}/: ${listAvailableBlocks(category).join(', ')}`, 'yellow')
    return null
  }

  try {
    const content = fs.readFileSync(componentPath, 'utf-8')
    log(`  ✅ Component loaded (${content.length} chars)`, 'green')
    return { content, category, componentPath }
  } catch (error) {
    log(`  ❌ Error reading component: ${error.message}`, 'red')
    return null
  }
}

/**
 * Listet verfügbare Blöcke in einer Kategorie
 */
function listAvailableBlocks(category) {
  const categoryPath = path.join(TEMP_DIR, category)
  if (!fs.existsSync(categoryPath)) return []

  try {
    return fs
      .readdirSync(categoryPath)
      .filter((name) => fs.statSync(path.join(categoryPath, name)).isDirectory())
      .slice(0, 10) // Nur erste 10 für Übersicht
  } catch {
    return []
  }
}

/**
 * Cleanup: Entfernt temporäres Repository
 */
function cleanupTempRepo() {
  if (fs.existsSync(TEMP_DIR)) {
    log(`\n🧹 Cleaning up temporary repository...`, 'blue')
    try {
      fs.rmSync(TEMP_DIR, { recursive: true, force: true })
      log(`  ✅ Cleanup complete`, 'green')
    } catch (error) {
      log(`  ⚠️  Could not cleanup: ${error.message}`, 'yellow')
    }
  }
}

/**
 * Erstellt AI Prompt für die Konvertierung
 */
function createAIPrompt(blockName, componentContent, category) {
  const existingExample = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'blocks', 'Layout', 'Layout1', 'Component.tsx'),
    'utf-8',
  )
  const existingConfig = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'blocks', 'Layout', 'Layout1', 'config.ts'),
    'utf-8',
  )

  return `# Aufgabe: Relume Komponente "${blockName}" in PayloadCMS Block umwandeln

## Kontext
Du bist ein Experte für PayloadCMS und React. Deine Aufgabe ist es, die folgende Relume-Komponente in einen vollständigen PayloadCMS Block umzuwandeln.

## Relume Komponente: ${blockName}

\`\`\`tsx
${componentContent}
\`\`\`

## Anforderungen

### 1. Erstelle config.ts
- Block Slug: \`${blockName.toLowerCase()}\`
- Interface Name: \`${blockName}Block\`
- **WICHTIG: KEINE Farboptionen (backgroundColor, etc.)**
- Deutsche Labels und Beschreibungen
- Verwende für Fließtexte: RichText mit vollem Lexical Editor (siehe Beispiel)
- Verwende für Links/Buttons: \`linkGroup()\` mit maxRows: 2
- Verwende für Bilder: \`type: 'upload', relationTo: 'media'\`
- Immer Felder: imagePosition (left/right), spacing (small/medium/large/none)

### 2. Erstelle Component.tsx
- **WICHTIG: KEIN 'use client' in Component.tsx - Server Component!**
- Type-safe mit: \`Extract<Page['layout'][0], { blockType: '${blockName.toLowerCase()}' }>\`
- Nutze: RichText, Media, CMSLink Komponenten
- Responsive Grid Layout
- Spacing Classes wie im Beispiel
- **KEINE Hintergrundfarben**

### 3. Interaktivität (falls nötig)
- **Falls** die Komponente Client-Interaktivität braucht (useState, onClick, etc.):
  * Erstelle separate Datei: \`InteractiveComponent.tsx\` mit \`'use client'\`
  * Importiere diese in \`Component.tsx\`
  * **NIEMALS** \`'use client'\` in \`Component.tsx\` selbst!
- **Grund**: \`'use client'\` macht alle Imports client-seitig, inkl. PayloadCMS → Node.js Module → Build-Fehler

## Beispiel Layout1 (Server Component - KEIN Interaktivität)

### config.ts Beispiel:
\`\`\`typescript
${existingConfig}
\`\`\`

### Component.tsx Beispiel:
\`\`\`tsx
${existingExample}
\`\`\`

## Beispiel Layout2 (mit Client Interaktivität - Video Modal)

### Component.tsx (Server Component):
\`\`\`tsx
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
\`\`\`

### VideoPlayer.tsx (Client Component):
\`\`\`tsx
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
\`\`\`

## Wichtige Mappings

Relume → PayloadCMS:
- \`tagline\` → text field "Unterüberschrift / Tagline"
- \`heading\` → text field "Überschrift" (required)
- \`description\` → richText field "Fließtext" (mit vollem Lexical Editor)
- \`buttons\` → linkGroup() "Call-to-Action Buttons"
- \`image\` / \`firstImage\` → upload field "Bild" (relationTo: 'media')
- \`icon\` → upload field "Icon" (wenn vorhanden)
- \`subHeadings\` → Analysieren und passend umsetzen
- \`sections\` → Analysieren und passend umsetzen
- \`features\` → Analysieren und passend umsetzen
- \`cards\` → Analysieren und passend umsetzen

## Output Format

Gib mir bitte **zwei bis drei** Code-Blöcke zurück:

**Immer erforderlich:**
\`\`\`typescript filename="config.ts"
// Vollständiger config.ts Inhalt hier
\`\`\`

\`\`\`tsx filename="Component.tsx"
// Vollständiger Component.tsx Inhalt hier (OHNE 'use client'!)
\`\`\`

**Optional (nur bei Client-Interaktivität):**
\`\`\`tsx filename="InteractiveComponent.tsx"
// Client Component mit 'use client' Directive
// NUR UI-Komponenten importieren, KEINE PayloadCMS Imports!
\`\`\`

Keine zusätzlichen Erklärungen, nur die Code-Blöcke!`
}

/**
 * Speichert AI-generierte Dateien
 */
function saveAIGeneratedFiles(blockName, category, aiResponse) {
  const blockDir = path.join(__dirname, '..', 'src', 'blocks', category, blockName)

  // Parse AI Response
  const configMatch = aiResponse.match(/```typescript filename="config\.ts"([\s\S]*?)```/)
  const componentMatch = aiResponse.match(/```tsx filename="Component\.tsx"([\s\S]*?)```/)

  // Optional: Client Component
  const interactiveMatch = aiResponse.match(/```tsx filename="(.*?\.tsx)"([\s\S]*?)```/g)
  let interactiveFiles = []

  if (interactiveMatch) {
    interactiveFiles = interactiveMatch
      .filter((match) => !match.includes('filename="Component.tsx"'))
      .map((match) => {
        const nameMatch = match.match(/filename="(.*?\.tsx)"/)
        const contentMatch = match.match(/```tsx filename=".*?\.tsx"([\s\S]*?)```/)
        return {
          name: nameMatch ? nameMatch[1] : null,
          content: contentMatch ? contentMatch[1].trim() : null,
        }
      })
      .filter((file) => file.name && file.content)
  }

  if (!configMatch || !componentMatch) {
    log(`  ❌ Could not parse AI response`, 'red')
    log(`  💾 Saving raw response to: ai-response-${blockName}.txt`, 'yellow')
    fs.writeFileSync(path.join(__dirname, `ai-response-${blockName}.txt`), aiResponse)
    return false
  }

  const configContent = configMatch[1].trim()
  const componentContent = componentMatch[1].trim()

  // Erstelle Verzeichnis
  fs.mkdirSync(blockDir, { recursive: true })

  // Erstelle config.ts
  fs.writeFileSync(path.join(blockDir, 'config.ts'), configContent)
  log(`  ✅ Created config.ts`, 'green')

  // Erstelle Component.tsx
  fs.writeFileSync(path.join(blockDir, 'Component.tsx'), componentContent)
  log(`  ✅ Created Component.tsx`, 'green')

  // Erstelle optionale Client Components
  if (interactiveFiles.length > 0) {
    interactiveFiles.forEach((file) => {
      fs.writeFileSync(path.join(blockDir, file.name), file.content)
      log(`  ✅ Created ${file.name} (Client Component)`, 'cyan')
    })
  }

  return true
}

/**
 * Registriert Block in RenderBlocks.tsx
 */
function registerInRenderBlocks(blockName, category, slug) {
  const renderBlocksPath = path.join(__dirname, '..', 'src', 'blocks', 'RenderBlocks.tsx')
  let content = fs.readFileSync(renderBlocksPath, 'utf-8')

  // Import hinzufügen
  const importStatement = `import { ${blockName}Block } from '@/blocks/${category}/${blockName}/Component'\n`
  content = content.replace(/(\/\* PLOP_IMPORTS \*\/)/, `${importStatement}$1`)

  // Block registrieren
  const blockRegistration = `  ${slug}: ${blockName}Block,\n  `
  content = content.replace(/(\/\* PLOP_EXPORTS \*\/)/, `${blockRegistration}$1`)

  fs.writeFileSync(renderBlocksPath, content)
  log(`  ✅ Registered in RenderBlocks.tsx`, 'green')
}

/**
 * Registriert Block in Pages Collection
 */
function registerInPagesCollection(blockName, category) {
  const pagesPath = path.join(__dirname, '..', 'src', 'collections', 'Pages', 'index.ts')
  let content = fs.readFileSync(pagesPath, 'utf-8')

  // Import hinzufügen
  const importStatement = `import { ${blockName} } from '@/blocks/${category}/${blockName}/config'\n`
  content = content.replace(/(\/\*\s*PLOP_IMPORT_BLOCK_CONFIG\s*\*\/)/, `${importStatement}$&`)

  // Block in Array hinzufügen
  const blockRegistration = `                ${blockName},\n                `
  content = content.replace(/(\/\*\s*PLOP_BLOCKS\s*\*\/)/, `${blockRegistration}$1`)

  fs.writeFileSync(pagesPath, content)
  log(`  ✅ Registered in Pages Collection`, 'green')
}

/**
 * Wartet auf User Input
 */
async function waitForInput(message) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  return new Promise((resolve) => {
    rl.question(message, (answer) => {
      rl.close()
      resolve(answer)
    })
  })
}

/**
 * Prozessiert einen einzelnen Block mit AI
 */
async function processBlockWithAI(blockName) {
  log(`\n${'─'.repeat(60)}`, 'blue')
  log(`🔨 Processing: ${blockName}`, 'bright')
  log(`${'─'.repeat(60)}`, 'blue')

  // Lese Komponente
  const result = readRelumeComponent(blockName)
  if (!result) return false

  const { content, category } = result
  const slug = blockName.toLowerCase()

  // Erstelle AI Prompt
  log(`🤖 Creating AI prompt...`, 'blue')
  const prompt = createAIPrompt(blockName, content, category)

  // Speichere Prompt
  const promptPath = path.join(__dirname, `prompt-${blockName}.md`)
  fs.writeFileSync(promptPath, prompt)
  log(`  📝 Prompt saved to: prompt-${blockName}.md`, 'green')

  // Anleitung für User
  log(`\n${'='.repeat(60)}`, 'yellow')
  log(`⚠️  MANUELLE AKTION ERFORDERLICH`, 'yellow')
  log(`${'='.repeat(60)}`, 'yellow')
  log(`\n1. Öffne: scripts/prompt-${blockName}.md`, 'cyan')
  log(`2. Kopiere den Prompt in Claude (Sonnet 4.5)`, 'cyan')
  log(`3. Kopiere die Antwort von Claude`, 'cyan')
  log(`4. Speichere sie in: scripts/ai-response-${blockName}.txt`, 'cyan')
  log(`\n5. Drücke Enter wenn fertig...\n`, 'cyan')

  // Warte auf User
  await waitForInput('')

  // Lese AI Response
  const responsePath = path.join(__dirname, `ai-response-${blockName}.txt`)
  if (!fs.existsSync(responsePath)) {
    log(`  ❌ AI response not found: ${responsePath}`, 'red')
    return false
  }

  const aiResponse = fs.readFileSync(responsePath, 'utf-8')
  log(`  ✅ AI response loaded`, 'green')

  // Speichere generierte Dateien
  log(`📝 Saving generated files...`, 'blue')
  const success = saveAIGeneratedFiles(blockName, category, aiResponse)
  if (!success) return false

  // Registriere Block
  log(`📋 Registering block...`, 'blue')
  registerInRenderBlocks(blockName, category, slug)
  registerInPagesCollection(blockName, category)

  log(`✅ ${blockName} successfully generated!`, 'green')
  return true
}

/**
 * Hauptfunktion
 */
async function main() {
  const blockNames = process.argv.slice(2)

  if (blockNames.length === 0) {
    log('❌ Usage: pnpm generate-blocks Layout1 Layout2 CTA1 FAQ1', 'red')
    log('   oder: node scripts/generate-blocks.mjs Layout1 Layout2', 'yellow')
    process.exit(1)
  }

  log(`\n${'='.repeat(60)}`, 'bright')
  log('🚀 AI-Powered Relume to PayloadCMS Block Generator', 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  log(`📦 Generiere ${blockNames.length} Block(s): ${blockNames.join(', ')}\n`, 'yellow')

  // Clone Repository
  const cloned = cloneRelumeRepo()
  if (!cloned) {
    log('\n❌ Could not clone repository. Aborting.', 'red')
    process.exit(1)
  }

  let successCount = 0

  // Prozessiere jeden Block einzeln
  for (const blockName of blockNames) {
    const success = await processBlockWithAI(blockName)
    if (success) successCount++
  }

  // Cleanup
  cleanupTempRepo()

  // Regeneriere Types
  if (successCount > 0) {
    log(`\n${'─'.repeat(60)}`, 'blue')
    log(`🔄 Regenerating PayloadCMS types...`, 'yellow')
    try {
      execSync('pnpm generate:types', { stdio: 'inherit' })
      log(`✅ Types regenerated successfully!`, 'green')
    } catch (error) {
      log(`❌ Error regenerating types: ${error.message}`, 'red')
    }
  }

  // Summary
  log(`\n${'='.repeat(60)}`, 'bright')
  log(`✨ ${successCount}/${blockNames.length} blocks generated successfully!`, 'bright')
  log(`${'='.repeat(60)}\n`, 'bright')

  if (successCount < blockNames.length) {
    log(`⚠️  Some blocks failed. Check the logs above.`, 'yellow')
  }
}

// Error Handler
process.on('SIGINT', () => {
  log('\n\n🛑 Process interrupted by user', 'yellow')
  cleanupTempRepo()
  process.exit(0)
})

main().catch((error) => {
  log(`\n❌ Fatal Error: ${error.message}`, 'red')
  console.error(error)
  cleanupTempRepo()
  process.exit(1)
})
