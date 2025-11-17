import React from 'react';
import { Icon } from '../Icon'; // (Lưu ý đường dẫn ../)

export const BaseModal = React.memo(({ isOpen, onClose, title, children, footer, maxWidth = "max-w-2xl" }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-40 p-4 animate-fade-in" 
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className={`bg-white rounded-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-slide-up`}>
                {/* Header */}
                <div className="flex justify-between items-start p-6 border-b">
                    {typeof title === 'string' ? (
                        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    ) : (
                        title // Render component title
                    )}
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 -m-2 hover:bg-gray-100 rounded-full transition-colors"><Icon name="x" size={24} /></button>
                </div>
                
                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
                    {children}
                </div>
                
                {/* Footer */}
                {footer && (
                    <div className="p-6 bg-white border-t flex justify-end items-center gap-3">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
});