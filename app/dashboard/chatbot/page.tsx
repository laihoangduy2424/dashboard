'use client'

import { useState } from 'react'
import { mockChatbotModels, mockDashboardConversations } from '@/lib/mock-data'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ConfigManagement from '@/components/chatbot/config-management'
import ConversationHistory from '@/components/chatbot/conversation-history'

export default function ChatbotPage() {
  const [activeTab, setActiveTab] = useState('config')

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Page Header */}
      <div className="px-6 py-6 border-b border-border bg-card shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">Quản lý Chatbot</h1>
        <p className="text-sm text-muted-foreground mt-1">Cấu hình mô hình AI và xem lịch sử hội thoại</p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col overflow-hidden"
        >
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-background px-6 py-0 h-auto gap-0">
            <TabsTrigger 
              value="config"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-4 font-medium text-sm"
            >
              Quản lý cấu hình
            </TabsTrigger>
            <TabsTrigger 
              value="history"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-4 font-medium text-sm"
            >
              Lịch sử hội thoại
            </TabsTrigger>
          </TabsList>

          {/* Tab Contents */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-6 py-6">
              <TabsContent value="config" className="m-0">
                <ConfigManagement models={mockChatbotModels} />
              </TabsContent>

              <TabsContent value="history" className="m-0">
                <ConversationHistory conversations={mockDashboardConversations} />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
