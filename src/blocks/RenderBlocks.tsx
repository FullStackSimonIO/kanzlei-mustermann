import { Layout1Block } from '@/blocks/Layout/Layout1/Component'
import { Layout16Block } from '@/blocks/Layout/Layout16/Component'
import { Layout416Block } from '@/blocks/Layout/Layout416/Component'
import { Layout91Block } from '@/blocks/Layout/Layout91/Component'
import { Layout520Block } from '@/blocks/Layout/Layout520/Component'
import { Cta1Block } from '@/blocks/CTA/CTA1/Component'
import { CTA39Block } from '@/blocks/CTA/CTA39/Component'
import { FAQ2Block } from '@/blocks/FAQ/FAQ2/Component'
import { Gallery18Block } from '@/blocks/Gallery/Gallery18/Component'
import { Team12Block } from '@/blocks/Team/Team12/Component'
/* PLOP_IMPORTS */

import React, { Fragment } from 'react'
import type { Page } from '@/payload-types'

const blockComponents = {
  layout1: Layout1Block,
  layout16: Layout16Block,
  layout416: Layout416Block,
  layout91: Layout91Block,
  layout520: Layout520Block,
  cta1: Cta1Block,
  cta39: CTA39Block,
  faq2: FAQ2Block,
  gallery18: Gallery18Block,
  team12: Team12Block,

  /* PLOP_EXPORTS */
} // ! Block Komponenten hier importieren

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
