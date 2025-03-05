import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ReactConfetti = dynamic(() => import('react-confetti'), {
  ssr: false,
});

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  donationAmount: number;
}

export function ThankYouModal({ isOpen, onClose, donationAmount }: ThankYouModalProps) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-[90%] max-w-sm bg-white rounded-2xl p-6 shadow-2xl mx-auto"
          >
            <div className="absolute inset-0 overflow-hidden">
              <ReactConfetti
                width={windowSize.width}
                height={windowSize.height}
                recycle={false}
                numberOfPieces={200}
                gravity={0.2}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none'
                }}
              />
            </div>

            <button
              onClick={onClose}
              className="absolute right-4 top-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            <div className="relative text-center z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-16 h-16 text-red-500 fill-red-500" />
                </motion.div>
              </div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-bold text-gray-900 mb-3"
              >
                Thank You for Your Generosity!
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-primary font-semibold mb-3"
              >
                Your donation of ₹{donationAmount} will make a real difference
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-sm mb-6"
              >
                Your support helps us continue our mission of empowering communities and creating positive change.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="bg-primary text-white px-6 py-2.5 rounded-xl text-base font-medium hover:bg-primary/90 transition-all transform hover:scale-105 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 