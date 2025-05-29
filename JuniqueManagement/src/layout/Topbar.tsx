import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    InputBase,
    Avatar,
    IconButton,
    Menu,
    MenuItem,
    Divider,
    Tooltip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useAuth } from '../context/AuthContext';

const Topbar = () => {
    const { isAuthenticated, user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        logout();
    };

    return isAuthenticated ? (

        
        <AppBar
            position="relative"
            elevation={1}
            sx={{
                bgcolor: '#ffffff',
                color: '#333333',
                zIndex: 1201,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src="/logo.png" // hoặc đường dẫn logo từ public folder
                        alt="Logo"
                        style={{ height: 40 }} // hoặc tùy chỉnh theo thiết kế
                    />
                </Box>
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
                        <SearchIcon sx={{ mr: 1, color: 'gray' }} />
                        <InputBase placeholder="Search..." fullWidth />
                    </Box>

                    <IconButton>
                        <NotificationsNoneIcon />
                    </IconButton>

                    {/* Avatar + Username + Dropdown */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Tooltip title="User menu">
                            <Box
                                onClick={handleMenuOpen}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    px: 1,
                                    py: 0.5,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': { bgcolor: '#f5f5f5' },
                                }}
                            >
                                <Avatar
                                    alt={user?.username}
                                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${user?.username}`}
                                    sx={{ width: 36, height: 36 }}
                                />
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                        {user?.username}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user?.role}
                                    </Typography>
                                </Box>
                                <KeyboardArrowDownIcon fontSize="small" />
                            </Box>
                        </Tooltip>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleMenuClose}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                            PaperProps={{
                                elevation: 4,
                                sx: {
                                    mt: 1,
                                    minWidth: 180,
                                    borderRadius: 2,
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                },
                            }}
                        >
                            <MenuItem disabled>
                                <Typography variant="body2">
                                    Signed in as <strong>{user?.username}</strong>
                                </Typography>
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    ) : null;
};

export default Topbar;
