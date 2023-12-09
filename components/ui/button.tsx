import {forwardRef} from "react";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

// eslint-disable-next-line react/display-name
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
                                                               className,
                                                               children,
                                                               disabled,
                                                               type = "button",
                                                               ...props
                                                           }, ref) => {
    return (
        <button
            ref={ref}
            type={type}
            className={
                `inline-flex 
            items-center 
            justify-center 
            px-4 py-2 
            border 
            border-transparent 
            transition 
            text-sm
            text-white 
            font-medium 
            rounded-md 
            shadow-sm 
            bg-gray-900 
            hover:bg-gray-800 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-gray-200 
            ${className}
            `}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
});

export default Button;