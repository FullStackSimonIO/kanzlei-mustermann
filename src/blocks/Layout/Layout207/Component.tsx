'use client'

import { Media } from '@/components/Media'
import { CMSLink } from '@/components/Link'

export const Layout207Component: React.FC<any> = (props) => {
  const { tagline, heading, description, buttons, image, features } = props

  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          {/* Image */}
          <div className="order-2 md:order-1">
            {image && <Media resource={image} className="w-full object-cover" />}
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            {/* Tagline */}
            {tagline && <p className="mb-3 font-semibold md:mb-4">{tagline}</p>}

            {/* Heading */}
            {heading && (
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
            )}

            {/* Description */}
            {description && <p className="mb-5 md:mb-6 md:text-md">{description}</p>}

            {/* Features List */}
            {features && (
              <div className="grid grid-cols-1 gap-4 py-2">
                {(features as any[])?.map((feature: any, index: number) => (
                  <div key={index} className="flex self-start">
                    <div className="mr-4 flex-none self-start">
                      {feature.icon && (
                        <Media resource={feature.icon} className="h-6 w-6 object-contain" />
                      )}
                    </div>
                    <p>{feature.paragraph}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Buttons */}
            {buttons && (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
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
        </div>
      </div>
    </section>
  )
}
