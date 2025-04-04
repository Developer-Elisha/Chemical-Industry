import { useState } from 'react';
import { Product } from '../../../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    productNo: 1,
    name: '',
    desc: '',
    category: '',
    price: '',
    stock: '',
    unit: '',
    shelfNo: '',
    remarks: '',
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      productNo: product.productNo,
      name: product.name,
      desc: product.desc,
      category: product.category,
      price: product.price.toString(),
      stock: product.stock.toString(),
      unit: product.unit,
      shelfNo: product.shelfNo,
      remarks: product.remarks,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (product: Product) => {
    setDeletingProduct(product);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deletingProduct) {
      setProducts(products.filter(p => p.id !== deletingProduct.id));
      setIsDeleteOpen(false);
      setDeletingProduct(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? {
              ...p,
              productNo: formData.productNo,
              name: formData.name,
              category: formData.category,
              price: Number(formData.price),
              stock: Number(formData.stock),
              unit: formData.unit,
              shelfNo: formData.shelfNo,
              remarks: formData.remarks,
            }
          : p
      ));
    } else {
      const nextProductNo = products.length > 0 
        ? Math.max(...products.map(p => p.productNo)) + 1 
        : 1;
        
      const newProduct: Product = {
        id: crypto.randomUUID(),
        productNo: nextProductNo,
        name: formData.name,
        desc: formData.desc,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        unit: formData.unit,
        shelfNo: formData.shelfNo,
        remarks: formData.remarks,
      };
      setProducts([...products, newProduct]);
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    const nextProductNo = products.length > 0 
      ? Math.max(...products.map(p => p.productNo)) + 1 
      : 1;
      
    setFormData({ 
      productNo: nextProductNo,
      name: '', 
      desc: '', 
      category: '', 
      price: '', 
      stock: '', 
      unit: '', 
      shelfNo: '', 
      remarks: '', 
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