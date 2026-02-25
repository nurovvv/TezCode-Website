const variants = {
    dark: 'bg-primary text-white',
    light: 'bg-surface text-primary',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
};

export default function Badge({ children, variant = 'light', className = '' }) {
    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${variants[variant]} ${className}`}>
            {children}
        </span>
    );
}
