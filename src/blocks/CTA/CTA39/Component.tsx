import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type CTA39BlockType = Extract<Page['layout'][0], { blockType: 'cta39' }>

type Props = CTA39BlockType & {
  id?: string
}

export const CTA39Block: React.FC<Props> = ({
  heading,
  description,
  links,
  image,
  imagePosition = 'right',
  spacing = 'medium',
}: Props) => {
  // Abstände Mapping
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
            'grid gap-8 md:gap-12 lg:gap-16 items-center',
            'grid-cols-1 lg:grid-cols-2',
            'border border-border-primary',
          )}
        >
          {/* Text Content */}
          <div
            className={cn(
              'flex flex-col justify-center p-6 md:p-8 lg:p-12',
              imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1',
            )}
          >
            {/* Heading */}
            {heading && (
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5 md:mb-6 text-gray-900">
                {heading}
              </h2>
            )}

            {/* Rich Text Content - Description */}
            {description && (
              <div className="mb-6 md:mb-8">
                <RichText
                  data={description}
                  enableGutter={false}
                  enableProse={true}
                  className="text-base md:text-lg text-gray-600 leading-relaxed"
                />
              </div>
            )}

            {/* Call-to-Action Buttons */}
            {Array.isArray(links) && links.length > 0 && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                {links.map((linkItem, index: number) => {
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
                      className={cn('inline-flex items-center justify-center')}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Content */}
          <div
            className={cn(
              'relative w-full h-full',
              imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2',
            )}
          >
            {image && typeof image === 'object' && (
              <div className="relative w-full h-full overflow-hidden">
                <Media
                  resource={image as MediaType}
                  className="w-full h-full object-cover"
                  imgClassName="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
