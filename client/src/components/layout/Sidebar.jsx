import { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  styled,
  useTheme
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  ContactsOutlined,
  DashboardOutlined,
  SettingsOutlined,
  MenuOpen
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;
const COLLAPSED_DRAWER_WIDTH = 70;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2),
  ...theme.mixins.toolbar
}));

const Sidebar = ({ open, onClose, isMobile }) => {
  const theme = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { 
      title: 'Dashboard', 
      icon: <DashboardOutlined />, 
      active: false 
    },
    { 
      title: 'Contacts', 
      icon: <ContactsOutlined />, 
      active: true 
    },
    { 
      title: 'Settings', 
      icon: <SettingsOutlined />, 
      active: false 
    }
  ];

  const drawerContent = (
    <>
      <DrawerHeader>
        {!isCollapsed ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img 
              src="/erino-logo.svg" 
              alt="Erino" 
              style={{ height: 32 }}
            />
          </Box>
        ) : (
          <Box sx={{ width: 32, height: 32, ml: 0.5 }}>
            <img 
              src="/erino-icon.svg" 
              alt="Erino" 
              style={{ height: '100%' }}
            />
          </Box>
        )}
        {!isMobile && (
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
        {isMobile && (
          <IconButton onClick={onClose}>
            <MenuOpen />
          </IconButton>
        )}
      </DrawerHeader>

      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => (
          <ListItem 
            key={item.title} 
            disablePadding 
            sx={{ mb: 0.5 }}
          >
            <Tooltip 
              title={isCollapsed ? item.title : ''} 
              placement="right"
            >
              <ListItemButton
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  backgroundColor: item.active ? 'primary.light' : 'transparent',
                  color: item.active ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    backgroundColor: item.active 
                      ? 'primary.light' 
                      : 'rgba(91, 107, 248, 0.08)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <ListItemIcon 
                  sx={{ 
                    minWidth: isCollapsed ? 'auto' : 48,
                    color: item.active ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText 
                    primary={item.title}
                    primaryTypographyProps={{
                      fontWeight: item.active ? 600 : 500,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: DRAWER_WIDTH,
          border: 'none',
          boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
          background: theme.palette.background.paper,
        }
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH,
          border: 'none',
          boxShadow: '4px 0 10px rgba(0,0,0,0.05)',
          background: theme.palette.background.paper,
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
      open={open}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
