import { Menu } from 'lucide-react';
import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'products' | 'suppliers' | 'Purchase' | 'Sale';
  setActiveTab: (tab: 'products' | 'suppliers' | 'Purchase' | 'Sale') => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

export function Layout({ 
  children, 
  activeTab, 
  setActiveTab, 
  isSidebarOpen, 
  setIsSidebarOpen 
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="fixed top-0 left-0 z-50 m-4 lg:hidden">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="p-4 pt-16 lg:ml-64 sm:p-6 lg:p-8 lg:pt-8">
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </div>
    </div>
  );
} 