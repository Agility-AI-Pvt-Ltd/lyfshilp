-- CreateTable
CREATE TABLE "public"."PartnerSchoolForm" (
    "id" SERIAL NOT NULL,
    "schoolName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PartnerSchoolForm_pkey" PRIMARY KEY ("id")
);
