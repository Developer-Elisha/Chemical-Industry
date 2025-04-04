import React from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { Supplier } from '../../types';

interface SupplierDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  supplier: Supplier | null;
}

export function SupplierDelete({ isOpen, onClose, onConfirm, supplier }: SupplierDeleteProps) {
  if (!supplier) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Delete Confirmation Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Delete Supplier</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 p-4 sm:p-6">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Are you sure you want to delete this supplier?
                </h3>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">{supplier.name}</span> will be permanently removed.
                  This action cannot be undone.
                </p>
              </div>
            </div>
          </div>
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 space-y-3">
            <button
              onClick={onConfirm}
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Yes, Delete Supplier
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}