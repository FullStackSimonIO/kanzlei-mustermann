import React from 'react'
import type { Media as MediaType, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'
import { ScrollAnimationClient } from './ScrollAnimationClient'

type Layout416BlockType = Extract<Page['layout'][0], { blockType: 'layout416' }>

type Props = Layout416BlockType & {
  id?: string
}

export const Layout416Block: React.FC<Props> = ({
  tagline,
  heading,
  richText,
  links,
  featureSections,
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
        <div className="grid gap-8 md:gap-12 lg:gap-16">
          {/* Text Content */}
          <div className="flex flex-col justify-center">
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

          {/* Feature Sections with Scroll Animation */}
          {featureSections && featureSections.length > 0 && (
            <ScrollAnimationClient featureSections={featureSections} />
          )}
        </div>
      </div>
    </section>
  )
}
