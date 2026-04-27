import { motion } from 'motion/react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Weight, Ruler } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import productsData from '../../data/products.json';
import type { Product } from '../types/product';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as { from?: string })?.from || 'home';
  const product: Product | null = productsData.find(p => p.id === parseInt(id || '0')) ?? null;

  const handleBack = () => {
    if (from === 'products') {
      navigate('/products');
    } else {
      navigate('/', { state: { scrollTo: 'products' } });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#040c1b] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <Link to="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#040c1b] text-white overflow-x-hidden font-sans selection:bg-blue-500/30">
      <div className="grid-bg fixed inset-0 z-0 pointer-events-none" />
      <Navbar />

      <main className="relative z-10 pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Smart Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-blue-200/50 hover:text-blue-200 transition-colors mb-10 group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-medium uppercase tracking-wider">
                {from === 'products' ? 'Back to Products' : 'Back to Home'}
              </span>
            </button>
          </motion.div>

          {/* Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Product Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative flex justify-center items-center"
            >
              <div className="relative w-full max-w-md aspect-square">
                {/* Glow effects */}
                <div className="absolute inset-0 bg-blue-600/10 blur-[80px] rounded-full" />
                <div className="absolute inset-[15%] bg-cyan-400/5 blur-[60px] rounded-full" />

                {/* Glass container */}
                <div className="relative liquid-glass-blue rounded-[24px] p-8 w-full h-full flex items-center justify-center">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    decoding="async"
                    className="w-[65%] h-[85%] object-contain drop-shadow-[0_30px_50px_rgba(59,130,246,0.2)]"
                    style={{ willChange: 'transform' }}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Right: Product Details */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col gap-6"
            >
              {/* Category badge */}
              <div className="liquid-glass-blue inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit">
                <Package className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-xs text-blue-200/70 uppercase tracking-[0.15em] font-medium">
                  {product.category}
                </span>
              </div>

              {/* Name */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                {product.name}
              </h1>

              {/* Price */}
              <div className="text-3xl font-black text-blue-400">
                {product.price}
                <span className="text-sm font-medium text-blue-200/40 ml-2">/ unit</span>
              </div>

              {/* Description */}
              <p className="text-blue-200/50 text-base leading-relaxed max-w-lg">
                {product.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="liquid-glass-blue rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-blue-400/60" />
                    <span className="text-[10px] text-blue-200/40 uppercase tracking-[0.2em] font-bold">Size</span>
                  </div>
                  <p className="text-2xl font-black text-white">{product.size}</p>
                </div>
                <div className="liquid-glass-blue rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Weight className="w-4 h-4 text-blue-400/60" />
                    <span className="text-[10px] text-blue-200/40 uppercase tracking-[0.2em] font-bold">Weight</span>
                  </div>
                  <p className="text-2xl font-black text-white">{product.weight}</p>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full lg:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-xl shadow-blue-600/30 transition-all duration-300 text-lg"
              >
                Request Quote
              </motion.button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Background glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/[0.05] blur-[200px] rounded-full pointer-events-none z-0" />
    </div>
  );
}
