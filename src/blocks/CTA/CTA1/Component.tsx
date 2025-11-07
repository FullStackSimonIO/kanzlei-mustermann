import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Cta1BlockType = Extract<Page['layout'][0], { blockType: 'cta1' }>

type Props = Cta1BlockType & {
  id?: string
}

export const Cta1Block: React.FC<Props> = ({
  heading,
  richText,
  links,
  media,
  imagePosition = 'right',
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
        <div
          className={cn(
            'grid gap-8 md:gap-12 lg:gap-20 items-center',
            'grid-cols-1 lg:grid-cols-2',
            imagePosition === 'left' && 'lg:flex-row-reverse',
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              'flex flex-col justify-center',
              imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {/* Heading */}
            {heading && (
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl text-gray-900">
                {heading}
              </h2>
            )}

            {/* Rich Text Content */}
            {richText && (
              <div className="mb-8">
                <RichText
                  data={richText}
                  enableGutter={false}
                  enableProse={true}
                  className="text-gray-600 leading-relaxed md:text-base"
                />
              </div>
            )}

            {/* Call-to-Action Buttons */}
            {links && links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
                {links.map((linkItem: any, index: number) => {
                  const link = linkItem.link
                  return (
                    <CMSLink
                      key={index}
                      type={link?.type}
                      url={link?.url}
                      reference={link?.reference}
                      label={link?.label}
                      appearance={link?.appearance || 'default'}
                      newTab={link?.newTab}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Content */}
          <div
            className={cn(
              'relative w-full',
              imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            {media && typeof media === 'object' && (
              <div className="relative w-full overflow-hidden rounded-lg shadow-lg">
                <Media
                  resource={media as MediaType}
                  className="w-full h-auto object-cover"
                  imgClassName="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
