import { Plus, Search } from 'lucide-react';
import { ProductTable } from './ProductTable';
import { ProductForm } from './ProductForm';
import { ProductDelete } from './ProductDelete';
import { useProducts } from './hooks/useProducts';

export function Products() {
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
  } = useProducts();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Products</h1>
          <p className="mt-1 text-gray-500">Manage your chemical product inventory</p>
        </div>
        <div className="flex flex-col items-stretch w-full gap-4 sm:flex-row sm:items-center sm:w-auto">
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
                productNo: products.length > 0
                  ? Math.max(...products.map(p => p.productNo)) + 1
                  : 1,
                name: '', 
                desc: '',
                category: '', 
                price: '', 
                stock: '', 
                unit: '',
                shelfNo: '',
                remarks: ''
              });
              setIsFormOpen(true);
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-white transition-colors duration-200 bg-teal-600 rounded-lg hover:bg-teal-700 whitespace-nowrap"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Products</h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-4 py-2 text-white transition-colors duration-200 rounded-lg bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800"
          >
            Add Product
          </button>
        </div>
        <ProductTable
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ProductForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        editingProduct={editingProduct}
      />

      <ProductDelete
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