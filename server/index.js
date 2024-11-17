require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Contact = require('./models/Contact');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    console.log('Connection URI:', process.env.MONGODB_URI.replace(/<password>.*@/, '****@')); // Safe logging
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
  });

  app.post('/api/contacts', async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Create contact
  app.post('/api/contacts', async (req, res) => {
    try {
      const contact = new Contact(req.body);
      await contact.save();
      res.status(201).json(contact);
    } catch (error) {
      if (error.code === 11000) { // MongoDB duplicate key error
        res.status(400).json({ 
          error: 'A contact with this email already exists.' 
        });
      } else if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ error: messages });
      } else {
        res.status(500).json({ error: 'Server error occurred' });
      }
    }
  });

  // Get all contacts
  app.get('/api/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update contact
  app.put('/api/contacts/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndUpdate(
        req.params.id, 
        req.body,
        { 
          new: true,
          runValidators: true // Enable validation for updates
        }
      );
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.json(contact);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({ 
          error: 'A contact with this email already exists.' 
        });
      } else if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(err => err.message);
        res.status(400).json({ error: messages });
      } else {
        res.status(500).json({ error: 'Server error occurred' });
      }
    }
  });
  
  // Delete contact
  app.delete('/api/contacts/:id', async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
    
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

