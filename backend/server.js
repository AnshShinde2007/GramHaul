// server.js
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import twilio from "twilio";

dotenv.config();
const app = express();
app.use(bodyParser.json());

// 🔐 your Twilio credentials
const accountSid = process.env.TWILIO_ACC_SID;
const authToken = process.env.TWILIO_ACC_TOKEN;
const phonenumber = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const otpStore = {}; // simple in-memory store

// 1️⃣ Send OTP
app.post("/send-otp", async (req, res) => {
  const { phone } = req.body;

  // 🧠 Defensive checks to prevent crashes
  if (!phone) {
    console.log("❌ Missing 'phone' field in request body:", req.body);
    return res.status(400).json({ success: false, error: "Missing phone number in request" });
  }

  if (typeof phone !== "string") {
    return res.status(400).json({ success: false, error: "Invalid phone format" });
  }

  if (!phone.startsWith("+")) {
    return res.status(400).json({ success: false, error: "Include country code (e.g. +91...)" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  try {
    await client.messages.create({
      body: `Your GramHaul OTP is ${otp}`,
      from: phonenumber,
      to: phone,
    });
    console.log(`✅ OTP sent to ${phone}: ${otp}`);
    res.json({ success: true, message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Twilio error:", err.message);
    res.json({ success: false, error: err.message });
  }
});

// 2️⃣ Verify OTP
app.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Phone and OTP required" });
  }

  if (otpStore[phone] && otpStore[phone] === otp) {
    delete otpStore[phone];
    return res.json({ success: true, message: "OTP verified successfully" });
  }

  res.json({ success: false, message: "Invalid or expired OTP" });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
