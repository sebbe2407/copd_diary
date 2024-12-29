import React from 'react';
import { Activity } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-3 flex items-center">
        <Activity className="w-6 h-6 text-blue-600 mr-3" />
        <h1 className="text-xl font-medium text-gray-900">COPD Health Diary</h1>
      </div>
    </header>
  );
}