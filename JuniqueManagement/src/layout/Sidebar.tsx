import {
    Box,
    Collapse,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import UploadIcon from '@mui/icons-material/CloudUpload';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const drawerWidth = 240;

const Sidebar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
        designUpload: true,
    });

    const handleToggle = (label: string) => {
        setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const menuItems = [
        {
            label: 'Dashboard',
            icon: <DashboardIcon />,
            path: '/dashboard',
        },
        {
            label: 'Design upload',
            id: 'designUpload',
            icon: <StoreIcon />,
            children: [
                { label: 'Design List', path: '/design', icon: <StoreIcon /> },
                { label: 'Upload', path: '/upload', icon: <UploadIcon /> },
            ],
        },
    ];

    return isAuthenticated ? (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#fff',
                    borderRight: '1px solid #eee',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingTop:10,
                },
            }}
        >
            {/* Logo + Menu */}
            <Box>
                {/* <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                        Dabang
                    </Typography>
                </Box> */}

                <List>
                    {menuItems.map((item) => {
                        if (item.children) {
                            const isOpen = openMenus[item.id] || false;
                            return (
                                <Box key={item.id}>
                                    <ListItemButton onClick={() => handleToggle(item.id)}>
                                        <ListItemIcon>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.label} />
                                        {isOpen ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            {item.children.map((child) => (
                                                <ListItemButton
                                                    key={child.label}
                                                    sx={{ pl: 4 }}
                                                    onClick={() => handleNavigate(child.path)}
                                                >
                                                    <ListItemIcon>{child.icon}</ListItemIcon>
                                                    <ListItemText primary={child.label} />
                                                </ListItemButton>
                                            ))}
                                        </List>
                                    </Collapse>
                                </Box>
                            );
                        }

                        return (
                            <ListItemButton
                                key={item.label}
                                onClick={() => handleNavigate(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        );
                    })}
                </List>
            </Box>

            {/* Sign Out at bottom */}
            <Box>
                <Divider />
                <List>
                    <ListItemButton
                       
                        onClick={() => handleNavigate("/settings")}
                    >
                        <ListItemIcon><SettingsIcon/></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItemButton>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    ) : null;
};

export default Sidebar;
