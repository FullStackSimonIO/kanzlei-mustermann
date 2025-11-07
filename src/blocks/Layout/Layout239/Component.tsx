import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

type Layout239BlockType = Extract<Page['layout'][0], { blockType: 'layout239' }>

type Props = Layout239BlockType & {
  id?: string
}

export const Layout239Block: React.FC<Props> = ({
  tagline,
  heading,
  richText,
  sections,
  links,
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
        <div className="flex flex-col items-center">
          {/* Header Section */}
          <div className="mb-12 text-center md:mb-18 lg:mb-20">
            <div className="w-full max-w-lg mx-auto">
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
                <RichText
                  data={richText}
                  enableGutter={false}
                  enableProse={true}
                  className="text-gray-600 leading-relaxed"
                />
              )}
            </div>
          </div>

          {/* Sections Grid */}
          {sections && sections.length > 0 && (
            <div className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12 w-full mb-12 md:mb-18 lg:mb-20">
              {sections.map((section, index) => (
                <div key={index} className="flex w-full flex-col items-center text-center">
                  {/* Image */}
                  {section.image && typeof section.image === 'object' && (
                    <div className="mb-6 w-full overflow-hidden rounded-lg md:mb-8">
                      <Media
                        resource={section.image as MediaType}
                        className="w-full h-auto object-cover"
                        imgClassName="w-full h-auto object-cover"
                      />
                    </div>
                  )}

                  {/* Section Heading */}
                  {section.sectionHeading && (
                    <h3 className="mb-5 text-xl md:text-2xl lg:text-3xl font-bold md:mb-6 text-gray-900">
                      {section.sectionHeading}
                    </h3>
                  )}

                  {/* Description */}
                  {section.description && (
                    <p className="text-sm md:text-base text-gray-700">{section.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Call-to-Action Buttons */}
          {links && links.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center gap-4">
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
      </div>
    </section>
  )
}
