import { Box } from '@mui/material';

const MainContent = ({ children }) => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        mt: 8,
        backgroundColor: 'background.default',
        minHeight: '100vh',
        overflow: 'auto',
      }}
    >
      {children}
    </Box>
  );
};

export default MainContent;
