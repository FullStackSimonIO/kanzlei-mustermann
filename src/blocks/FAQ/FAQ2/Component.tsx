import React from 'react'
import type { Page } from '@/payload-types'
import { cn } from '@/utilities/ui'
import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { AccordionClient } from './AccordionClient'

type Faq2BlockType = Extract<Page['layout'][0], { blockType: 'faq2' }>

type Props = Faq2BlockType & {
  id?: string
}

export const FAQ2Block: React.FC<Props> = ({
  heading,
  description,
  questions,
  footerHeading,
  footerDescription,
  links,
  spacing = 'medium',
}: Props) => {
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
        <div className="mb-12 w-full max-w-2xl md:mb-18 lg:mb-20">
          {heading && (
            <h2 className="mb-5 text-4xl font-bold md:mb-6 md:text-5xl lg:text-6xl">{heading}</h2>
          )}
          {description && (
            <div>
              <RichText data={description} enableGutter={false} enableProse={true} />
            </div>
          )}
        </div>

        {/* Accordion Section */}
        {questions && questions.length > 0 && (
          <div className="mb-12 md:mb-18 lg:mb-20">
            <AccordionClient questions={questions} />
          </div>
        )}

        {/* Footer Section */}
        <div className="mt-12 md:mt-18 lg:mt-20">
          {footerHeading && (
            <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
              {footerHeading}
            </h3>
          )}
          {footerDescription && (
            <div className="mb-6">
              <RichText data={footerDescription} enableGutter={false} enableProse={true} />
            </div>
          )}
          {links && links.length > 0 && (
            <div className="mt-6 md:mt-8">
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
