import { createContext, useState } from "react";
import ToastNotify from "../components/ToastNotify";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState({ message: "", type: "success", visible: false });

    const showToast = (message, type = "success", duration = 3000) => {
        setToast({ message, type, visible: true });
        setTimeout(() => {
            setToast({ message: "", type: "success", visible: false });
        }, duration);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {toast.visible && <ToastNotify message={toast.message} type={toast.type} />}
        </ToastContext.Provider>
    );
};

export { ToastContext };
