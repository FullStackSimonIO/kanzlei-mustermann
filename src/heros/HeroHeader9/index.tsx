import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type HeroHeader9Type = Extract<Page['hero'], { type: 'heroheader9' }>

export const HeroHeader9: React.FC<HeroHeader9Type> = (props) => {
  const { title, richText, image, links } = props as any

  return (
    <section className="flex h-svh min-h-svh flex-col">
      <div className="relative flex-1">
        <div className="absolute inset-0 z-0">
          {image && typeof image !== 'string' && (
            <Media
              resource={image}
              className="absolute inset-0 size-full object-cover"
              imgClassName="object-cover"
            />
          )}
        </div>
      </div>
      <div className="px-[5%]">
        <div className="container relative z-10">
          <div className="grid grid-rows-1 items-start gap-y-5 py-12 md:grid-cols-2 md:gap-x-12 md:gap-y-8 md:py-18 lg:gap-x-20 lg:gap-y-16 lg:py-20">
            <h1 className="text-6xl font-bold text-text-primary md:text-9xl lg:text-10xl">
              {title}
            </h1>
            <div>
              {richText && (
                <div className="text-base text-text-primary md:text-md">
                  <RichText data={richText} enableGutter={false} />
                </div>
              )}
              {links && Array.isArray(links) && links.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                  {links.map((linkItem: any) => (
                    <CMSLink key={linkItem.id} {...linkItem.link} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
