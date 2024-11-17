const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

const success = (msg) => console.log(colors.green + msg + colors.reset);
const error = (msg) => console.log(colors.red + msg + colors.reset);

async function testServerConnection() {
  try {
    console.log('\n1. Testing basic server connection...');
    const response = await axios.get(API_URL);
    success('✓ Server is running');
    console.log('Response:', response.data);
    return true;
  } catch (err) {
    error('✗ Server connection test failed');
    console.error('Error:', err.message);
    return false;
  }
}

async function testCreateContact() {
  try {
    console.log('\n2. Testing contact creation...');
    const testContact = {
      firstName: "John",
      lastName: "Doe",
      email: `john.doe${Date.now()}@example.com`,
      phoneNumber: "1234567890",
      company: "Test Company",
      jobTitle: "Software Engineer"
    };
    
    const response = await axios.post(`${API_URL}/api/contacts`, testContact);
    success('✓ Contact created successfully');
    console.log('Created contact:', response.data);
    return response.data;
  } catch (err) {
    error('✗ Contact creation failed');
    console.error('Error:', err.message);
    if (err.response) {
      console.error('Response data:', err.response.data);
    }
    return null;
  }
}

async function testGetContacts() {
  try {
    console.log('\n3. Testing get all contacts...');
    const response = await axios.get(`${API_URL}/api/contacts`);
    success('✓ Retrieved contacts successfully');
    console.log('Number of contacts:', response.data.length);
    return response.data;
  } catch (err) {
    error('✗ Get contacts failed');
    console.error('Error:', err.message);
    return null;
  }
}

async function testUpdateContact(contactId) {
  try {
    console.log('\n4. Testing contact update...');
    const updateData = {
      firstName: "John Updated",
      jobTitle: "Senior Software Engineer"
    };
    
    const response = await axios.put(`${API_URL}/api/contacts/${contactId}`, updateData);
    success('✓ Contact updated successfully');
    console.log('Updated contact:', response.data);
    return response.data;
  } catch (err) {
    error('✗ Contact update failed');
    console.error('Error:', err.message);
    return null;
  }
}

async function testDeleteContact(contactId) {
  try {
    console.log('\n5. Testing contact deletion...');
    const response = await axios.delete(`${API_URL}/api/contacts/${contactId}`);
    success('✓ Contact deleted successfully');
    console.log('Response:', response.data);
    return true;
  } catch (err) {
    error('✗ Contact deletion failed');
    console.error('Error:', err.message);
    return false;
  }
}

async function runAllTests() {
  console.log('Starting API Tests...');
  
  // Test server connection
  const serverRunning = await testServerConnection();
  if (!serverRunning) {
    error('Server not running. Stopping tests.');
    return;
  }

  // Test create contact
  const createdContact = await testCreateContact();
  if (!createdContact) {
    error('Contact creation failed. Stopping tests.');
    return;
  }

  // Test get contacts
  const contacts = await testGetContacts();
  
  // Test update contact
  if (createdContact) {
    const updatedContact = await testUpdateContact(createdContact._id);
  }

  // Test delete contact
  if (createdContact) {
    await testDeleteContact(createdContact._id);
  }

  success('\nAll tests completed!');
}

// Run all tests
runAllTests();
