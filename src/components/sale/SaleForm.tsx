import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Sale } from '../../types';

interface SaleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  formData: Sale;
  setFormData: React.Dispatch<React.SetStateAction<Sale>>;
  editingProduct: Sale | null;
}

export function SaleForm({ isOpen, onClose, onSubmit, formData, setFormData, editingProduct }: SaleFormProps) {
  const customers = [
    'Customer 1',
    'Customer 2',
    'Customer 3',
    // Add more customers as needed
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

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
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

  // Function to calculate amount based on rate and quantity
  const handleRateOrQtyChange = (field: 'rate' | 'qty', value: number) => {
    const newFormData = { ...formData };
    if (field === 'rate') {
      newFormData.rate = value;
    } else {
      newFormData.qty = value;
    }
    newFormData.amount = newFormData.rate * newFormData.qty;
    
    // Auto-calculate gross total based on amount
    newFormData.grossTotal = newFormData.amount;
    
    // Auto-calculate net total and net balance
    calculateNetTotalAndBalance(newFormData);
    
    setFormData(newFormData);
  };

  // Function to calculate net total and net balance
  const calculateNetTotalAndBalance = (data: Sale) => {
    const grossTotal = data.grossTotal || 0;
    const discountAmount = data.discountAmount || 0;
    const previousBalance = data.previousBalance || 0;
    
    // Calculate net total (gross total - discount amount)
    const netTotal = grossTotal - discountAmount;
    
    // Calculate net balance (net total + previous balance)
    const netBalance = netTotal + previousBalance;
    
    // Update the form data
    setFormData(prev => ({
      ...prev,
      netTotal,
      netBalance
    }));
  };

  // Function to handle discount amount change
  const handleDiscountAmountChange = (value: number) => {
    setFormData(prev => {
      const newData = { ...prev, discountAmount: value };
      calculateNetTotalAndBalance(newData);
      return newData;
    });
  };

  // Function to handle previous balance change
  const handlePreviousBalanceChange = (value: number) => {
    setFormData(prev => {
      const newData = { ...prev, previousBalance: value };
      calculateNetTotalAndBalance(newData);
      return newData;
    });
  };

  // Function to handle gross total change
  const handleGrossTotalChange = (value: number) => {
    setFormData(prev => {
      const newData = { ...prev, grossTotal: value };
      calculateNetTotalAndBalance(newData);
      return newData;
    });
  };

  // Function to calculate net total based on gross total, discount amount, and additional charges
  const calculateNetTotal = () => {
    const grossTotal = formData.grossTotal || 0;
    const discountAmount = formData.discountAmount || 0;
    const netTotal = grossTotal - discountAmount;
    setFormData(prev => ({ ...prev, netTotal }));
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
              {editingProduct ? 'Edit Sale' : 'Add New Sale'}
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
                {/* Basic Information */}
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
                  <select
                    value={formData.status || 'pending'}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    {statusOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Customer A/c</label>
                  <select
                    value={formData.customer}
                    onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  >
                    <option value="">Select Customer</option>
                    {customers.map((customer) => (
                      <option key={customer} value={customer}>{customer}</option>
                    ))}
                  </select>
                </div>

                <div className="lg:col-span-4">
                  <hr className="my-4 border-gray-200" />
                </div>

                {/* Category Information */}
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

                {/* Item Details */}
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
                    onChange={(e) => handleRateOrQtyChange('rate', Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Qty</label>
                  <input
                    type="number"
                    value={formData.qty}
                    onChange={(e) => handleRateOrQtyChange('qty', Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Pricing Information */}
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
                
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Gross Total</label>
                  <input
                    type="number"
                    value={formData.grossTotal}
                    onChange={(e) => handleGrossTotalChange(Number(e.target.value))}
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

                {/* Discount and Charges */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Discount Amount</label>
                  <input
                    type="number"
                    value={formData.discountAmount}
                    onChange={(e) => handleDiscountAmountChange(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
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
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Total</label>
                  <input
                    type="number"
                    value={formData.netTotal}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    disabled
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Previous Balance</label>
                  <input
                    type="number"
                    value={formData.previousBalance}
                    onChange={(e) => handlePreviousBalanceChange(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Balance Information */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Net Balance</label>
                  <input
                    type="number"
                    value={formData.netBalance}
                    onChange={(e) => setFormData({ ...formData, netBalance: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Customer Details */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Formal Name</label>
                  <input
                    type="text"
                    value={formData.formalName}
                    onChange={(e) => setFormData({ ...formData, formalName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Personal Name</label>
                  <input
                    type="text"
                    value={formData.personalName}
                    onChange={(e) => setFormData({ ...formData, personalName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Contact No</label>
                  <input
                    type="text"
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Additional Customer Details */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Designation</label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 font-medium text-gray-700 transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 font-medium text-white transition-colors duration-200 bg-teal-600 rounded-lg hover:bg-teal-700"
                >
                  {editingProduct ? 'Update Sale' : 'Add Sale'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
} 