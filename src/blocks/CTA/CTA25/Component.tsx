'use client'

import { CMSLink } from '@/components/Link'

export const CTA25Component: React.FC<any> = (props) => {
  const { heading, description, buttons } = props

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-lg text-center">
        {/* Heading */}
        {heading && (
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
        )}

        {/* Description */}
        {description && <p className="md:text-md">{description}</p>}

        {/* Buttons */}
        {buttons && (
          <div className="mt-6 flex items-center justify-center gap-4 md:mt-8">
            {(buttons as any[])?.map((button: any, index: number) => {
              const buttonLink = button.link
              return (
                <CMSLink
                  key={index}
                  type={buttonLink?.type}
                  url={buttonLink?.url}
                  reference={buttonLink?.reference}
                  label={button.label}
                  appearance={buttonLink?.appearance || 'default'}
                  newTab={buttonLink?.newTab}
                />
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
