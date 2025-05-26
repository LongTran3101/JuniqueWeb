// src/context/NotificationContext.tsx
import React, { createContext, useCallback, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";


type NotificationContextType = {
    showNotification: (message: string, severity?: AlertColor) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState<AlertColor>("success");

    const showNotification = useCallback((msg: string, sev: AlertColor = "success") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error("useNotification must be used within a NotificationProvider");
    }
    return context;
};
