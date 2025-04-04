import { useState } from 'react';
import { Products } from './components/products/Products';
import { Suppliers } from './components/suppliers/Suppliers';
import { Purchase } from './components/purchase/Purchase';
import { Sale } from './components/sale/Sale';
import { Layout } from './components/Layout';

function App() {
  const [activeTab, setActiveTab] = useState<'products' | 'suppliers' | 'Purchase' | 'Sale'>('products');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Layout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
    >
      {activeTab === 'products' && <Products />}
      {activeTab === 'suppliers' && <Suppliers />}
      {activeTab === 'Purchase' && <Purchase />}
      {activeTab === 'Sale' && <Sale />}
    </Layout>
  );
}

export default App;