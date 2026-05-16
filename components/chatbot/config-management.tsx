'use client'

import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { ChatbotModel } from '@/lib/mock-data'

interface ConfigManagementProps {
  models: ChatbotModel[]
}

export default function ConfigManagement({ models }: ConfigManagementProps) {
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [config, setConfig] = useState({
    model: models[0]?.id || '',
    systemPrompt: 'You are a helpful assistant that provides information about rental properties. Be friendly, professional, and concise in your responses.',
    knowledgeSource: 'property_database',
    dailyTokenLimit: 1000000,
    inputTokenLimit: 500000,
    outputTokenLimit: 500000,
  })

  const handleSave = async () => {
    setIsSaving(true)
    setSaveSuccess(false)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Configuration Card */}
      <Card className="p-6 border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-6">Cấu hình Chatbot</h3>

        <div className="space-y-5">
          {/* Model Selection */}
          <div className="space-y-2">
            <Label htmlFor="model" className="text-sm font-medium text-foreground">
              Mô hình
            </Label>
            <Select value={config.model} onValueChange={(value) => setConfig({ ...config, model: value })}>
              <SelectTrigger id="model" className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map(model => (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex flex-col">
                      <span className="font-medium">{model.name}</span>
                      <span className="text-xs text-muted-foreground">{model.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Context Window: {models.find(m => m.id === config.model)?.contextWindow.toLocaleString()} tokens
            </p>
          </div>

          {/* System Prompt */}
          <div className="space-y-2">
            <Label htmlFor="prompt" className="text-sm font-medium text-foreground">
              Prompt hệ thống
            </Label>
            <Textarea
              id="prompt"
              value={config.systemPrompt}
              onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
              placeholder="Nhập prompt hệ thống cho chatbot..."
              rows={6}
              className="bg-background border-border resize-none"
            />
            <p className="text-xs text-muted-foreground">
              {config.systemPrompt.length} ký tự
            </p>
          </div>

          {/* Knowledge Source */}
          <div className="space-y-2">
            <Label htmlFor="knowledge" className="text-sm font-medium text-foreground">
              Nguồn tri thức
            </Label>
            <Select value={config.knowledgeSource} onValueChange={(value) => setConfig({ ...config, knowledgeSource: value })}>
              <SelectTrigger id="knowledge" className="bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="property_database">Property Database</SelectItem>
                <SelectItem value="faqs">FAQs & Documentation</SelectItem>
                <SelectItem value="policies">Policies & Terms</SelectItem>
                <SelectItem value="combined">Combined Sources</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Token Management Card */}
      <Card className="p-6 border-2 border-accent">
        <h3 className="text-lg font-semibold text-foreground mb-6">Quản lý Token</h3>

        <div className="space-y-5">
          {/* Daily Token Limit */}
          <div className="space-y-2">
            <Label htmlFor="daily-limit" className="text-sm font-medium text-foreground">
              Số lượng token/ngày
            </Label>
            <Input
              id="daily-limit"
              type="number"
              value={config.dailyTokenLimit}
              onChange={(e) => setConfig({ ...config, dailyTokenLimit: parseInt(e.target.value) || 0 })}
              className="bg-background border-border"
            />
          </div>

          {/* Input Token Limit */}
          <div className="space-y-2">
            <Label htmlFor="input-limit" className="text-sm font-medium text-foreground">
              Số lượng token đầu vào
            </Label>
            <Input
              id="input-limit"
              type="number"
              value={config.inputTokenLimit}
              onChange={(e) => setConfig({ ...config, inputTokenLimit: parseInt(e.target.value) || 0 })}
              className="bg-background border-border"
            />
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-full rounded-full"
                style={{ width: `${(config.inputTokenLimit / config.dailyTokenLimit) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {((config.inputTokenLimit / config.dailyTokenLimit) * 100).toFixed(1)}% của giới hạn hàng ngày
            </p>
          </div>

          {/* Output Token Limit */}
          <div className="space-y-2">
            <Label htmlFor="output-limit" className="text-sm font-medium text-foreground">
              Số lượng token đầu ra
            </Label>
            <Input
              id="output-limit"
              type="number"
              value={config.outputTokenLimit}
              onChange={(e) => setConfig({ ...config, outputTokenLimit: parseInt(e.target.value) || 0 })}
              className="bg-background border-border"
            />
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-full rounded-full"
                style={{ width: `${(config.outputTokenLimit / config.dailyTokenLimit) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {((config.outputTokenLimit / config.dailyTokenLimit) * 100).toFixed(1)}% của giới hạn hàng ngày
            </p>
          </div>
        </div>
      </Card>

      {/* Save Status */}
      {saveSuccess && (
        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <p className="text-sm text-green-700">Cài đặt đã được lưu thành công</p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="gap-2 bg-primary hover:bg-primary/90"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
              Đang lưu...
            </>
          ) : (
            <>
              <Save size={18} />
              Lưu thay đổi
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
