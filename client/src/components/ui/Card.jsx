import { motion } from 'framer-motion';

export default function Card({
    children,
    dark = false,
    hover = true,
    className = '',
    ...props
}) {
    return (
        <motion.div
            whileHover={hover ? { y: -2 } : {}}
            className={`rounded-2xl p-6 transition-all ${dark
                    ? 'bg-primary text-white'
                    : 'bg-white border border-gray-100 card-shadow'
                } ${hover ? 'card-shadow-hover' : ''} ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
}
