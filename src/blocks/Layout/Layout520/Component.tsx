import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Layout520BlockType = Extract<Page['layout'][0], { blockType: 'layout520' }>

type Props = Layout520BlockType & {
  id?: string
}

export const Layout520Block: React.FC<Props> = ({
  heading,
  tagline,
  richText,
  cards,
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
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            {tagline && (
              <p className="mb-3 font-semibold md:mb-4 text-primary uppercase text-sm tracking-wide">
                {tagline}
              </p>
            )}

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
        </div>

        {/* Cards Grid */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-3">
            {cards.map((card: any, index: number) => {
              const { logo, image, cardHeading, cardDescription, links } = card

              return (
                <div key={index} className="relative p-6 md:p-8 overflow-hidden rounded-lg">
                  {/* Background Image Overlay */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50" />
                    {image && typeof image === 'object' && (
                      <Media
                        resource={image as MediaType}
                        className="w-full h-full object-cover"
                        imgClassName="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Logo */}
                    {logo && typeof logo === 'object' && (
                      <div className="mb-5 md:mb-6">
                        <Media
                          resource={logo as MediaType}
                          className="h-12 w-12"
                          imgClassName="h-12 w-12 object-contain"
                        />
                      </div>
                    )}

                    {/* Heading */}
                    {cardHeading && (
                      <h3 className="mb-3 text-2xl font-bold text-white md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
                        {cardHeading}
                      </h3>
                    )}

                    {/* Description */}
                    {cardDescription && (
                      <p className="text-white text-sm md:text-base mb-5 md:mb-6">
                        {cardDescription}
                      </p>
                    )}

                    {/* Link/Button */}
                    {links && links.length > 0 && (
                      <div className="flex items-center">
                        {links.map((linkItem: any, linkIndex: number) => {
                          const link = linkItem.link
                          return (
                            <CMSLink
                              key={linkIndex}
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
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
