import { Pencil, Trash2 } from 'lucide-react';
import { Purchase } from '../../types';
import { formatDate } from './util/dateFormatter'; // Import the date formatter

interface PurchaseTableProps {
  products: Purchase[]; 
  onEdit: (product: Purchase) => void;
  onDelete: (product: Purchase) => void; 
}

export function PurchaseTable({ products, onEdit, onDelete }: PurchaseTableProps) {
  return (
    <div className="overflow-hidden border-gray-100 shadow-sm bg-whiteborder rounded-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Voucher No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Voucher Date</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Supplier</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Category No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Category Name</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Item No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Item Description</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Brand</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Batch No</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Rate</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Qty</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Unit</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Amount</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Narration</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Gross Total</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Discount</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Additional Charges</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Courier Charges</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Previous Balance</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-left text-gray-600 uppercase sm:px-6">Net Balance</th>
              <th className="px-4 py-4 text-xs font-semibold tracking-wider text-right text-gray-600 uppercase sm:px-6">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.voucherNo} className="transition-colors duration-150 hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium text-gray-900 sm:px-6 whitespace-nowrap">{product.voucherNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{formatDate(product.voucherDate)}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.supplier}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.categoryNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.categoryName}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.itemNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.itemDescription}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.brand}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.batchNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">PKR.{product.rate}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.qty}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.unit}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">PKR.{product.amount}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.narration}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.grossTotal}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.discount}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.additionalCharges}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.courierCharges}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.previousBalance}</td>
                <td className="px-4 py-4 text-sm text-gray-500 sm:px-6 whitespace-nowrap">{product.netBalance}</td>
                <td className="px-4 py-4 text-sm font-medium text-right sm:px-6 whitespace-nowrap">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-1 text-teal-600 transition-colors duration-200 rounded-lg hover:bg-teal-50"
                    >
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product)}
                      className="p-1 text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={20} className="px-4 py-8 text-sm text-center text-gray-500 sm:px-6">
                  No purchases added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}