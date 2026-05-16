'use client'

import { Conversation } from '@/lib/mock-data'
import { Plus, Trash2, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatHistoryProps {
  conversations: Conversation[]
  currentConversationId: string
  onSelectConversation: (id: string) => void
  onDeleteConversation: (id: string) => void
  onNewConversation: () => void
}

export default function ChatHistory({
  conversations,
  currentConversationId,
  onSelectConversation,
  onDeleteConversation,
  onNewConversation,
}: ChatHistoryProps) {
  return (
    <div className="bg-card border border-border rounded-lg p-5 flex flex-col h-full">
      <div className="mb-5 pb-5 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <MessageCircle size={18} className="text-accent" />
          <h2 className="text-sm font-semibold text-foreground">Lịch sử hội thoại</h2>
        </div>
        <Button
          onClick={onNewConversation}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus size={18} />
          <span className="font-medium">Cuộc hội thoại mới</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {conversations.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <p className="text-xs text-muted-foreground">Chưa có cuộc hội thoại</p>
          </div>
        ) : (
          conversations.map(conv => (
            <button
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`w-full group p-4 rounded-lg transition-all duration-200 text-left border ${
                currentConversationId === conv.id
                  ? 'bg-primary/8 border-primary/30 shadow-sm'
                  : 'bg-background hover:bg-muted/50 border-transparent hover:border-border'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate transition-colors ${
                    currentConversationId === conv.id
                      ? 'text-primary'
                      : 'text-foreground group-hover:text-foreground'
                  }`}>
                    {conv.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">{conv.createdDate}</span>
                    <span className="text-xs bg-secondary text-accent px-2 py-0.5 rounded-md">
                      {conv.totalTokens} tokens
                    </span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteConversation(conv.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-destructive/10 hover:text-destructive rounded-md flex-shrink-0"
                  title="Xóa"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
