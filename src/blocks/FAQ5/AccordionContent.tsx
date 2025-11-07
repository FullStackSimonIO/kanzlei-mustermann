'use client'

import React, { useState } from 'react'
import RichText from '@/components/RichText'
import { RxPlus } from 'react-icons/rx'

interface Question {
  title: string
  answer: any
}

interface AccordionContentProps {
  questions: Question[]
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ questions }) => {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  return (
    <div className="grid items-start justify-stretch gap-4">
      {questions.map((question, index) => (
        <div key={index} className="border border-gray-200 px-5 md:px-6 rounded-md overflow-hidden">
          {/* Accordion Trigger */}
          <button
            onClick={() => toggleItem(index)}
            className="w-full py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-base md:text-lg font-semibold pr-4 flex-1">{question.title}</h3>
            <RxPlus
              className={cn(
                'size-6 md:size-7 flex-shrink-0 text-gray-700 transition-transform duration-300',
                openItems.has(index) && 'rotate-45',
              )}
            />
          </button>

          {/* Accordion Content */}
          {openItems.has(index) && (
            <div className="pb-4 md:pb-6 border-t border-gray-200">
              <div className="pt-4 md:pt-6 prose prose-sm max-w-none">
                <RichText data={question.answer} enableGutter={false} enableProse={true} />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Helper function
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(' ')
}
