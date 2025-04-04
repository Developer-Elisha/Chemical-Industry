import React from 'react';
import { X } from 'lucide-react';
import { Supplier } from '../../types';

interface SupplierFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    company: string;
    remarks: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    company: string;
    remarks: string;
  }>>;
  editingSupplier: Supplier | null;
}

export function SupplierForm({ isOpen, onClose, onSubmit, formData, setFormData, editingSupplier }: SupplierFormProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50"
          onClick={onClose}
        />
      )}
      
      {/* Form Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-[70%] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 sm:px-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto sm:p-6">
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Supplier Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Remarks</label>
                  <textarea
                    value={formData.remarks}
                    onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="px-4 py-4 border-t border-gray-200 sm:px-6">
            <button
              onClick={onSubmit}
              className="w-full px-6 py-3 font-medium text-white transition-colors duration-200 bg-teal-600 rounded-lg hover:bg-teal-700"
            >
              {editingSupplier ? 'Update Supplier' : 'Add Supplier'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}