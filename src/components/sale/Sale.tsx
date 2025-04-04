import { Plus, Search } from 'lucide-react';
import { SaleDelete } from './SaleDelete';
import { SaleForm } from './SaleForm';
import { SaleTable } from './SaleTable';
import { useSale } from './hooks/useSales';

export function Sale() {
  const {
    products,
    isFormOpen,
    isDeleteOpen,
    editingProduct,
    deletingProduct,
    formData,
    setFormData,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSubmit,
    handleCloseForm,
    setIsFormOpen,
    setIsDeleteOpen,
    setDeletingProduct,
    setEditingProduct
  } = useSale();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Sale</h1>
          <p className="mt-1 text-gray-500">Manage your chemical Sale inventory</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => {
              setEditingProduct(null);
              setFormData({ 
                voucherNo: products.length > 0
                  ? Math.max(...products.map(p => p.voucherNo)) + 1
                  : 1,
                voucherDate: '',
                customer: '',
                categoryNo: '',
                categoryName: '',
                itemNo: '',
                itemDescription: '',
                brand: '',
                batchNo: '',
                rate: 0,
                qty: 0,
                unit: '',
                amount: 0,
                narration: '',
                grossTotal: 0,
                discount: '',
                discountAmount: 0,
                additionalCharges: '',
                netTotal: 0,
                previousBalance: 0,
                netBalance: 0,
                formalName: '',
                personalName: '',
                contactNo: '',
                address: '',
                designation: '',
                department: '',
              });
              setIsFormOpen(true);
            }}
            className="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
          >
            Add Sale
          </button>
        </div>
      </div>

      <SaleTable
        products={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SaleForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingProduct={editingProduct}
      />

      <SaleDelete
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingProduct(null);
        }}
        onConfirm={confirmDelete}
        product={deletingProduct}
      />
    </div>
  );
} 