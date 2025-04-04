import { useState } from 'react';
import { Supplier } from '../../../types';

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<Supplier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    remarks: '',
  });

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name,
      email: supplier.email,
      phone: supplier.phone,
      company: supplier.company,
      remarks: supplier.remarks,
    });
    setIsFormOpen(true);
  };

  const handleDelete = (supplier: Supplier) => {
    setDeletingSupplier(supplier);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deletingSupplier) {
      setSuppliers(suppliers.filter(s => s.id !== deletingSupplier.id));
      setIsDeleteOpen(false);
      setDeletingSupplier(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSupplier) {
      setSuppliers(suppliers.map(s => 
        s.id === editingSupplier.id 
          ? {
              ...s,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              remarks: formData.remarks,
            }
          : s
      ));
    } else {
      const newSupplier: Supplier = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        remarks: formData.remarks,
        status: 'active',
        joinDate: new Date().toISOString(),
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setFormData({ name: '', email: '', phone: '', company: '', remarks: '' });
    setEditingSupplier(null);
    setIsFormOpen(false);
  };

  return {
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
    setEditingSupplier,
  };
}