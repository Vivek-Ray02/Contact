import { useState, useEffect } from 'react';
import {
  Box,
  CssBaseline,
  ThemeProvider,
  createTheme,
  useMediaQuery
} from '@mui/material';
import Sidebar from './components/layout/Sidebar';
import TopBar from './components/layout/TopBar';
import MainContent from './components/layout/MainContent';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import Notifications from './components/common/Notifications';
import { getContacts, createContact, updateContact, deleteContact } from './api';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2'
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff'
    }
  },
  shape: {
    borderRadius: 8
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [notification, setNotification] = useState({ open: false, message: '', type: 'success' });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isAddingContact, setIsAddingContact] = useState(false);

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddNew = () => {
    setEditingContact(null);
    setIsAddingContact(true);
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await getContacts();
      // Make sure we're getting an array of contacts
      setContacts(Array.isArray(response) ? response : []);
    } catch (error) {
      showNotification('Error fetching contacts', 'error');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingContact) {
        await updateContact(editingContact._id, formData);
        showNotification('Contact updated successfully');
      } else {
        await createContact(formData);
        showNotification('Contact created successfully');
      }
      await fetchContacts(); // Refresh the contacts list
      setEditingContact(null);
    } catch (error) {
      showNotification(error.response?.data?.error || 'Error saving contact', 'error');
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      showNotification('Contact deleted successfully');
      await fetchContacts(); // Refresh the contacts list
    } catch (error) {
      showNotification('Error deleting contact', 'error');
      console.error('Error deleting contact:', error);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ open: true, message, type });
  };

  const filteredContacts = contacts.filter(contact => {
    const searchFields = [
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phoneNumber,
      contact.company,
      contact.jobTitle
    ].map(field => (field || '').toLowerCase());
    
    return searchFields.some(field => field.includes(searchQuery.toLowerCase()));
  });

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar 
          open={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
        />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <TopBar 
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            onSearch={setSearchQuery}
            searchValue={searchQuery}
          />
          <MainContent>
            {(isAddingContact || editingContact) && (
              <ContactForm
                onSubmit={handleSubmit}
                initialData={editingContact}
                isEditing={!!editingContact}
                onCancel={() => {
                  setEditingContact(null);
                  setIsAddingContact(false);
                }}
              />
            )}
            <ContactsTable
              contacts={filteredContacts}
              onEdit={setEditingContact}
              onDelete={handleDelete}
              onAdd={handleAddNew}
              loading={loading}
            />
          </MainContent>
        </Box>
        <Notifications
          open={notification.open}
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ ...notification, open: false })}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
