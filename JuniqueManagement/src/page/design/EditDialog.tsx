import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControlLabel, Switch, TextField } from "@mui/material";
import { useEffect, useState } from "react";

const EditDialog: React.FC<{
    open: boolean,
    data: any,
    onClose: () => void,
    onSave: (updatedData: any) => void,
}> = ({ open, data, onClose, onSave }) => {
    const [enabled, setEnabled] = useState(data?.enabled ?? false);
    const [vipExpiredAt, setVipExpiredAt] = useState(data?.vipExpiredAt ? data.vipExpiredAt.slice(0,10) : ""); // yyyy-MM-dd

    // Nếu data thay đổi, đồng bộ state
    useEffect(() => {
        setEnabled(data?.enabled ?? false);
        setVipExpiredAt(data?.vipExpiredAt ? data.vipExpiredAt.slice(0,10) : "");
    }, [data]);

    const handleSave = () => {
        onSave({
            ...data,
            enabled,
            vipExpiredAt: vipExpiredAt ? new Date(vipExpiredAt).toISOString() : null,
        });
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <FormControlLabel
                    control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />}
                    label="Enabled"
                />
                <TextField
                    label="VIP Expired At"
                    type="date"
                    fullWidth
                    margin="normal"
                    value={vipExpiredAt}
                    onChange={(e) => setVipExpiredAt(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">Cancel</Button>
                <Button onClick={handleSave} variant="contained" color="primary">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;
