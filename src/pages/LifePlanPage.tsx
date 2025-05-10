
import React from 'react';
import LifePlanDisplay from '@/components/plan/LifePlanDisplay';
import ChatInterface from '@/components/chatbot/ChatInterface';

const LifePlanPage = () => {
  return (
    <div className="py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Life Plan - Takes up more space */}
          <div className="lg:col-span-2">
            <LifePlanDisplay />
          </div>
          
          {/* Chat Interface */}
          <div className="lg:col-span-1 h-[calc(100vh-180px)]">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifePlanPage;
