import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
} from "@mui/material";
import TableSortLabel from "@mui/material/TableSortLabel";


interface DesignData {
    id: string;
    name: string;
    description: string;
    tag: string;
    status: string;
    account: string;
    createdDate: string;
    updatedDate: string;
}
interface ColumnConfig {
    id: string;
    label: string;
    sortable: boolean;
    align?: "left" | "right" | "center";
    render?: (
        row: DesignData,
        handlers?: {
            onView: (row: DesignData) => void;
            onEdit: (row: DesignData) => void;
            onDelete: (row: DesignData) => void;
        }
    ) => React.ReactNode;
}

interface Props {
    data: DesignData[];
    page: number;
    pageSize: number;
    selectedIds: string[];
    onSelectChange: (id: string, checked: boolean) => void;
    onSelectAllChange: (checked: boolean) => void;
    onView: (row: any) => void;
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
    columns: ColumnConfig[];
}

const DesignTable: React.FC<Props> = React.memo(({
    data,
    page,
    pageSize,
    selectedIds,
    onSelectChange,
    onSelectAllChange,
    onView,
    onEdit,
    onDelete,
    columns,
}) => {
    console.log('DesignTable : on mount');
    const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: "asc" | "desc" } | null>(null);

    const handleSort = (key: string) => {
        setSortConfig(prev =>
            prev?.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };
    const sortedData = React.useMemo<DesignData[]>(() => {
        if (!sortConfig) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key as keyof DesignData];
            const bVal = b[sortConfig.key as keyof DesignData];

            if (aVal === undefined || bVal === undefined) return 0;

            // So sánh dạng string để tránh lỗi với Date, số, v.v.
            const aStr = String(aVal).toLowerCase();
            const bStr = String(bVal).toLowerCase();

            if (aStr < bStr) return sortConfig.direction === "asc" ? -1 : 1;
            if (aStr > bStr) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const allChecked = React.useMemo(() => {
        return data.length > 0 && data.every(row => selectedIds.includes(row.id));
    }, [data, selectedIds]);

    const someChecked = React.useMemo(() => {
        return data.some(row => selectedIds.includes(row.id)) && !allChecked;
    }, [data, selectedIds, allChecked]);
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={allChecked}
                                indeterminate={someChecked}
                                onChange={(e) => onSelectAllChange(e.target.checked)}
                            />
                        </TableCell>
                        {columns.map((col) => (
                            <TableCell key={col.id} align={col.align ?? "left"}>
                                {col.sortable ? (
                                    <TableSortLabel
                                        active={sortConfig?.key === col.id}
                                        direction={sortConfig?.key === col.id ? sortConfig.direction : "asc"}
                                        onClick={() => handleSort(col.id)}
                                    >
                                        {col.label}
                                    </TableSortLabel>
                                ) : (
                                    col.label
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedData.map((row, index) => (
                        <TableRow key={row.id} hover>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selectedIds.includes(row.id)}
                                    onChange={(e) => onSelectChange(row.id, e.target.checked)}
                                />
                            </TableCell>
                            {columns.map((col) => {
                                if (col.id === "actions" && col.render) {
                                    return (
                                        <TableCell key={col.id} align={col.align ?? "left"}>
                                            {col.render(row, { onView, onEdit, onDelete })}
                                        </TableCell>
                                    );
                                } else if (col.id === "STT") {
                                    return (
                                        <TableCell key={col.id} align={col.align ?? "left"}>
                                            {(page - 1) * pageSize + index + 1}
                                        </TableCell>
                                    );
                                } return (
                                    <TableCell key={col.id} align={col.align ?? "left"}>
                                        {col.render
                                            ? col.render(row, { onView, onEdit, onDelete })
                                            : (row as any)[col.id]
                                        }
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
});

export default DesignTable;
