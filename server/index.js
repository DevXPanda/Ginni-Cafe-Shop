import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sendOTP } from './services/twilio.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/api/auth/request-otp', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    // Send OTP
    const otp = await sendOTP(phone);
    
    // In a real app, store the OTP in a database with expiry time
    // For demo, we'll store it in memory (not recommended for production)
    otpStore.set(phone, {
      otp,
      expiry: Date.now() + 10 * 60 * 1000 // 10 minutes expiry
    });
    
    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
});

app.post('/api/auth/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;
    
    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone number and OTP are required' });
    }
    
    // Get stored OTP
    const storedData = otpStore.get(phone);
    
    if (!storedData) {
      return res.status(400).json({ message: 'OTP expired or not found' });
    }
    
    if (Date.now() > storedData.expiry) {
      otpStore.delete(phone);
      return res.status(400).json({ message: 'OTP expired' });
    }
    
    if (storedData.otp !== parseInt(otp)) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Clear OTP after successful verification
    otpStore.delete(phone);
    
    // In a real app, create/update user in database and generate JWT
    res.status(200).json({ 
      message: 'OTP verified successfully',
      // Add user data and token here
    });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
});

// Simple in-memory store for OTPs (use Redis or similar in production)
const otpStore = new Map();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});