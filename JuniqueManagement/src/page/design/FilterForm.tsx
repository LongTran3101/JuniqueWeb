import React, { useState } from "react";
import { Grid, TextField, MenuItem, Box, Button } from "@mui/material";

type FilterFormProps = {
    onApplyFilters: (filters: Record<string, string>) => void;
};

const FilterForm: React.FC<FilterFormProps> = React.memo(({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        account: "",
        designName: "",
        status: "",
        createFrom: "",
        createTo: "",
    });
    console.log('FilterForm.tsx : on mount');
    const handleChange = (field: string, value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleSearchClick = () => {
        onApplyFilters(filters);
    };

    return (
        <>
            <Grid container spacing={2} mb={2}>
                <Grid item size={4}>
                    <TextField
                        fullWidth
                        label="Account"
                        value={filters.account}
                        onChange={(e) => handleChange("account", e.target.value)}
                    />
                </Grid>
                <Grid item size={4}>
                    <TextField
                        fullWidth
                        label="Design Name"
                        value={filters.designName}
                        onChange={(e) => handleChange("designName", e.target.value)}
                    />
                </Grid>
                <Grid item size={4}>
                    <TextField
                        select
                        fullWidth
                        label="Status"
                        value={filters.status}
                        onChange={(e) => handleChange("status", e.target.value)}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="Active">Active</MenuItem>
                        <MenuItem value="Inactive">Inactive</MenuItem>
                    </TextField>
                </Grid>
                <Grid item size={4}>
                    <TextField
                        fullWidth
                        label="Create From Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.createFrom}
                        onChange={(e) => handleChange("createFrom", e.target.value)}
                    />
                </Grid>
                <Grid item size={4}>
                    <TextField
                        fullWidth
                        label="Create To Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.createTo}
                        onChange={(e) => handleChange("createTo", e.target.value)}
                    />
                </Grid>
            </Grid>
            <Box textAlign="right" paddingTop={2}>
                <Button
                    variant="outlined"
                    sx={{ borderRadius: 2, px: 4, border: "1px solid #800080", color: "#800080" }}
                    onClick={handleSearchClick}
                >
                    Tìm kiếm
                </Button>
            </Box>
        </>
    );
});

export default FilterForm;
