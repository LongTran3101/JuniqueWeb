import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import FilterForm from "./FilterForm";
import DesignTable from "./DesignTable";
import PaginationBar from "./PaginationBar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLoading } from "../../context/LoadingContext";
import axiosInstance from "../../components/api/axios";
import EditDialog from "./EditDialog";
import { useNotification } from "../../context/NotificationProvider";

const pageSize = 10;

const Design: React.FC = () => {
    const [appliedFilters, setAppliedFilters] = useState({}); // thêm state này
    const [page, setPage] = useState(1);
    const { showNotification } = useNotification();
    // Dữ liệu API trả về:
    const [data, setData] = useState<any[]>([]);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const { setLoading } = useLoading();
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    const designTableColumns = useMemo(() => [
        { id: "id", label: "ID", sortable: true },
        { id: "username", label: "Username", sortable: true },
        { id: "email", label: "Email", sortable: true },
        {
            id: "vipExpiredAt",
            label: "Thời hạn vip",
            sortable: true,
            render: (row: any) => {
                if (!row.vipExpiredAt) return "";

                const date = new Date(row.vipExpiredAt);
                const formatted = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}/${date.getFullYear()}`;
                return formatted;
            },
        },

        {
            id: "enabled",
            label: "enabled",
            sortable: true,
            render: (row: any) => {
                let color: "success" | "warning" | "error" | "textSecondary" = "textSecondary";
                let text = "Unknown";
                let enabled = row.enabled;
                if (enabled == false) {
                    color = "warning";
                    text = "Deactive";
                } else {
                    color = "success";
                    text = "Active";
                }
                return (
                    <Typography variant="body2" fontWeight="bold" color={color}>
                        {text}
                    </Typography>
                );
            },
        },
        { id: "createdBy", label: "Created By", sortable: true },
        {
            id: "actions",
            label: "Actions",
            sortable: false,
            align: "center" as "center",
            render: (row: any, handlers: any) => (
                <>
                    {/* <Tooltip title="View">
                        <IconButton onClick={() => handlers?.onView(row)}>
                            <VisibilityIcon fontSize="small" />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Edit">
                        <IconButton onClick={() => handlers?.onEdit(row)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Delete">
                        <IconButton onClick={() => handlers?.onDelete(row)} color="error">
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Tooltip> */}
                </>
            ),
        },
    ], []);
    console.log('Desing : on mount');
    // Lấy data từ API, thêm params trang và lọc (có thể mở rộng filter param)
    const fetchData = async () => {
        setLoading(true);
        try {
            console.log(appliedFilters, "   appliedFilters  ");
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
        setEditData(rowData);
        setEditDialogOpen(true);
    }, []);


    const onSearch = useCallback((filters: any) => {
        setAppliedFilters({ ...filters });
        setPage(1);
    }, []);
    const handleSaveEdit = async (updatedData: any) => {
        setLoading(true);
        try {
            // Gọi API update user
            const res = await axiosInstance.put(`http://localhost:8080/api/users/${updatedData.id}`, updatedData);
            if (res.data.code == "SUCCESS") {
                showNotification("Cập nhật thành công", "success");
                fetchData();
                setEditDialogOpen(false);
            } else {
                showNotification("Cập nhật thất bại", "error");
            }
            // Reload data lại từ API

        } catch (error) {
            showNotification("Cập nhật thất bại do lỗi hệ thống", "error");
            // Có thể show toast lỗi
        }
        setLoading(false);
    };

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
                onView={() => { }}
                onEdit={handleEdit}
                onDelete={() => { }}
                columns={designTableColumns}
            />
            <PaginationBar page={page} count={totalPages} onChange={handlePageChange} />
            <EditDialog
                open={editDialogOpen}
                data={editData}
                onClose={() => setEditDialogOpen(false)}
                onSave={handleSaveEdit}
            />
        </Box>
    );
};

export default Design;
