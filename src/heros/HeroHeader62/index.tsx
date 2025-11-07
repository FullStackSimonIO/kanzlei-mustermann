import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

type HeroHeader62Type = Extract<Page['hero'], { type: 'heroheader62' }>

export const HeroHeader62: React.FC<HeroHeader62Type> = (props) => {
  const { title, richText, tagline, links } = props as any

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container max-w-lg text-center">
        {tagline && <p className="mb-3 font-semibold md:mb-4">{tagline}</p>}
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{title}</h1>
        {richText && (
          <div className="md:text-md">
            <RichText data={richText} enableGutter={false} />
          </div>
        )}
        {links && Array.isArray(links) && links.length > 0 && (
          <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
            {links.map((linkItem: any) => (
              <CMSLink key={linkItem.id} {...linkItem.link} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
