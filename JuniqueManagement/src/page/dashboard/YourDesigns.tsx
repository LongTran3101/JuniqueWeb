// src/components/Dashboard/YourDesigns.tsx
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    IconButton,
    Button,
    Divider,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const mockDesigns = [
    {
        id: 1,
        title: 'dog question playful humor',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    {
        id: 2,
        title: 'panda toilet magazine bathroom',
        author: 'Kirsten C Nolan',
        image: 'https://www.juniqe.com/cdn-cgi/image/w=80,f=auto,q=85,fit=cover/https://jq-creator-admin-backend-designs.s3.eu-central-1.amazonaws.com/247858/images/preview.webp?fd211d47-091a-4e9d-ba05-be33e018d110',
    },
    // Add more mock items or fetch from API
];

const YourDesigns = () => {
    return (
        <Box mt={6}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                📁 Your Designs
            </Typography>
            <Divider></Divider>
            <Grid container spacing={2} size={12} >
                {mockDesigns.map((design, index) => (
                    <Grid item size={3} key={design.id} paddingTop={2}>
                        <Card sx={{ display: 'flex', alignItems: 'center', p: 2, height: '100%',padding:1,border:1,borderRadius: 8, }}>
                            <Box
                                component="img"
                                src={design.image}
                                alt={design.title}
                                sx={{
                                    objectFit: 'cover',
                                }}
                            />
                            <Box flexGrow={1} paddingLeft={1}>
                                <Typography fontWeight="bold">{design.title}</Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {design.author}
                                </Typography>

                                <Grid container spacing={2} mt={1}>
                                    <Grid item xs={6}>
                                        <Box display="flex" alignItems="center">
                                            <ShoppingCartIcon fontSize="small" />
                                            <Typography ml={1} variant="body2">
                                                0 Sales
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Box display="flex" alignItems="center">
                                            <FavoriteBorderIcon fontSize="small" />
                                            <Typography ml={1} variant="body2">
                                                0 Saves
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <IconButton>
                                <VisibilityIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid paddingTop={10}>
            <Divider></Divider>
            </Grid>
            
            <Box textAlign="center" paddingTop={2}>
                <Button variant="outlined" sx={{ borderRadius: 2, px: 4, border: '1px solid #800080', color: '#800080' }}>
                    Show all designs
                </Button>
            </Box>
        </Box>
    );
};

export default YourDesigns;
