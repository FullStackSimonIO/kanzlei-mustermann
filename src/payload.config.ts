import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'

import sharp from 'sharp' // sharp-import
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import Messages from './collections/Messages'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    custom: {
      logo: {
        src: '/logo-wide.png',
        alt: 'Fullstack Factory CMS',
      },
      favicon: '/favicon.svg',
      footer: 'Fullstack Factory Automations',
      login: {
        background: '/login-background.jpg',
        logo: {
          src: '/logo-wide.png',
          alt: 'Fullstack Factory CMS',
        },
      },
    },
    meta: {
      titleSuffix: ' | Fullstack Factory CMS',

      icons: [
        {
          rel: 'icon',
          type: 'image/png',
          url: '/favicon.svg',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          url: '/apple-touch-icon.png',
        },
        {
          rel: 'logo',
          type: 'image/png',
          url: '/logo-wide.png',
        },
        {
          rel: 'beforeLogin',
          type: 'image/png',
          url: '/logo-wide.png',
        },
        {
          rel: 'ogImage',
          type: 'image/png',
          url: '/logo-wide.png',
        },
      ],
      openGraph: {
        description: 'Ihr professioneller Partner für Webentwicklung und Design',
        title: 'Fullstack Factory CMS',
        images: [
          {
            url: '/open-graph.png',
            width: 1200,
            height: 630,
            alt: 'Fullstack Factory CMS',
          },
        ],
        siteName: 'Fullstack Factory',
      },
    },
    timezones: {
      defaultTimezone: 'Europe/Berlin',
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      // beforeLogin: ['@/components/BeforeLogin'],

      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ['@/components/WelcomeMessage', '@/components/MonthlyVisitorChart'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  collections: [Pages, Messages, Posts, Media, Categories, Users],
  cors: [getServerSideURL()].filter(Boolean),
  globals: [Header, Footer],
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
    /*payloadDashboardAnalytics({
      provider: {
        source: 'plausible',
        apiSecret: PLAUSIBLE_API_KEY,
        siteId: PLAUSIBLE_SITE_ID,
        host: PLAUSIBLE_HOST, // optional, for self-hosted instances
      },
      cache: true,
      access: (user: any) => {
        return Boolean(user)
      },
      navigation: {
        afterNavLinks: [
          {
            type: 'live',
          },
        ],
      },
      dashboard: {
        beforeDashboard: ['viewsChart'],
        afterDashboard: ['topPages'],
      },
      globals: [
        {
          slug: 'homepage',
          widgets: [
            {
              type: 'info',
              label: 'Page data',
              metrics: ['views', 'sessions', 'sessionDuration'],
              timeframe: 'currentMonth',
              idMatcher: () => `/`,
            },
          ],
        },
      ],
      collections: [
        {
          slug: Posts.slug,
          widgets: [
            {
              type: 'chart',
              label: 'Views and visitors',
              metrics: ['views', 'visitors', 'sessions'],
              timeframe: '30d',
              idMatcher: (document: any) => `/articles/${document.slug}`,
            },
          ],
        },
      ],
    }),*/
  ],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
