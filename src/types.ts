// types.ts
export interface Product {
  desc: string;
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
  shelfNo: string;
  remarks: string;
  productNo: number;
}

export interface Purchase {
  voucherNo: number;
  voucherDate: string;
  supplier: string;
  categoryNo: string;
  categoryName: string;
  itemNo: string;
  itemDescription: string;
  brand: string;
  batchNo: string;
  rate: number;
  qty: number;
  unit: string;
  amount: number;
  narration: string;
  grossTotal: number;
  discount: string;
  additionalCharges: string;
  courierCharges: number;
  netTotal: number;
  previousBalance: number;
  netBalance: number;
}

export interface Sale {
  status: string;
  voucherNo: number;
  voucherDate: string;
  customer: string;
  categoryNo: string;
  categoryName: string;
  itemNo: string;
  itemDescription: string;
  brand: string;
  batchNo: string;
  rate: number;
  qty: number;
  unit: string;
  amount: number;
  grossTotal: number;
  discount: string;
  discountAmount: number;
  additionalCharges: string;
  netTotal: number;
  previousBalance: number;
  netBalance: number;
  formalName: string;
  personalName: string;
  contactNo: string;
  address: string;
  designation: string;
  department: string;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive';
  joinDate: string;
  remarks: string;
}