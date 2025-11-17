import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './context/ToastContext';
import './index.css'; // (Bạn sẽ cần tạo file này và import Tailwind)

// Tạo root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render ứng dụng
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);