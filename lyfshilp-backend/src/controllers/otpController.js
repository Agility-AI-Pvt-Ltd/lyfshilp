import { generateOtp, storeOtp, verifyOtpService } from '../services/otpService.js';

export const sendOtpController = async (req, res) => {
    console.log(`[API] Received Send OTP Request:`, req.body);

    try {
        const { phone } = req.body;

        // VALIDATION: Return 400 for invalid input
        if (!phone || !/^[6-9]\d{9}$/.test(phone)) {
            return res.status(400).json({
                success: false,
                message: 'Valid 10-digit phone number using the 6-9 format required'
            });
        }

        const otp = generateOtp();

        // Call service (now returns structured response)
        const result = await storeOtp(phone, otp);

        // Development Fallback: Log OTP
        if (process.env.NODE_ENV !== 'production') {
            console.log("[DEV OTP]", phone, otp);
        }

        // Handle service errors
        if (!result.success) {
            // DB_ERROR: Database unreachable (only valid 500 case)
            if (result.error === 'DB_ERROR') {
                return res.status(500).json({
                    success: false,
                    message: 'Database temporarily unavailable. Please try again later.',
                    devOtp: process.env.DEV_OTP_MODE === 'true' ? otp : undefined
                });
            }

            // UNKNOWN_ERROR: Unexpected failure (treat as 500)
            return res.status(500).json({
                success: false,
                message: 'An unexpected error occurred. Please try again.',
                devOtp: process.env.DEV_OTP_MODE === 'true' ? otp : undefined
            });
        }

        // SMS Provider Failure: Return 502 Bad Gateway
        if (!result.smsSent) {
            return res.status(502).json({
                success: false,
                message: 'Failed to send OTP via SMS provider. Please check the number or try again later.',
                // CRITICAL: Return OTP in DEV mode to unblock frontend
                devOtp: process.env.DEV_OTP_MODE === 'true' ? otp : undefined
            });
        }

        // SUCCESS: OTP stored and SMS sent
        console.log(`[OTP] Generated and sent for ${phone}`);

        res.json({
            success: true,
            message: 'OTP sent successfully',
            // Include OTP in response ONLY if DEV_OTP_MODE is explicitly true
            devOtp: process.env.DEV_OTP_MODE === 'true' ? otp : undefined
        });

    } catch (error) {
        // CRITICAL: This should NEVER be reached if service layer is properly hardened
        // But we keep it as a final safety net
        console.error('[OTP Controller] Unexpected error in sendOtpController:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP',
            devOtp: process.env.DEV_OTP_MODE === 'true' ? generateOtp() : undefined
        });
    }
};

export const verifyOtpController = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        // VALIDATION: Return 400 for missing inputs
        if (!phone || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Phone and OTP are required'
            });
        }

        const result = await verifyOtpService(phone, otp);

        // Handle service errors
        if (!result.success) {
            // DB_ERROR: Database unreachable (only valid 500 case)
            if (result.error === 'DB_ERROR') {
                return res.status(500).json({
                    success: false,
                    message: result.message || 'Database temporarily unavailable.'
                });
            }

            // VALIDATION ERRORS: Invalid/expired OTP (400)
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        // SUCCESS: OTP verified, session created
        res.json({
            success: true,
            message: 'Phone verified successfully',
            token: result.token,
        });

    } catch (error) {
        // CRITICAL: This should NEVER be reached if service layer is properly hardened
        console.error('[OTP Controller] Unexpected error in verifyOtpController:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to verify OTP'
        });
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
