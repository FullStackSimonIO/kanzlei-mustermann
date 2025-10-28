import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Layout1BlockType = Extract<Page['layout'][0], { blockType: 'layout1' }>

type Props = Layout1BlockType & {
  id?: string
}

export const Layout1Block: React.FC<Props> = ({
  heading,
  tagline,
  richText,
  links,
  media,
  imagePosition = 'right',
  spacing = 'medium',
}) => {
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
            'grid-cols-1 md:grid-cols-2',
            imagePosition === 'left' && 'md:flex-row-reverse',
          )}
        >
          {/* Text Content - Links */}
          <div
            className={cn(
              'flex flex-col justify-center',
              imagePosition === 'left' ? 'md:order-2' : 'md:order-1',
            )}
          >
            {/* Tagline */}
            {tagline && (
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
                {tagline}
              </p>
            )}

            {/* Heading */}
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">
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
                  className="text-gray-600 leading-relaxed"
                />
              </div>
            )}

            {/* Call-to-Action Buttons */}
            {links && links.length > 0 && (
              <div className="flex flex-col sm:flex-row gap-4">
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
                      className={cn(
                        'inline-flex items-center justify-center',
                        index === 0 ? 'font-semibold' : '',
                      )}
                    />
                  )
                })}
              </div>
            )}
          </div>

          {/* Image Content - Rechts (oder Links je nach imagePosition) */}
          <div
            className={cn(
              'relative w-full',
              imagePosition === 'left' ? 'md:order-1' : 'md:order-2',
            )}
          >
            {media && typeof media === 'object' && (
              <div className="relative rounded-lg overflow-hidden shadow-lg aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]">
                <Media
                  resource={media as MediaType}
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
