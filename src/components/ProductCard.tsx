import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  image: string;
  index?: number;
  from?: 'home' | 'products';
}

export default function ProductCard({ id, name, category, image, index = 0, from = 'home' }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
    >
      <Link to={`/product/${id}`} state={{ from }} className="block group">
        <div className="liquid-glass-blue rounded-[18px] p-[10px] transition-all duration-500 hover:bg-white/[0.08] hover:border-white/[0.15]">
          {/* Image Area */}
          <div className="relative w-full aspect-square rounded-[12px] overflow-hidden mb-2 bg-gradient-to-b from-blue-950/40 to-[#040c1b]">
            <div className="absolute inset-0 bg-blue-500/5" />
            <img
              src={image}
              alt={name}
              className="absolute inset-0 w-[70%] h-[85%] object-contain m-auto drop-shadow-[0_20px_40px_rgba(59,130,246,0.15)] transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2"
            />
            {/* Subtle glow on hover */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60%] h-[40%] bg-blue-400/0 blur-[40px] rounded-full transition-all duration-700 group-hover:bg-blue-400/10" />
          </div>

          {/* Bottom Info Bar */}
          <div className="liquid-glass-blue rounded-[12px] px-4 py-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-blue-200/50 uppercase tracking-[0.15em] font-medium">{category}</p>
              <p className="text-[14px] font-bold text-white/90 mt-0.5">{name}</p>
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-500/50">
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
