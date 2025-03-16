import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendOTP = async (phoneNumber) => {
  try {
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    
    // Send SMS using Twilio
    await client.messages.create({
      body: `Your Ginni's Cafe verification code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    return otp;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};