import { useState } from 'react';
import { Sale } from '../../../types';

export function useSale() {
  const [products, setProducts] = useState<Sale[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Sale | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Sale | null>(null);
  const [formData, setFormData] = useState<Sale>({
    status: 'pending',
    voucherNo: 1,
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

  const handleEdit = (product: Sale) => {
    setEditingProduct(product);
    setFormData(product);
    setIsFormOpen(true);
  };

  const handleDelete = (product: Sale) => {
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
          ? { ...formData }
          : p
      ));
    } else {
      const nextVoucherNo = products.length > 0 
        ? Math.max(...products.map(p => p.voucherNo)) + 1 
        : 1;

      const newProduct: Sale = {
        ...formData,
        voucherNo: nextVoucherNo,
      };
      setProducts([...products, newProduct]);
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setFormData({
      status: 'pending',
      voucherNo: 1,
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