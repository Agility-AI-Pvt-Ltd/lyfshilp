import axios from 'axios';

const EDUMARC_API_URL = 'https://smsapi.edumarcsms.com/api/v1/sendsms';
const SENDER_ID = 'EDUMRC';
const TEMPLATE_ID = '1707168926925165526';

/**
 * Send SMS using Edumarc API
 * @param {string} phone - 10 digit phone number
 * @param {string} otp - The OTP to send
 * @returns {Promise<boolean>} true if successful, false otherwise
 */
export const sendSms = async (phone, otp) => {
    try {
        const apiKey = process.env.EDUMARC_API_KEY;

        console.log('[SMS] Preparing to send OTP...');

        if (!apiKey) {
            console.error('❌ CRITICAL: EDUMARC_API_KEY is missing in environment variables');
            return false;
        }

        // Exact DLT Template: "Your {#var#} OTP for verification is: {#var#}. OTP is confidential, refrain from sharing it with anyone. By Edumarc Technologies"
        const message = `Your Lyfshilp OTP for verification is: ${otp}. OTP is confidential, refrain from sharing it with anyone. By Edumarc Technologies`;

        // Payload strictly matching WORKING contract provided by user
        const payload = {
            number: [phone],        // MUST be Array
            message: message,
            senderId: SENDER_ID,    // camelCase
            templateId: TEMPLATE_ID // camelCase
        };

        const headers = {
            'Content-Type': 'application/json',
            'apikey': apiKey.trim() // API Key in HEADER
        };

        // Log the final request details (carefully masking sensitive data)
        console.log('[SMS] Sending request to Edumarc:', {
            url: EDUMARC_API_URL,
            headers: { ...headers, apikey: '***HIDDEN***' },
            body: { ...payload, message: '***HIDDEN OTP***' }
        });

        const response = await axios.post(EDUMARC_API_URL, payload, { headers });

        // Log SUCCESS
        console.log(`📨 SMS API Response for ${phone.slice(-4)}:`, response.status, response.data);

        // Edumarc v1 usually returns 200 or 201 on success
        if (response.status === 200 || response.status === 201) {
            return true;
        } else {
            console.error('❌ SMS API returned non-200 status:', response.status);
            return false;
        }

    } catch (error) {
        // Detailed error logging for debugging 401/500 issues
        console.error('❌ SMS Sending Failed:', error.message);
        if (error.response) {
            console.error('❌ Full API Error Response Data:', JSON.stringify(error.response.data, null, 2));
            console.error('❌ API Error Status:', error.response.status);
        } else if (error.request) {
            console.error('❌ No response received from SMS API (Network/Timeout)');
        }
        return false;
    }
};
