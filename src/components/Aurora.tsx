import React from 'react';
import { motion } from 'motion/react';

interface AuroraProps {
  color1?: string;
  color2?: string;
  color3?: string;
  speed?: number;
  blend?: number;
}

const Aurora: React.FC<AuroraProps> = ({
  color1 = '#105698',
  color2 = '#0a2e5c',
  color3 = '#1e40af',
  speed = 1.7,
  blend = 0.61,
}) => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      <div 
        className="absolute inset-0 opacity-60"
        style={{ mixBlendMode: 'screen' }}
      >
        {/* Layer 1 */}
        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-10%', '10%', '-10%'],
            rotate: [0, 45, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15 / speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] blur-[120px]"
          style={{
            background: `radial-gradient(circle at center, ${color1} 0%, transparent 70%)`,
            opacity: blend,
          }}
        />

        {/* Layer 2 */}
        <motion.div
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['10%', '-10%', '10%'],
            rotate: [0, -45, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 18 / speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/4 -right-1/4 w-[150%] h-[150%] blur-[150px]"
          style={{
            background: `radial-gradient(circle at center, ${color2} 0%, transparent 70%)`,
            opacity: blend * 0.8,
          }}
        />

        {/* Layer 3 */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12 / speed,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-full h-full blur-[100px]"
          style={{
            background: `radial-gradient(circle at center, ${color3} 0%, transparent 60%)`,
            opacity: blend * 0.5,
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      {/* Dark Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
    </div>
  );
};

export default Aurora;
