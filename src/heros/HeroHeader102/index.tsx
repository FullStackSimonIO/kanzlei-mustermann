import React from 'react'
import type { Page } from '@/payload-types'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { HeroHeader102Carousel } from './Carousel.client'

type HeroHeader102Type = Extract<Page['hero'], { type: 'heroheader102' }>

export const HeroHeader102: React.FC<HeroHeader102Type> = (props) => {
  const { title, richText, links, carouselImages, carouselTitle, carouselDescription } =
    props as any

  return (
    <section className="grid grid-cols-1 items-center gap-y-16 overflow-hidden pt-16 sm:overflow-auto md:pt-24 lg:grid-cols-[50%_50%] lg:gap-y-0 lg:pt-0">
      <div className="mx-[5%] max-w-md justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">{title}</h1>
        {richText && (
          <div className="md:text-md">
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
      {carouselImages && Array.isArray(carouselImages) && carouselImages.length > 0 && (
        <HeroHeader102Carousel
          images={carouselImages}
          carouselTitle={carouselTitle}
          carouselDescription={carouselDescription}
        />
      )}
    </section>
  )
}
