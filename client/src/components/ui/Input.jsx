export default function Input({
    label,
    error,
    className = '',
    ...props
}) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700">{label}</label>
            )}
            <input
                className={`w-full px-4 py-3 rounded-xl border transition-all bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-gray-400 ${error ? 'border-error' : 'border-gray-200 hover:border-gray-300'
                    } ${className}`}
                {...props}
            />
            {error && (
                <p className="text-sm text-error">{error}</p>
            )}
        </div>
    );
}
