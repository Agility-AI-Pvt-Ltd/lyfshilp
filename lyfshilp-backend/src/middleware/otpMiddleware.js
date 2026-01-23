import prisma from '../prismaClient.js';

export const validateOtpSession = async (req, res, next) => {
    try {
        const token = req.headers['x-otp-session-token'];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Session token missing. Please verify phone number.',
            });
        }

        const session = await prisma.otpSession.findUnique({
            where: { token },
        });

        if (!session) {
            return res.status(401).json({
                success: false,
                message: 'Invalid session.',
            });
        }

        if (new Date() > session.expiresAt) {
            // Clean up expired session
            await prisma.otpSession.delete({ where: { token } });
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please verify phone again.',
            });
        }

        // Attach phone to request for downstream use
        req.userPhone = session.phone;

        // Optional: Update VerifiedPhone activity
        // Fire and forget (don't await to avoid blocking)
        prisma.verifiedPhone.update({
            where: { phoneNumber: session.phone },
            data: { lastActivityAt: new Date() }
        }).catch(err => console.error('Failed to update activity:', err));

        next();
    } catch (error) {
        console.error('Session validation error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during session validation.',
        });
    }
};
