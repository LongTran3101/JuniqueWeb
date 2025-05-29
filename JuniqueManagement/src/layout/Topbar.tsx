import {
    AppBar,
    Avatar,
    Box,
    IconButton,
    InputBase,
    Toolbar,
    Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const { user } = useAuth();

    return (
        <AppBar
            position="static"
            elevation={0}
            color="default"
            sx={{
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: '#fff',
                px: 2,
            }}
        >
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                {/* Logo */}


                {/* Search bar */}
                <Box>  
                </Box>

                {/* User info */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                    <Avatar>{user?.username?.[0]?.toUpperCase() || 'U'}</Avatar>
                    <Typography variant="subtitle2" fontWeight={600}>
                        {user?.username || 'User'}
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Topbar;
