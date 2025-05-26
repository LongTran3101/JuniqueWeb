// src/components/Dashboard/DashboardSummary.tsx
import { Box, Card, Typography } from '@mui/material';
import { Grid } from '@mui/material';

const SummaryCard = ({ title, subtitle, value, color }: { title: string; subtitle: string; value: number; color: string }) => (
    <Card sx={{ p: 2, minWidth: 180, borderRadius: 3, boxShadow: 3, height: '100%', }}>
        <Typography variant="subtitle2" color={color} fontWeight="bold" mb={1}>
            {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
            {subtitle}
        </Typography>
        <Typography variant="h5" fontWeight="bold">
            {value}
        </Typography>
    </Card>
);

const DashboardSummary = () => {
    return (
        <Box >
            <Typography variant="h4" fontWeight="bold" mb={1}>
                Dashboard
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={3}>
                What a great day to be creative 🙌
            </Typography>

            <Box display="flex" justifyContent="center">
                <Grid container spacing={3} >
                    {/* Sales */}
                    <Grid size={3}>
                        <Typography variant="subtitle1" fontWeight="bold" color="purple" mb={1}>
                            🛒 Sales
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid  size={6}>
                                <SummaryCard title="Ongoing month" subtitle="01/05 - 13/05" value={0} color="purple" />
                            </Grid>
                            <Grid  size={6}>
                                <SummaryCard title="All-time" subtitle="" value={0} color="purple" />
                            </Grid>
                        </Grid>
                    </Grid>

                    {/* Saves */}
                    <Grid size={3}>
                        <Typography variant="subtitle1" fontWeight="bold" color="black" mb={1}>
                            ❤️ Saves
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid  size={6}>
                                <SummaryCard title="Ongoing month" subtitle="01/05 - 13/05" value={0} color="black" />
                            </Grid>
                            <Grid  size={6}>
                                <SummaryCard title="All-time" subtitle="" value={0} color="black" />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DashboardSummary;
