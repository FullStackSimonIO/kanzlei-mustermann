import React from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CarouselClient } from './CarouselClient'

type Gallery18BlockType = Extract<Page['layout'][0], { blockType: 'gallery18' }>

type Props = Gallery18BlockType & {
  id?: string
}

export const Gallery18Block: React.FC<Props> = ({
  heading,
  richText,
  images,
  spacing = 'medium',
}) => {
  const spacingClasses = {
    none: 'py-0',
    small: 'py-8 md:py-12',
    medium: 'py-12 md:py-16 lg:py-20',
    large: 'py-16 md:py-24 lg:py-32',
  }

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center md:mb-18 lg:mb-20">
          {heading && (
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl text-gray-900">
              {heading}
            </h2>
          )}

          {richText && (
            <RichText
              data={richText}
              enableGutter={false}
              enableProse={true}
              className="text-gray-600 leading-relaxed md:text-base"
            />
          )}
        </div>

        {/* Carousel */}
        {images && images.length > 0 && <CarouselClient images={images} />}
      </div>
    </section>
  )
}
