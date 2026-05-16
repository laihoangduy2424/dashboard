'use client'

import { DashboardConversation } from '@/lib/mock-data'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ConversationDetailModalProps {
  conversation: DashboardConversation
  isOpen: boolean
  onClose: () => void
}

export default function ConversationDetailModal({
  conversation,
  isOpen,
  onClose,
}: ConversationDetailModalProps) {
  // Mock messages for demo
  const messages = [
    {
      id: '1',
      role: 'user',
      sender: conversation.sender,
      content: 'Xin chào, phòng của bạn còn trống không?',
      timestamp: '14:30',
    },
    {
      id: '2',
      role: 'assistant',
      sender: conversation.recipient,
      content: 'Xin chào! Vâng, phòng vẫn còn trống. Bạn muốn xem chi tiết không?',
      timestamp: '14:31',
    },
    {
      id: '3',
      role: 'user',
      sender: conversation.sender,
      content: 'Giá thuê bao nhiêu một tháng?',
      timestamp: '14:32',
    },
    {
      id: '4',
      role: 'assistant',
      sender: conversation.recipient,
      content: 'Giá thuê là 3 triệu đồng/tháng. Có bao gồm các tiện ích cơ bản như điện, nước, Internet.',
      timestamp: '14:33',
    },
  ]

  const statusConfig = {
    active: { label: 'Hoạt động', color: 'bg-green-500' },
    resolved: { label: 'Hoàn thành', color: 'bg-blue-500' },
    pending_response: { label: 'Chờ phản hồi', color: 'bg-yellow-500' },
  }

  const convTypeConfig = {
    landlord_to_tenant: 'Chủ nhà → Người thuê',
    user_to_chatbot: 'Người dùng → Chatbot',
    tenant_to_tenant: 'Người thuê → Người thuê',
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Chi tiết cuộc hội thoại</DialogTitle>
        </DialogHeader>

        {/* Conversation Header */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Loại hội thoại</p>
            <p className="text-sm text-foreground">{convTypeConfig[conversation.conversationType]}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Trạng thái</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${statusConfig[conversation.status].color}`}></div>
              <span className="text-sm text-foreground">{statusConfig[conversation.status].label}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Người gửi</p>
            <p className="text-sm font-medium text-foreground">{conversation.sender}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground mb-1">Người nhận</p>
            <p className="text-sm font-medium text-foreground">{conversation.recipient}</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs font-medium text-muted-foreground mb-1">Cập nhật lần cuối</p>
            <p className="text-sm text-foreground">{conversation.lastUpdated}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 min-h-[300px] max-h-[400px]">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {msg.role === 'user' ? 'B' : 'A'}
              </div>

              <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <p className="text-xs font-medium text-muted-foreground mb-1">{msg.sender}</p>
                <div
                  className={`px-4 py-3 rounded-2xl max-w-xs ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                <p className={`text-xs text-muted-foreground mt-1 ${msg.role === 'user' ? 'mr-2' : 'ml-2'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
          <Button variant="outline" className="text-accent hover:text-accent">
            Tải xuống
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
