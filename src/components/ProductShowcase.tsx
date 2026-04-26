import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import productsData from '../../data/products.json';
import type { Product } from '../types/product';

const products: Product[] = productsData;

export default function ProductShowcase() {

  return (
    <section id="products" className="relative z-10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-blue-400">
                Our Products
              </span>
            </h2>
            <p className="text-blue-200/50 max-w-md text-lg mt-3">
              Premium PET bottles engineered for clarity, durability, and sustainability.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="hidden md:block"
          >
            <Link
              to="/products"
              className="flex flex-col items-end group"
            >
              <span className="text-lg font-bold text-white/80 uppercase tracking-wide group-hover:text-white transition-colors">
                See All
              </span>
              <div className="w-full h-[3px] bg-blue-500 mt-1 transition-all duration-300 group-hover:bg-blue-400" />
            </Link>
          </motion.div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.slice(0, 3).map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              image={product.image}
              index={i}
              from="home"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
