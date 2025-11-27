
import React, { useState, useEffect } from 'react';
import { CloseIcon, PlusCircleIcon } from './Icons';
import useEscapeKey from '../hooks/useEscapeKey';

interface ManualInputModalProps {
    isOpen: boolean;
    title: string;
    label?: string;
    placeholder?: string;
    initialValue?: string;
    onClose: () => void;
    onSave: (value: string) => void;
}

export const ManualInputModal: React.FC<ManualInputModalProps> = ({
    isOpen,
    title,
    label = "Custom Entry",
    placeholder = "Type here...",
    initialValue = "",
    onClose,
    onSave
}) => {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        if (isOpen) setValue(initialValue);
    }, [isOpen, initialValue]);

    useEscapeKey(onClose);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            onSave(value);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-stone-200 overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-stone-900 p-4 flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        <PlusCircleIcon className="w-5 h-5 text-bronze-500" />
                        {title}
                    </h3>
                    <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
                        <CloseIcon className="w-5 h-5" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-stone-700 mb-2 uppercase tracking-wide">
                            {label}
                        </label>
                        <input
                            autoFocus
                            type="text"
                            className="w-full p-3 border-2 border-stone-200 rounded-lg focus:border-stone-900 focus:ring-0 outline-none text-stone-900 placeholder-stone-400 bg-stone-50"
                            placeholder={placeholder}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex justify-end gap-3">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-4 py-2 text-stone-600 font-bold hover:bg-stone-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={!value.trim()}
                            className="px-6 py-2 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-colors disabled:opacity-50"
                        >
                            Confirm & Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
