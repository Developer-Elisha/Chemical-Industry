import { useState } from 'react';
import { Purchase } from '../../../types';

export function usePurchase() {
  const [products, setProducts] = useState<Purchase[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Purchase | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Purchase | null>(null);
  const [formData, setFormData] = useState<Purchase>({
    voucherNo: 1,
    voucherDate: '',
    supplier: '',
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
    additionalCharges: '',
    courierCharges: 0,
    previousBalance: 0,
    netBalance: 0,
    netTotal: 0, // Add netTotal here
  });

  const handleEdit = (product: Purchase) => {
    setEditingProduct(product);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Purchase) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter(p => p.voucherNo !== deletingProduct.voucherNo));
      setIsDeleteOpen(false);
      setDeletingProduct(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => 
        p.voucherNo === editingProduct.voucherNo 
          ? { ...formData } // Update the product with the new formData
          : p
      ));
    } else {
      const nextVoucherNo = products.length > 0 
        ? Math.max(...products.map(p => p.voucherNo)) + 1 
        : 1;

      const newProduct: Purchase = {
        ...formData,
        voucherNo: nextVoucherNo, // Assign the new voucher number
      };
      setProducts([...products, newProduct]);
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setFormData({
      voucherNo: 1,
      voucherDate: '',
      supplier: '',
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
      additionalCharges: '',
      courierCharges: 0,
      previousBalance: 0,
      netBalance: 0,
      netTotal: 0, // Reset netTotal here
    });
    setEditingProduct(null);
    setIsFormOpen(false);
  };

  return {
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
    setEditingProduct,
  };
}