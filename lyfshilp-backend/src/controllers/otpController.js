import { generateOtp, storeOtp, verifyOtpService } from '../services/otpService.js';

export const sendOtpController = async (req, res) => {
    try {
        const { phone } = req.body;
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            return res.status(400).json({ success: false, message: 'Valid 10-digit phone number using the 6-9 format required' });
        }

        const otp = generateOtp();
        // In production, send via SMS (e.g. Twilio/MSG91)
        // For now, we store it and (optionally) return it in dev mode if needed, 
        // ensuring we follow the requirement to NOT expose it in prod if possible, 
        // but the previous code returned it in dev. I'll stick to that pattern.

        const smsSent = await storeOtp(phone, otp);

        // Development Fallback: Log OTP
        if (process.env.NODE_ENV !== 'production') {
            console.log("[DEV OTP]", phone, otp);
        }

        if (!smsSent) {
            // 502 Bad Gateway - Upstream SMS provider failed (Refused connection or non-200)
            return res.status(502).json({
                success: false,
                message: 'Failed to send OTP via SMS provider. Please check the number or try again later.'
            });
        }

        console.log(`[OTP] Generated for ${phone}`); // Production safe log

        res.json({
            success: true,
            message: 'OTP sent successfully',
            // Include OTP in response ONLY if DEV_OTP_MODE is explicitly true
            devOtp: process.env.DEV_OTP_MODE === 'true' ? otp : undefined
        });

    } catch (error) {
        console.error('Send OTP Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send OTP' });
    }
};

export const verifyOtpController = async (req, res) => {
    try {
        const { phone, otp } = req.body;
        if (!phone || !otp) {
            return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
        }

        const result = await verifyOtpService(phone, otp);

        if (!result.success) {
            return res.status(400).json(result);
        }

        res.json({
            success: true,
            message: 'Phone verified successfully',
            token: result.token, // Send session token to client
        });

    } catch (error) {
        console.error('Verify OTP Error:', error);
        res.status(500).json({ success: false, message: 'Failed to verify OTP' });
    }
};

import prisma from '../prismaClient.js';

/**
 * GET /api/career-guidance/verified-numbers
 * Get all verified phone numbers (ADMIN ONLY)
 */
export const getAllVerifiedNumbers = async (req, res) => {
    try {
        const verifiedNumbers = await prisma.verifiedPhone.findMany({
            orderBy: { firstVerifiedAt: 'desc' }
        });

        res.json({
            success: true,
            data: verifiedNumbers
        });
    } catch (error) {
        console.error('Get Verified Numbers Error:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch verified numbers' });
    }
};
