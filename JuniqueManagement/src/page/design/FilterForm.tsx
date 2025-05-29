import React, { useState } from "react";
import { Grid, TextField, Box, Button } from "@mui/material";

type FilterFormProps = {
    onApplyFilters: (filters: Record<string, string>) => void;
};

const FilterForm: React.FC<FilterFormProps> = React.memo(({ onApplyFilters }) => {
    const [filters, setFilters] = useState({
        username: "",
        email: "",
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
                <Grid size={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Username"
                        value={filters.username}
                        onChange={(e) => handleChange("username", e.target.value)}
                    />
                </Grid>
                <Grid size={4}>
                    <TextField
                        fullWidth
                        size="small"
                        label="email"
                        value={filters.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                </Grid>
            </Grid>
            <Box textAlign="right" paddingTop={2}>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{
                        borderRadius: 2,
                        px: 4,
                        borderColor: '#673ab7', // Màu giống hình 1
                        color: '#673ab7', // Màu chữ giống hình 1
                        '&:hover': {
                            borderColor: '#673ab7', // Màu border khi hover
                            backgroundColor: '#ede7f6', // Màu background khi hover (tùy chọn)
                        },
                    }}
                    onClick={handleSearchClick}
                >
                    Tìm kiếm
                </Button>
            </Box>
        </>
    );
});

export default FilterForm;
