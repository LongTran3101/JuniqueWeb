// components/SessionExpiredDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogActions, Button, DialogContent, DialogContentText } from '@mui/material';

interface Props {
    open: boolean;
    onClose: () => void;
}

const SessionExpiredDialog: React.FC<Props> = ({ open, onClose }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Phiên đăng nhập hết hạn</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại để tiếp tục.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    sx={{ borderRadius: 2, px: 4, border: "1px solid #800080", color: "#800080" }}
                    onClick={onClose}
                >
                   OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default SessionExpiredDialog;
