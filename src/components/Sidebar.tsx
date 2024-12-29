import React, { useState } from 'react';
import { Activity, PlusCircle, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

interface Props {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: Props) {
  const { signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const mainMenuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'entry', label: 'New Entry', icon: PlusCircle },
  ];

  const bottomMenuItems = [
    { id: 'user', label: 'Profile', icon: User },
  ];

  const renderMenuItem = (item: { id: string; label: string; icon: any }) => {
    const Icon = item.icon;
    return (
      <button
        key={item.id}
        onClick={() => {
          onTabChange(item.id);
          setIsOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
          activeTab === item.id
            ? 'bg-blue-50 text-blue-600'
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Icon className="w-5 h-5" />
        {item.label}
      </button>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200/50 z-40
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:w-64 w-[280px]
      `}>
        <div className="p-4 border-b border-gray-200/50 flex items-center gap-3">
          <Activity className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-medium text-gray-900">COPD Diary</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {mainMenuItems.map(renderMenuItem)}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200/50">
          <div className="space-y-1">
            {bottomMenuItems.map(renderMenuItem)}
            <button
              onClick={() => {
                signOut();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}