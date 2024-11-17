// src/components/layout/TopBar.jsx
import {
    AppBar,
    Toolbar,
    IconButton,
    InputBase,
    Box,
    alpha,
    styled,
    Avatar,
    Typography,
    Badge,
  } from '@mui/material';
  import {
    Menu as MenuIcon,
    Search as SearchIcon,
    Notifications as NotificationsIcon,
    AccountCircle,
  } from '@mui/icons-material';
  
  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '40ch',
      },
    },
  }));
  
  const TopBar = ({ onMenuClick, onSearch, searchValue }) => {
    return (
      <AppBar 
        position="fixed" 
        color="inherit" 
        elevation={1}
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: 'background.paper',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={onMenuClick}
            sx={{ 
              mr: 2,
              color: 'text.secondary',
            }}
          >
            <MenuIcon />
          </IconButton>
  
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search contacts..."
              value={searchValue}
              onChange={(e) => onSearch(e.target.value)}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
  
          <Box sx={{ flexGrow: 1 }} />
  
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton 
              color="inherit" 
              sx={{ color: 'text.secondary' }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
  
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              '&:hover': {
                opacity: 0.8
              }
            }}>
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35,
                  bgcolor: 'primary.main'
                }}
              >
                <AccountCircle />
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle2" color="text.primary">
                  Vivek Ray
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default TopBar;