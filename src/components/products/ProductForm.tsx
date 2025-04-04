import { X } from 'lucide-react';
import { Product } from '../../types';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: {
    productNo: number;
    name: string;
    desc: string;
    category: string;
    price: string;
    stock: string;
    unit: string;
    shelfNo: string;
    remarks: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    productNo: number;
    name: string;
    desc: string;
    category: string;
    price: string;
    stock: string;
    unit: string;
    shelfNo: string;
    remarks: string;
  }>>;
  editingProduct: Product | null;
}

export function ProductForm({ isOpen, onClose, onSubmit, formData, setFormData, editingProduct }: ProductFormProps) {
  const units = [
    'Kilogram',
    'Gram',
    'Milligram',
    'Liter',
    'Milliliter',
    'Tablet',
    'Capsule',
    'Box',
    'Bottle',
    'Packet',
  ];

  const categories = [
    { id: 1, name: 'Chemicals' },
    { id: 2, name: 'Equipment' },
    { id: 3, name: 'General Items' },
    { id: 4, name: 'Glasswares (Godown)' },
    { id: 5, name: 'Non Inventory Items' },
    { id: 6, name: 'Packing Materials' },
    { id: 7, name: 'Plasticwares (Godown)' },
  ];

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
              {editingProduct ? 'Edit Product' : 'Add New Product'}
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Product No</label>
                  <input
                    type="number"
                    value={formData.productNo}
                    disabled
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Unit</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Unit</option>
                    {units.map((unit) => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Shelf No</label>
                  <input
                    type="text"
                    value={formData.shelfNo}
                    onChange={(e) => setFormData({ ...formData, shelfNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="lg:col-span-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={formData.desc}
                    onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
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
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}