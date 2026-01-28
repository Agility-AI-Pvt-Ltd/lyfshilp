import prisma from '../prismaClient.js';
import crypto from 'crypto';

/**
 * Generate a 6-digit OTP
 */
export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Store OTP in database (replaces old record if exists)
 */
import { sendSms } from './smsService.js';

/**
 * Store OTP in database AND send via SMS
 * @returns {Promise<{success: boolean, smsSent?: boolean, error?: string}>}
 */
export const storeOtp = async (phone, otp) => {
  try {
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // 1. Upsert OTP record (wrapped to catch DB errors)
    try {
      await prisma.otpRecord.upsert({
        where: { phone },
        update: { otp, expiresAt, createdAt: new Date() },
        create: { phone, otp, expiresAt },
      });
    } catch (dbError) {
      console.error('[OTP Service] Database error during OTP storage:', dbError);
      return { success: false, error: 'DB_ERROR' };
    }

    // 2. Send SMS (already wrapped internally, returns boolean)
    const smsSent = await sendSms(phone, otp);

    return { success: true, smsSent };
  } catch (error) {
    console.error('[OTP Service] Unexpected error in storeOtp:', error);
    return { success: false, error: 'UNKNOWN_ERROR' };
  }
};

/**
 * Verify OTP and create session
 * @returns {Promise<{success: boolean, token?: string, message?: string, error?: string}>}
 */
export const verifyOtpService = async (phone, inputOtp) => {
  try {
    // 1. Fetch OTP record
    let record;
    try {
      record = await prisma.otpRecord.findUnique({
        where: { phone },
      });
    } catch (dbError) {
      console.error('[OTP Service] Database error during OTP lookup:', dbError);
      return { success: false, error: 'DB_ERROR', message: 'Database temporarily unavailable. Please try again.' };
    }

    if (!record) {
      return { success: false, message: 'OTP not found or expired.' };
    }

    if (record.otp !== inputOtp) {
      return { success: false, message: 'Invalid OTP.' };
    }

    if (new Date() > record.expiresAt) {
      // Clean up expired OTP (safe delete)
      await prisma.otpRecord.delete({ where: { phone } }).catch(err =>
        console.error('[OTP Service] Failed to delete expired OTP:', err)
      );
      return { success: false, message: 'OTP expired.' };
    }

    // 2. OTP Valid -> Clean up
    try {
      await prisma.otpRecord.delete({ where: { phone } });
    } catch (err) {
      console.error('[OTP Service] Failed to delete OTP after verification:', err);
      // Non-fatal, continue
    }

    // 3. Update/Create VerifiedPhone registry
    try {
      const existingVerified = await prisma.verifiedPhone.findUnique({
        where: { phoneNumber: phone },
      });

      if (!existingVerified) {
        await prisma.verifiedPhone.create({
          data: { phoneNumber: phone },
        });
      } else {
        await prisma.verifiedPhone.update({
          where: { phoneNumber: phone },
          data: { lastActivityAt: new Date() },
        });
      }
    } catch (dbError) {
      console.error('[OTP Service] Database error during VerifiedPhone update:', dbError);
      return { success: false, error: 'DB_ERROR', message: 'Failed to update verification status.' };
    }

    // 4. Create Session
    try {
      const token = crypto.randomUUID();
      const sessionExpiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.otpSession.create({
        data: {
          token,
          phone,
          expiresAt: sessionExpiresAt,
        },
      });

      return { success: true, token };
    } catch (dbError) {
      console.error('[OTP Service] Database error during session creation:', dbError);
      return { success: false, error: 'DB_ERROR', message: 'Failed to create session.' };
    }
  } catch (error) {
    console.error('[OTP Service] Unexpected error in verifyOtpService:', error);
    return { success: false, error: 'UNKNOWN_ERROR', message: 'An unexpected error occurred.' };
  }
};
