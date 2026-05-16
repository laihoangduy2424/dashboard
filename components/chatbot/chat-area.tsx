'use client'

import { Conversation } from '@/lib/mock-data'
import { useState, useRef, useEffect } from 'react'
import { Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ChatAreaProps {
  conversation: Conversation
}

export default function ChatArea({ conversation }: ChatAreaProps) {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation.messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setInputValue('')
    setIsLoading(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="bg-card border border-border rounded-lg flex flex-col h-full overflow-hidden">
      {/* Conversation Header */}
      <div className="px-6 py-5 border-b border-border flex-shrink-0">
        <h2 className="text-lg font-semibold text-foreground text-balance">{conversation.title}</h2>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-2 w-2 rounded-full bg-accent"></div>
          <p className="text-xs text-muted-foreground">Model: <span className="font-medium text-foreground">{conversation.model}</span></p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {conversation.messages.length === 0 ? (
          // Empty State
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-sm">
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <Send className="text-accent" size={28} />
              </div>
              <p className="text-base font-medium text-foreground mb-2">Bắt đầu cuộc hội thoại</p>
              <p className="text-sm text-muted-foreground leading-relaxed">Gửi một tin nhắn hoặc sử dụng một trong những mẫu được gợi ý ở trên để bắt đầu</p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            {conversation.messages.map((msg, index) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Dot */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mt-0.5 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {msg.role === 'user' ? 'Bạn' : 'AI'}
                </div>

                {/* Message Bubble */}
                <div className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-5 py-3 rounded-2xl max-w-md lg:max-w-lg ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-muted text-foreground rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>

                  {/* Message Metadata */}
                  <div className={`flex items-center gap-3 mt-2 text-xs text-muted-foreground ${
                    msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}>
                    <span>{formatTime(msg.timestamp)}</span>
                    {msg.tokens && (
                      <>
                        <span>•</span>
                        <span>{msg.tokens} tokens</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="px-6 py-5 border-t border-border flex-shrink-0 bg-card">
        <div className="flex gap-3 items-end">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập tin nhắn của bạn tại đây..."
            rows={3}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground resize-none text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="lg"
            className="rounded-xl flex-shrink-0 h-12 w-12 p-0 flex items-center justify-center"
            title={isLoading ? 'Đang gửi...' : 'Gửi tin nhắn (Shift+Enter)'}
          >
            {isLoading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </Button>
        </div>
        {inputValue.trim() && (
          <p className="text-xs text-muted-foreground mt-2">
            Nhấn <kbd className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">Enter</kbd> để gửi hoặc <kbd className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs font-medium">Shift+Enter</kbd> để xuống dòng
          </p>
        )}
      </div>
    </div>
  )
}
