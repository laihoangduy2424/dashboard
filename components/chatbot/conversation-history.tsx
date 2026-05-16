'use client'

import { useState } from 'react'
import { Search, ChevronDown, Eye, Download, Trash2, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DashboardConversation } from '@/lib/mock-data'
import ConversationDetailModal from './conversation-detail-modal'

interface ConversationHistoryProps {
  conversations: DashboardConversation[]
}

export default function ConversationHistory({ conversations }: ConversationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedConv, setSelectedConv] = useState<DashboardConversation | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'oldest'>('recent')

  const filteredConversations = conversations
    .filter(conv =>
      conv.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.recipient.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') {
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
      }
      return new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime()
    })

  const statusConfig = {
    active: { label: 'Hoạt động', color: 'bg-green-500/20 text-green-700 border-green-500/30' },
    resolved: { label: 'Hoàn thành', color: 'bg-blue-500/20 text-blue-700 border-blue-500/30' },
    pending_response: { label: 'Chờ phản hồi', color: 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30' },
  }

  const convTypeConfig = {
    landlord_to_tenant: { label: 'Chủ → Thuê', bg: 'bg-blue-500/10' },
    user_to_chatbot: { label: 'User → Bot', bg: 'bg-purple-500/10' },
    tenant_to_tenant: { label: 'Thuê → Thuê', bg: 'bg-orange-500/10' },
  }

  const handleViewDetail = (conv: DashboardConversation) => {
    setSelectedConv(conv)
    setIsModalOpen(true)
  }

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Search and Filters */}
        <Card className="p-4 sm:p-5 border border-border">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-background border-border text-xs sm:text-sm"
              />
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Filter size={16} className="text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground">Sắp xếp:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recent' | 'oldest')}
                className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm rounded-md bg-background border border-border text-foreground w-full sm:w-auto"
              >
                <option value="recent">Mới nhất trước</option>
                <option value="oldest">Cũ nhất trước</option>
              </select>
              <span className="text-xs text-muted-foreground ml-0 sm:ml-auto">
                {filteredConversations.length} cuộc
              </span>
            </div>
          </div>
        </Card>

        {/* Conversations Table/Cards */}
        <Card className="border border-border overflow-hidden">
          {filteredConversations.length === 0 ? (
            <div className="p-6 sm:p-8 text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">Không tìm thấy cuộc hội thoại nào</p>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Loại</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Người gửi</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Người nhận</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Cập nhật</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Trạng thái</th>
                      <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-foreground whitespace-nowrap">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredConversations.map(conv => (
                      <tr key={conv.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium ${convTypeConfig[conv.conversationType].bg}`}
                          >
                            {convTypeConfig[conv.conversationType].label}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-foreground truncate">{conv.sender}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-foreground truncate">{conv.recipient}</td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-muted-foreground text-xs whitespace-nowrap">
                          {conv.lastUpdated}
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <Badge
                            variant="outline"
                            className={`text-xs font-medium border ${statusConfig[conv.status].color}`}
                          >
                            {statusConfig[conv.status].label}
                          </Badge>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4">
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleViewDetail(conv)}
                              className="gap-1 h-8 px-2 text-xs hover:bg-muted"
                              title="Xem chi tiết"
                            >
                              <Eye size={14} />
                              <span className="hidden md:inline">Chi tiết</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1 h-8 px-2 text-xs hover:bg-muted"
                              title="Tải xuống"
                            >
                              <Download size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="gap-1 h-8 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                              title="Xóa"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="sm:hidden space-y-3 p-4">
                {filteredConversations.map(conv => (
                  <div key={conv.id} className="border border-border rounded-lg p-4 space-y-3 bg-muted/50">
                    {/* Type and Status */}
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium ${convTypeConfig[conv.conversationType].bg}`}
                      >
                        {convTypeConfig[conv.conversationType].label}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`text-xs font-medium border ${statusConfig[conv.status].color}`}
                      >
                        {statusConfig[conv.status].label}
                      </Badge>
                    </div>

                    {/* Sender and Recipient */}
                    <div className="text-xs space-y-1">
                      <div><span className="text-muted-foreground">Người gửi:</span> <span className="font-medium text-foreground">{conv.sender}</span></div>
                      <div><span className="text-muted-foreground">Người nhận:</span> <span className="font-medium text-foreground">{conv.recipient}</span></div>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-muted-foreground">
                      Cập nhật: {conv.lastUpdated}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-border">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleViewDetail(conv)}
                        className="gap-1 h-8 px-2 text-xs flex-1 hover:bg-background"
                        title="Xem chi tiết"
                      >
                        <Eye size={14} />
                        Chi tiết
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 h-8 px-2 text-xs hover:bg-background"
                        title="Tải xuống"
                      >
                        <Download size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1 h-8 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
                        title="Xóa"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Detail Modal */}
      {selectedConv && (
        <ConversationDetailModal
          conversation={selectedConv}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
