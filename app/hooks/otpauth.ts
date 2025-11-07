const BASE_URL = "http://192.168.1.104:5000"; // 👈 your backend

export interface OtpResponse {
  success: boolean;
  message?: string;
  sessionId?: string;
  error?: string;
}

/**
 * Send OTP to a phone number.
 * @param phone - Phone number with country code (e.g. +919137998751)
 */
export const sendOtp = async (phone: string): Promise<OtpResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return { success: false, error: "Network error" };
  }
};

/**
 * Verify OTP against the sessionId.
 * @param phone - Same phone number used to send the OTP
 * @param otp - The OTP entered by the user
 */
export const verifyOtp = async (phone: string, otp: string): Promise<OtpResponse> => {
  try {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: "Network error" };
  }
};
