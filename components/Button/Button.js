export default function Button({
    children,
    variant = 'primary',
    className = '',
    ...props
}) {
    const baseClasses = "inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg transition-all duration-200 transform active:scale-95";

    const variants = {
        primary: "bg-brand-red hover:bg-red-600 text-white shadow-md hover:shadow-red-500/30",
        secondary: "bg-gray-900 hover:bg-gray-800 text-white shadow-md hover:shadow-gray-900/30",
        outline: "bg-transparent border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
    };

    return (
        <button
            className={`${baseClasses} ${variants[variant] || variants.primary} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
