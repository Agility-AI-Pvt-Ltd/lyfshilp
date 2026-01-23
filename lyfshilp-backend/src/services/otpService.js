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
 * @returns {Promise<boolean>} true if SMS sent successfully
 */
export const storeOtp = async (phone, otp) => {
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

  // 1. Upsert OTP record
  await prisma.otpRecord.upsert({
    where: { phone },
    update: { otp, expiresAt, createdAt: new Date() },
    create: { phone, otp, expiresAt },
  });

  // 2. Send SMS
  // In VERY strict environments, you might want to only store if SMS succeeds.
  // But usually, storing first is fine to prevent rapid-fire API calls if they retry.
  const smsSent = await sendSms(phone, otp);

  return smsSent;
};

/**
 * Verify OTP and create session
 */
export const verifyOtpService = async (phone, inputOtp) => {
  const record = await prisma.otpRecord.findUnique({
    where: { phone },
  });

  if (!record) {
    return { success: false, message: 'OTP not found or expired.' };
  }

  if (record.otp !== inputOtp) {
    return { success: false, message: 'Invalid OTP.' };
  }

  if (new Date() > record.expiresAt) {
    await prisma.otpRecord.delete({ where: { phone } });
    return { success: false, message: 'OTP expired.' };
  }

  // OTP Valid -> Clean up
  await prisma.otpRecord.delete({ where: { phone } });

  // 1. Update/Create VerifiedPhone registry
  // Check if already exists to avoid unique constraint error just in case, though upsert handles it.
  // Requirement: Store ONLY if first time.
  const existingVerified = await prisma.verifiedPhone.findUnique({
    where: { phoneNumber: phone },
  });

  if (!existingVerified) {
    await prisma.verifiedPhone.create({
      data: { phoneNumber: phone },
    });
  } else {
    // Optional: Update last activity if you want to track it
    await prisma.verifiedPhone.update({
      where: { phoneNumber: phone },
      data: { lastActivityAt: new Date() },
    });
  }

  // 2. Create Session
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
};
