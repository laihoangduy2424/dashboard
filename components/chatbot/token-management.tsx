'use client'

import { TokenInfo } from '@/lib/mock-data'
import { Activity, Trash2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface TokenManagementProps {
  tokenInfo: TokenInfo
}

export default function TokenManagement({ tokenInfo }: TokenManagementProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleClearTokens = () => {
    setShowDeleteConfirm(false)
    // Mock clear tokens action
  }

  const tokensRemaining = tokenInfo.limit - tokenInfo.totalUsed
  const costEstimate = (tokenInfo.totalUsed / 1000000) * tokenInfo.costPerMillion
  const usagePercentage = (tokenInfo.totalUsed / tokenInfo.limit) * 100

  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-5 border-b border-border">
        <div className="p-2 rounded-lg bg-secondary">
          <Activity size={18} className="text-accent" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">Token Analytics</h3>
      </div>

      {/* Token Usage Stats */}
      <div className="space-y-5 flex-1 overflow-y-auto">
        {/* Usage Progress */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-foreground">Token sử dụng</span>
            <span className="text-sm font-semibold text-foreground">
              {tokenInfo.totalUsed.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                usagePercentage > 80
                  ? 'bg-destructive'
                  : usagePercentage > 50
                  ? 'bg-accent'
                  : 'bg-primary'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {usagePercentage.toFixed(1)}% của {tokenInfo.limit.toLocaleString()} giới hạn
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              {tokensRemaining.toLocaleString()} còn lại
            </span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="space-y-2">
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Chi phí ước tính</span>
              <span className="text-base font-semibold text-foreground">
                ${costEstimate.toFixed(4)}
              </span>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">Giá / 1M tokens</span>
              <span className="text-base font-semibold text-foreground">
                ${tokenInfo.costPerMillion}
              </span>
            </div>
          </div>
        </div>

        {/* Alert if usage is high */}
        {usagePercentage > 80 && (
          <div className="bg-destructive/8 border border-destructive/20 rounded-lg p-4 flex gap-3">
            <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-destructive mb-0.5">Cảnh báo sử dụng cao</p>
              <p className="text-xs text-destructive/80 leading-relaxed">Bạn đã sử dụng hơn 80% giới hạn token hàng ngày</p>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-5 border-t border-border mt-auto">
        {!showDeleteConfirm ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDeleteConfirm(true)}
            className="w-full gap-2 text-destructive hover:text-destructive hover:bg-destructive/5"
          >
            <Trash2 size={16} />
            Xóa lịch sử token
          </Button>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-foreground font-medium">Xóa lịch sử token?</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleClearTokens}
                className="flex-1 bg-destructive hover:bg-destructive/90"
              >
                Xóa
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1"
              >
                Hủy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
