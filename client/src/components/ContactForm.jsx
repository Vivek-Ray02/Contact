import { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
  CircularProgress,
  Slide,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import {
  PersonAdd,
  Edit as EditIcon,
  Close as CloseIcon,
  Business,
  Email,
  Phone,
  Person,
  Work
} from '@mui/icons-material';

const ContactForm = ({ onSubmit, initialData, isEditing, onCancel }) => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setError('');
      setValidation({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      });
    }
  }, [initialData]);

  const validateForm = () => {
    let isValid = true;
    const newValidation = {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: ''
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      newValidation.firstName = 'First name is required';
      isValid = false;
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newValidation.lastName = 'Last name is required';
      isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newValidation.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newValidation.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10,}$/;
    if (!formData.phoneNumber.trim()) {
      newValidation.phoneNumber = 'Phone number is required';
      isValid = false;
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newValidation.phoneNumber = 'Please enter a valid phone number (minimum 10 digits)';
      isValid = false;
    }

    setValidation(newValidation);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      if (!isEditing) {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          company: '',
          jobTitle: ''
        });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validation[name]) {
      setValidation(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setError('');
  };

  return (
    <Slide direction="down" in={true} mountOnEnter unmountOnExit>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          position: 'relative',
          border: '1px solid',
          borderColor: theme.palette.divider
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          mb: 3
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isEditing ? (
              <EditIcon color="primary" />
            ) : (
              <PersonAdd color="primary" />
            )}
            <Typography variant="h6" color="primary">
              {isEditing ? 'Edit Contact' : 'Add New Contact'}
            </Typography>
          </Box>
          {isEditing && (
            <IconButton onClick={onCancel} size="small">
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {error && (
          <Slide direction="right" in={true}>
            <Alert 
              severity="error" 
              sx={{ mb: 2 }}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => setError('')}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
            >
              {Array.isArray(error) ? error.join(', ') : error}
            </Alert>
          </Slide>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
                error={!!validation.firstName}
                helperText={validation.firstName}
                disabled={loading}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                error={!!validation.lastName}
                helperText={validation.lastName}
                disabled={loading}
                InputProps={{
                  startAdornment: <Person color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!validation.email}
                helperText={validation.email}
                disabled={loading}
                InputProps={{
                  startAdornment: <Email color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
                error={!!validation.phoneNumber}
                helperText={validation.phoneNumber}
                disabled={loading}
                InputProps={{
                  startAdornment: <Phone color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="company"
                label="Company"
                value={formData.company}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: <Business color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="jobTitle"
                label="Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: <Work color="action" sx={{ mr: 1 }} />
                }}
              />
            </Grid>
          </Grid>
          <Box sx={{ 
            mt: 4, 
            display: 'flex', 
            gap: 2,
            justifyContent: 'flex-end' 
          }}>
            {isEditing && (
              <Button
                variant="outlined"
                onClick={onCancel}
                disabled={loading}
                startIcon={<CloseIcon />}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  px: 3
                }}
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? (
                <CircularProgress size={20} color="inherit" />
              ) : isEditing ? (
                <EditIcon />
              ) : (
                <PersonAdd />
              )}
              sx={{
                borderRadius: '8px',
                textTransform: 'none',
                px: 3
              }}
            >
              {isEditing ? 'Update Contact' : 'Add Contact'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Slide>
  );
};

export default ContactForm;
