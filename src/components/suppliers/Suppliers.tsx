import { Plus, Search } from 'lucide-react';
import { SupplierTable } from './SupplierTable';
import { SupplierForm } from './SupplierForm';
import { SupplierDelete } from './SupplierDelete';
import { useSuppliers } from './hooks/useSuppliers';

export function Suppliers() {
  const {
    suppliers,
    isFormOpen,
    isDeleteOpen,
    editingSupplier,
    deletingSupplier,
    formData,
    setFormData,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleSubmit,
    handleCloseForm,
    setIsFormOpen,
    setIsDeleteOpen,
    setDeletingSupplier,
    setEditingSupplier
  } = useSuppliers();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="mt-1 text-gray-500">Manage your chemical suppliers</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            />
          </div>
          <button
            onClick={() => {
              setEditingSupplier(null);
              setFormData({ 
                name: '', 
                email: '', 
                phone: '', 
                company: '',
                remarks: ''
              });
              setIsFormOpen(true);
            }}
            className="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
          >
            Add Supplier
          </button>
        </div>
      </div>

      <SupplierTable
        suppliers={suppliers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <SupplierForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingSupplier={editingSupplier}
      />

      <SupplierDelete
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingSupplier(null);
        }}
        onConfirm={confirmDelete}
        supplier={deletingSupplier}
      />
    </div>
  );
}