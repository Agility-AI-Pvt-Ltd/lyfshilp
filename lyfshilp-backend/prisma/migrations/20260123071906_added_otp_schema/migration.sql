-- CreateTable
CREATE TABLE "public"."VerifiedPhone" (
    "id" SERIAL NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "firstVerifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastActivityAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VerifiedPhone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OtpRecord" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OtpSession" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "VerifiedPhone_phoneNumber_key" ON "public"."VerifiedPhone"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "OtpRecord_phone_key" ON "public"."OtpRecord"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "OtpSession_token_key" ON "public"."OtpSession"("token");

-- CreateIndex
CREATE INDEX "OtpSession_token_idx" ON "public"."OtpSession"("token");
