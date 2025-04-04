import { Pencil, Trash2 } from 'lucide-react';
import { Product } from '../../types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Item No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Item Description</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Category</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Brand</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Unit</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Status</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.itemNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.itemDescription}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.categoryNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.brand}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.unit}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1 text-teal-600 transition-colors duration-200 rounded-lg hover:bg-teal-50"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="p-1 text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-sm text-center text-gray-500 sm:px-6">
                  No products added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}