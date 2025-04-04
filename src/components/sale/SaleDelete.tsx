import { X, AlertTriangle } from 'lucide-react';
import { Sale } from '../../types';

interface SaleDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Sale | null;
}

export function SaleDelete({ isOpen, onClose, onConfirm, product }: SaleDeleteProps) {
  if (!product) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Delete Confirmation Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900">Delete Sale</h2>
            <button
              onClick={onClose}
              className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  Are you sure you want to delete this sale?
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">{product.itemDescription}</span> will be permanently removed.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 py-4 space-y-3 border-t border-gray-200 sm:px-6">
            <button
              onClick={onConfirm}
              className="w-full px-6 py-3 font-medium text-white transition-colors duration-200 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Yes, Delete Sale
            </button>
            <button
              onClick={onClose}
              className="w-full px-6 py-3 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 