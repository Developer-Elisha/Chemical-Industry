import { Package, Users, Ruler, ChevronRight, X, LineChart, ShoppingBasket, DollarSign, ChevronDown, Settings, FileText, BarChart, Beaker, BeakerIcon, TestTube } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  activeTab: 'products' | 'suppliers' | 'Purchase' | 'Sale';
  setActiveTab: (tab: 'products' | 'suppliers' | 'Purchase' | 'Sale') => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ activeTab, setActiveTab, isOpen, onClose }: SidebarProps) {
  const [setupOpen, setSetupOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 text-white transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        <div className="flex items-center justify-between px-6 py-6 border-b border-teal-500/30">
          <div className="flex items-center gap-2">
            <Beaker className="w-8 h-8" />
            <span className="text-2xl font-bold">CHEMICAL</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 transition-colors duration-200 rounded-lg lg:hidden hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {/* Setup Dropdown */}
          <div>
            <button
              onClick={() => setSetupOpen(!setupOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                setupOpen ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-5 h-5" />
                Setup
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${setupOpen ? 'rotate-180' : ''}`} />
            </button>
            {setupOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'products' ? 'bg-white text-teal-600' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5" />
                    Item Information
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('suppliers');
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'suppliers' ? 'bg-white text-teal-600' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5" />
                    Suppliers
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Transaction Dropdown */}
          <div>
            <button
              onClick={() => setTransactionOpen(!transactionOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                transactionOpen ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5" />
                Transaction
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${transactionOpen ? 'rotate-180' : ''}`} />
            </button>
            {transactionOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <button
                  onClick={() => {
                    setActiveTab('Purchase');
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'Purchase' ? 'bg-white text-teal-600' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBasket className="w-5 h-5" />
                    Purchase Voucher
                  </div>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('Sale');
                    onClose();
                  }}
                  className={`flex items-center justify-between w-full px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    activeTab === 'Sale' ? 'bg-white text-teal-600' : 'text-white/90 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5" />
                    Sale Voucher
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Reports Dropdown */}
          <div>
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                reportsOpen ? 'bg-white/20 text-white' : 'text-white/90 hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart className="w-5 h-5" />
                Reports
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${reportsOpen ? 'rotate-180' : ''}`} />
            </button>
            {reportsOpen && (
              <div className="pl-4 mt-1 space-y-1">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-white/90 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <BarChart className="w-5 h-5" />
                    Sales Report
                  </div>
                </button>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-white/90 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <BarChart className="w-5 h-5" />
                    Purchase Report
                  </div>
                </button>
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg text-white/90 hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <BarChart className="w-5 h-5" />
                    Inventory Report
                  </div>
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}