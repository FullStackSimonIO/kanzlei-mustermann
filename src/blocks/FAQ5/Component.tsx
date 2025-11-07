import React from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { AccordionContent } from './AccordionContent'

type FAQ5BlockType = Extract<Page['layout'][0], { blockType: 'faq5' }>

type Props = FAQ5BlockType & {
  id?: string
}

export const FAQ5Block: React.FC<Props> = ({
  heading,
  description,
  questions = [],
  footerHeading,
  footerDescription,
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

  // Extract footer button from links array
  const footerButton = Array.isArray(links) ? ((links[0] as any)?.link ?? null) : null

  return (
    <section
      className={cn(
        'w-full',
        spacingClasses[spacing as keyof typeof spacingClasses] || spacingClasses.medium,
      )}
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="rb-12 mb-12 max-w-lg md:mb-18 lg:mb-20">
          {/* Heading */}
          {heading && (
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          )}

          {/* Description */}
          {description && (
            <div className="md:text-base">
              <RichText data={description} enableGutter={false} enableProse={true} />
            </div>
          )}
        </div>

        {/* Accordion Section (Client Component) */}
        {questions && questions.length > 0 && <AccordionContent questions={questions} />}

        {/* Footer Section */}
        <div className="mt-12 md:mt-18 lg:mt-20">
          {/* Footer Heading */}
          {footerHeading && (
            <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
              {footerHeading}
            </h4>
          )}

          {/* Footer Description */}
          {footerDescription && (
            <div className="md:text-base mb-6">
              <RichText data={footerDescription} enableGutter={false} enableProse={true} />
            </div>
          )}

          {/* Footer Button */}
          {footerButton && (
            <div className="mt-6 md:mt-8">
              <CMSLink
                type={footerButton.type}
                url={footerButton.url}
                reference={footerButton.reference}
                label={footerButton.label}
                appearance={footerButton.appearance || 'default'}
                newTab={footerButton.newTab}
                className="inline-flex items-center justify-center px-6 py-3 font-semibold"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
