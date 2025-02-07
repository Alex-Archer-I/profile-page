interface ButtonProps {
    text: string;
    clickHandler?: (toggle?: boolean) => void;
    type?: 'button' | 'submit' | 'reset';
    isInactive?: boolean;
};

const Button = ({ text, clickHandler, type = 'button', isInactive = false }: ButtonProps) => {
    const baseClasses = `w-full px-4 py-2 rounded-lg font-medium transition-all cursor-pointer shadow-md`;
    const hoverClasses = `hover:bg-blue-600 ${isInactive ? 'hover:text-white' : ''}`;
    const activeClasses = `active:bg-blue-700`;
    const inactiveClasses = isInactive ? `bg-white text-blue-500 border border-blue-500` : 'text-white bg-blue-500';

    const buttonClickHandler = () => {
        if (clickHandler) {
            clickHandler(isInactive);
        };
    };

    return (
        <button type={type} onClick={buttonClickHandler} className={`${baseClasses} ${hoverClasses} ${activeClasses} ${inactiveClasses}`}>{text}</button>
    );
};

export default Button;