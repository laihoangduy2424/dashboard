'use client'

import { SamplePrompt } from '@/lib/mock-data'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'

interface SamplePromptsProps {
  prompts: SamplePrompt[]
}

export default function SamplePrompts({ prompts }: SamplePromptsProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between w-full transition-colors hover:text-accent"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-secondary">
            <Lightbulb size={18} className="text-accent" />
          </div>
          <h3 className="text-sm font-semibold text-foreground">Mẫu prompt gợi ý</h3>
        </div>
        <div className="text-muted-foreground">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {expanded && (
        <div className="space-y-2 mt-4 max-h-56 overflow-y-auto">
          {prompts.map(prompt => (
            <button
              key={prompt.id}
              onClick={() => navigator.clipboard.writeText(prompt.title)}
              className="w-full text-left px-4 py-3 rounded-lg bg-background hover:bg-muted transition-all duration-200 border border-transparent hover:border-border group"
              title="Nhấp để sao chép"
            >
              <div className="flex items-start gap-2 justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                    {prompt.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {prompt.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 ml-2 flex-shrink-0 px-2 py-1 rounded-md bg-secondary text-accent text-xs font-medium whitespace-nowrap">
                  {prompt.tokenCount} token
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
