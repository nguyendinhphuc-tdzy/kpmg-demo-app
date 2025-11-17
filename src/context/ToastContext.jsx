import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Icon } from '../components/Icon'; // (Lưu ý đường dẫn ../)

// 1. Create Context
const ToastContext = createContext();

// 2. Custom Hook
export const useToast = () => {
    return useContext(ToastContext);
};

// 3. Provider Component
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const [portal, setPortal] = useState(null);

    useEffect(() => {
        const div = document.createElement('div');
        div.setAttribute('id', 'toast-portal');
        div.className = 'fixed top-0 right-0 z-50 p-4 w-full max-w-sm';
        document.body.appendChild(div);
        setPortal(div);

        return () => {
            document.body.removeChild(div);
        };
    }, []);

    const showToast = useCallback((message, type = "success") => {
        const id = Date.now();
        setToasts(prevToasts => [...prevToasts, { id, message, type }]);

        setTimeout(() => {
            setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
        }, 3000);
    }, []);

    const toastIcons = {
        success: <Icon name="check-circle" className="text-green-500" />,
        error: <Icon name="alert-circle" className="text-red-500" />,
    };

    return (
        <ToastContext.Provider value={showToast}>
            {children}
            {portal && ReactDOM.createPortal(
                <div className="space-y-3">
                    {toasts.map(toast => (
                        <div key={toast.id} className="bg-white shadow-lg rounded-lg p-4 flex items-center animate-fade-in border-l-4" style={{ borderColor: toast.type === 'success' ? '#22c55e' : '#ef4444' }}>
                            <div className="flex-shrink-0">
                                {toastIcons[toast.type]}
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{toast.message}</p>
                            </div>
                        </div>
                    ))}
                </div>,
                portal
            )}
        </ToastContext.Provider>
    );
};