import { motion } from 'motion/react';
import ProductCard from '../components/ProductCard';
import { Navbar } from '../components/Navbar';
import productsData from '../../data/products.json';
import type { Product } from '../types/product';

const products: Product[] = productsData;

export default function ProductsPage() {

  return (
    <div className="min-h-screen bg-[#040c1b] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">
                All Products
              </span>
            </h1>
            <p className="text-blue-200/50 max-w-lg text-lg mt-4">
              Browse our complete range of premium PET bottles engineered for clarity, durability, and sustainability.
            </p>
          </motion.div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                category={product.category}
                image={product.image}
                index={i}
                from="products"
              />
            ))}
          </div>
        </div>
      </main>

      {/* Background glows */}
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
