import { Pencil, Trash2 } from 'lucide-react';
import { Supplier } from '../../types';

interface SupplierTableProps {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

export function SupplierTable({ suppliers, onEdit, onDelete }: SupplierTableProps) {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Supplier No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Supplier Name</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Contact Person</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Contact No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Email</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Status</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {suppliers.map((supplier) => (
              <tr key={supplier.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{supplier.supplierNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{supplier.supplierName}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{supplier.contactPerson}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{supplier.contactNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{supplier.email}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    supplier.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {supplier.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(supplier)}
                      className="p-1 text-teal-600 transition-colors duration-200 rounded-lg hover:bg-teal-50"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(supplier.id)}
                      className="p-1 text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {suppliers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-sm text-center text-gray-500 sm:px-6">
                  No suppliers added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}