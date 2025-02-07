//import {useState} from 'react';

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    isError?: boolean;
};

const Input = ({ label, type, name, value, changeHandler, isError = false} : InputProps) => {
    const baseClasses = 'w-full mb-[0.5rem] px-4 py-2 rounded-lg transition-all outline-none bg-gray-100 border border-gray-300 text-gray-900';
    const focusClasses = 'focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg';
    const errorClasses = isError ? 'border-red-500 text-red-600 focus:ring-red-500 focus:shadow-red-300 bg-red-100' : '';

    return (
        <>
            <label htmlFor={name} className={`text-blue-500`}>{label}</label>
            <input type={type} name={name} id={name} value={value} onChange={changeHandler} className={`${baseClasses} ${focusClasses} ${errorClasses}`}/>
        </>
    );
};

export default Input;