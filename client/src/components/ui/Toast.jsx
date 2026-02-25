import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Toast({ message, visible, onClose, duration = 3000 }) {
    useEffect(() => {
        if (visible && onClose) {
            const timer = setTimeout(onClose, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, onClose, duration]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-6 right-6 bg-primary text-white px-6 py-3 rounded-2xl z-50 font-medium"
                    style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}
                >
                    {message}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
