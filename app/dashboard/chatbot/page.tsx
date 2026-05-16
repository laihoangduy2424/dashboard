'use client'

import { useState } from 'react'
import { mockChatbotModels, mockSamplePrompts, mockConversations, mockTokenInfo } from '@/lib/mock-data'
import ModelSelector from '@/components/chatbot/model-selector'
import SamplePrompts from '@/components/chatbot/sample-prompts'
import ChatHistory from '@/components/chatbot/chat-history'
import ChatArea from '@/components/chatbot/chat-area'
import TokenManagement from '@/components/chatbot/token-management'

export default function ChatbotPage() {
  const [selectedModel, setSelectedModel] = useState(mockChatbotModels[0].id)
  const [currentConversationId, setCurrentConversationId] = useState(mockConversations[0].id)
  const [conversations, setConversations] = useState(mockConversations)
  const [mobileTab, setMobileTab] = useState<'history' | 'chat' | 'tokens'>('chat')

  const currentConversation = conversations.find(c => c.id === currentConversationId)

  const handleDeleteConversation = (id: string) => {
    const newConversations = conversations.filter(c => c.id !== id)
    setConversations(newConversations)
    if (currentConversationId === id && newConversations.length > 0) {
      setCurrentConversationId(newConversations[0].id)
    }
  }

  const handleNewConversation = () => {
    const newId = `conv-${Date.now()}`
    const newConversation = {
      id: newId,
      title: 'New Conversation',
      model: selectedModel,
      createdDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      messages: [],
      totalTokens: 0,
    }
    setConversations([newConversation, ...conversations])
    setCurrentConversationId(newId)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Mobile Tabs Navigation */}
      <div className="lg:hidden border-b border-border bg-card sticky top-0 z-20 shadow-sm">
        <div className="flex">
          {[
            { id: 'history' as const, label: 'Lịch sử' },
            { id: 'chat' as const, label: 'Chat' },
            { id: 'tokens' as const, label: 'Token' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setMobileTab(tab.id)}
              className={`flex-1 px-4 py-3 text-center text-sm font-medium border-b-2 transition-all ${
                mobileTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-5 overflow-hidden p-4 lg:p-6">
        {/* Chat History Sidebar - Desktop: Left Column */}
        <div className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0">
          <ChatHistory
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={setCurrentConversationId}
            onDeleteConversation={handleDeleteConversation}
            onNewConversation={handleNewConversation}
          />
        </div>

        {/* Mobile Chat History Tab */}
        {mobileTab === 'history' && (
          <div className="lg:hidden flex-1 min-w-0 overflow-auto">
            <ChatHistory
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelectConversation={(id) => {
                setCurrentConversationId(id)
                setMobileTab('chat')
              }}
              onDeleteConversation={handleDeleteConversation}
              onNewConversation={() => {
                handleNewConversation()
                setMobileTab('chat')
              }}
            />
          </div>
        )}

        {/* Chat Area - Desktop: Middle Column */}
        <div className="hidden lg:flex lg:flex-col lg:flex-1 min-w-0 gap-4">
          {currentConversation && (
            <>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <ModelSelector
                  models={mockChatbotModels}
                  selectedModel={selectedModel}
                  onModelChange={setSelectedModel}
                />
                <SamplePrompts prompts={mockSamplePrompts} />
              </div>
              <ChatArea conversation={currentConversation} />
            </>
          )}
        </div>

        {/* Mobile Chat Tab */}
        {mobileTab === 'chat' && currentConversation && (
          <div className="lg:hidden flex-1 flex flex-col min-w-0 overflow-auto gap-4">
            <div>
              <ModelSelector
                models={mockChatbotModels}
                selectedModel={selectedModel}
                onModelChange={setSelectedModel}
              />
            </div>
            <div>
              <SamplePrompts prompts={mockSamplePrompts} />
            </div>
            <ChatArea conversation={currentConversation} />
          </div>
        )}

        {/* Token Management - Desktop: Right Column */}
        <div className="hidden lg:flex lg:flex-col lg:w-72 flex-shrink-0">
          <TokenManagement tokenInfo={mockTokenInfo} />
        </div>

        {/* Mobile Tokens Tab */}
        {mobileTab === 'tokens' && (
          <div className="lg:hidden flex-1 min-w-0 overflow-auto">
            <TokenManagement tokenInfo={mockTokenInfo} />
          </div>
        )}
      </div>
    </div>
  )
}
