import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import FilterForm from "./FilterForm";
import DesignTable from "./DesignTable";
import PaginationBar from "./PaginationBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoading } from "../../context/LoadingContext";
import axiosInstance from "../../components/api/axios";

const pageSize = 10;

const Design: React.FC = () => {
    const [appliedFilters, setAppliedFilters] = useState({}); // thêm state này
    const [page, setPage] = useState(1);

    // Dữ liệu API trả về:
    const [data, setData] = useState<any[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { setLoading } = useLoading();

    const designTableColumns = [
        { id: "id", label: "ID", sortable: true },
        { id: "username", label: "Username", sortable: true },
        { id: "email", label: "Email", sortable: true },
        {
            id: "status",
            label: "Status",
            sortable: true,
            render: (row: any) => {
                console.log("row.status =", row.status, "typeof:", typeof row.status);
                const status = Number(row.status);
                let color: "success" | "warning" | "error" | "textSecondary" = "textSecondary";
                let text = "Unknown";

                switch (status) {
                    case 0:
                        color = "warning";
                        text = "Deactive";
                        break;
                    case 1:
                        color = "success";
                        text = "Active";
                        break;
                    case 2:
                        color = "error";
                        text = "Deleted";
                        break;
                }

                return (
                    <Typography variant="body2" fontWeight="bold" color={color}>
                        {text}
                    </Typography>
                );
            }
        },
        {
            id: "actions",
            label: "Actions",
            sortable: false,
            align: "center",
            render: (row: any, handlers: any) => (
                <>
                    <Tooltip title="View">
                        <IconButton onClick={() => handlers.onView(row)}>
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handlers.onEdit(row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => handlers.onDelete(row)} color="error">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];
    console.log('Desing : on mount');
    // Lấy data từ API, thêm params trang và lọc (có thể mở rộng filter param)
    const fetchData = async () => {
        setLoading(true);
        try {
            const filteredParams = Object.entries(appliedFilters).reduce((acc, [key, value]) => {
                if (value !== "" && value !== null && value !== undefined) {
                    acc[key] = value;
                }
                return acc;
            }, {} as Record<string, any>);

            const params: any = {
                page: page - 1,
                size: pageSize,
                ...filteredParams,
            };
            const response = await axiosInstance.get("http://localhost:8080/api/users", { params });
            setData(response.data.content);
            setTotalElements(response.data.totalElements);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Fetch data error:", error);
            setData([]);
            setTotalElements(0);
            setTotalPages(0);
        }
        setLoading(false);
    };
    useEffect(() => {
        console.log('fetchData');
        fetchData();
    }, [page, appliedFilters]);
    const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    }, []);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const handleSelectChange = useCallback((id: string, checked: boolean) => {
        setSelectedIds((prev) =>
            checked ? [...prev, id] : prev.filter((selectedId) => selectedId !== id)
        );
    }, []);

    const handleSelectAllChange = useCallback((checked: boolean) => {
        if (checked) {
            const idsToAdd = data.map((item) => item.id);
            setSelectedIds((prev) => Array.from(new Set([...prev, ...idsToAdd])));
        } else {
            const idsToRemove = data.map((item) => item.id);
            setSelectedIds((prev) => prev.filter((id) => !idsToRemove.includes(id)));
        }
    }, [data]);

    const handleEdit = useCallback((rowData: any) => {
        console.log("Edit data: ", rowData);
    }, []);


    const onSearch = useCallback((filters: any) => {
        setAppliedFilters({ ...filters });
        setPage(1);
    }, []);

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                Design List
            </Typography>

            <FilterForm onApplyFilters={onSearch} />

            <DesignTable
                data={data}  // dữ liệu chưa sort
                page={page}
                pageSize={pageSize}
                selectedIds={selectedIds}
                onSelectChange={handleSelectChange}
                onSelectAllChange={handleSelectAllChange}
                onView={null}
                onEdit={handleEdit}
                onDelete={null}
                // onSort={handleSort}  <== xóa
                // sortConfig={sortConfig}  <== xóa
                columns={designTableColumns}
            />
            <PaginationBar page={page} count={totalPages} onChange={handlePageChange} />
        </Box>
    );
};

export default Design;
