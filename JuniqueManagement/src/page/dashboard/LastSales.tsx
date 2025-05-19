import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Avatar,
    InputBase,
    IconButton,
    Button,
    Divider,
    Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

type SaleItem = {
    title: string;
    author: string;
    thumbnail: string;
};

type SalesData = {
    date: string;
    items: SaleItem[];
};

const sales: SalesData[] = [
    {
        date: "11/05/2025",
        items: [
            {
                title: "Minecraft Poster",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
        ],
    },
    {
        date: "06/05/2025",
        items: [
            {
                title: "Kitten The Sun Tarot Card",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
        ],
    },
    {
        date: "05/05/2025",
        items: [
            {
                title: "Minecraft Poster",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
            {
                title: "cat goes to the toilet",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
        ],
    },
    {
        date: "02/05/2025",
        items: [
            {
                title: "Minecraft Poster",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
        ],
    },
    {
        date: "26/04/2025",
        items: [
            {
                title: "Retro Record Music Poster, Japanese Wall Art",
                author: "Jesica Leigh Taylor",
                thumbnail: "https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110",
            },
        ],
    },
];

const LastSales: React.FC = () => {
    return (
        <Card sx={{ p: 3 }}>
            {/* Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h6" fontWeight={600}>
                    🛒 Last sales
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    sx={{
                        backgroundColor: "#f1f1f1",
                        px: 2,
                        borderRadius: 2,
                        height: 36,
                    }}
                >
                    <SearchIcon fontSize="small" />
                    <InputBase placeholder="Search..." sx={{ ml: 1 }} />
                </Box>
            </Box>

            {/* Sales List */}
            {sales.map((group, idx) => (
                <Box key={idx} mb={3}>
                    <Typography variant="body2" color="text.secondary" mb={1}>
                        {group.date}
                    </Typography>

                    <Stack spacing={1}>
                        {group.items.map((item, i) => (
                            <Card variant="outlined" key={i}>
                                <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Avatar
                                            src={item.thumbnail}
                                            variant="rounded"
                                            sx={{ width: 48, height: 48 }}
                                        />
                                        <Box>
                                            <Typography fontWeight={600}>{item.title}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.author}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Box display="flex" alignItems="center" gap={2}>
                                        <Box display="flex" alignItems="center" gap={1}>
                                            <DescriptionOutlinedIcon fontSize="small" />
                                            <Typography variant="body2">1x Poster</Typography>
                                        </Box>
                                        <IconButton>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </Stack>
                </Box>
            ))}

            <Divider sx={{ my: 2 }} />
            <Box textAlign="center" paddingTop={2}>
                <Button variant="outlined" sx={{ borderRadius: 2, px: 4, border: '1px solid #800080', color: '#800080' }}>
                    Show all designs
                </Button>
            </Box>
        </Card>
    );
};

export default LastSales;
