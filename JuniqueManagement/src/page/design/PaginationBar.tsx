import React from "react";
import { Box, Pagination } from "@mui/material";

type PaginationBarProps = {
    page: number;
    count: number;
    onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};
console.log('PaginationBar.tsx : on mount');
const PaginationBar: React.FC<PaginationBarProps> = React.memo(({ page, count, onChange }) => {
    return (
        <Box mt={3} display="flex" justifyContent="flex-end">
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                color="primary"
            />
        </Box>
    );
});

export default PaginationBar;