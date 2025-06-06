import {forwardRef, TextareaHTMLAttributes} from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({label, error, fullWidth = false, className = '', ...props}, ref) => {
        return (
            <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    className={`
            w-full px-3 py-2 bg-white border rounded-md shadow-sm placeholder-gray-400 
            focus:outline-none focus:ring-blue-500 focus:border-blue-500 
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
                    {...props}
                />
                {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export default Textarea;