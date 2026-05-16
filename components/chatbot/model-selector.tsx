'use client'

import { ChatbotModel } from '@/lib/mock-data'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Cpu } from 'lucide-react'

interface ModelSelectorProps {
  models: ChatbotModel[]
  selectedModel: string
  onModelChange: (modelId: string) => void
}

export default function ModelSelector({ models, selectedModel, onModelChange }: ModelSelectorProps) {
  const selected = models.find(m => m.id === selectedModel)

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-secondary">
          <Cpu size={18} className="text-accent" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Chọn mô hình AI</h3>
      </div>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full bg-background hover:bg-muted/50 transition-colors">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="w-full">
          {models.map(model => (
            <SelectItem key={model.id} value={model.id}>
              <div className="flex flex-col gap-1">
                <span className="font-medium text-sm">{model.name}</span>
                <span className="text-xs text-muted-foreground">{model.description}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selected && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Context Window</span>
            <span className="text-xs font-semibold text-foreground">
              {selected.contextWindow.toLocaleString()} tokens
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
