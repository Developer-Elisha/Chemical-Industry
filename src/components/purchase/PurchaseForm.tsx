import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Purchase } from '../../types';

interface PurchaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: Purchase;
  setFormData: React.Dispatch<React.SetStateAction<Purchase>>;
  editingProduct: Purchase | null;
}

export function PurchaseForm({ isOpen, onClose, onSubmit, formData, setFormData, editingProduct }: PurchaseFormProps) {
  const suppliers = [
    'Supplier 1',
    'Supplier 2',
    'Supplier 3',
    // Add more suppliers as needed
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

  const discountOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const additionalChargesOptions = [
    { value: 'Courier Charges Not In Use', label: 'Courier Charges Not In Use' },
  ];

  // Effect to set the current date when the form is opened
  useEffect(() => {
    if (isOpen && !editingProduct) {
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString().split('T')[0]; // Format to yyyy-mm-dd
      setFormData((prevData) => ({ ...prevData, voucherDate: formattedDate }));
    }
  }, [isOpen, editingProduct, setFormData]);

  // Function to handle category number change
  const handleCategoryNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryNo = e.target.value;
    const category = categories.find(cat => cat.id.toString() === categoryNo);
    setFormData(prev => ({
      ...prev,
      categoryNo: categoryNo,
      categoryName: category ? category.name : ''
    }));
  };

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
              {editingProduct ? 'Edit Purchase' : 'Add New Purchase'}
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Voucher No</label>
                  <input
                    type="number"
                    value={formData.voucherNo}
                    onChange={(e) => setFormData({ ...formData, voucherNo: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Voucher Date</label>
                  <input
                    type="date"
                    value={formData.voucherDate}
                    onChange={(e) => setFormData({ ...formData, voucherDate: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Supplier A/c</label>
                  <select
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier} value={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-4">
                  <hr className="my-4 border-gray-200" />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category No</label>
                  <input
                    type="number"
                    value={formData.categoryNo}
                    onChange={handleCategoryNoChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
                  <input
                    type="text"
                    value={formData.categoryName}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Item No</label>
                  <input
                    type="text"
                    value={formData.itemNo}
                    onChange={(e) => setFormData({ ...formData, itemNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Item Description</label>
                  <input
                    type="text"
                    value={formData.itemDescription}
                    onChange={(e) => setFormData({ ...formData, itemDescription: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Batch No</label>
                  <input
                    type="text"
                    value={formData.batchNo}
                    onChange={(e) => setFormData({ ...formData, batchNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Rate</label>
                  <input
                    type="number"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Qty</label>
                  <input
                    type="number"
                    value={formData.qty}
                    onChange={(e) => setFormData({ ...formData, qty: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Unit</label>
                  <input
                    type="text"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>

                <div className="lg:col-span-4">
                  <hr className="my-4 border-gray-200" />
                </div>

                <div className="lg:col-span-4">
                  <label className="block mb-2 text-sm font-medium text-gray-700">Narration</label>
                  <textarea
                    value={formData.narration}
                    onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gross Total</label>
                  <input
                    type="number"
                    value={formData.grossTotal}
                    onChange={(e) => setFormData({ ...formData, grossTotal: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Discount</label>
                  <select
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Discount</option>
                    {discountOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Additional Charges</label>
                  <select
                    value={formData.additionalCharges}
                    onChange={(e) => setFormData({ ...formData, additionalCharges: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Additional Charges</option>
                    {additionalChargesOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Courier Charges</label>
                  <input
                    type="number"
                    value={formData.courierCharges}
                    onChange={(e) => setFormData({ ...formData, courierCharges: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Previous Balance</label>
                  <input
                    type="number"
                    value={formData.previousBalance}
                    onChange={(e) => setFormData({ ...formData, previousBalance: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Balance</label>
                  <input
                    type="number"
                    value={formData.netBalance}
                    onChange={(e) => setFormData({ ...formData, netBalance: Number(e.target.value) })}
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
              {editingProduct ? 'Update Purchase' : 'Add Purchase'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}