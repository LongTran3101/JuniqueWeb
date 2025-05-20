import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    InputBase,
    Avatar,
    IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const { isAuthenticated,user } = useAuth();
    return isAuthenticated ? (  // Only render if authenticated
        <AppBar position="fixed" elevation={0} sx={{ ml: 240, bgcolor: '#fff', color: '#333', zIndex: 1201 }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6"></Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: '#f0f2f5',
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            minWidth: 200,
                        }}
                    >
                        <SearchIcon sx={{ mr: 1 }} />
                        <InputBase placeholder="Search here..." fullWidth />
                    </Box>

                    <Typography variant="body2">Eng (US)</Typography>

                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar src="https://i.pravatar.cc/40" />
                        <Box>
                            <Typography variant="body2">{user?.email}</Typography>
                            <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    ) : null; // Render null if not authenticated
};

export default Topbar;
