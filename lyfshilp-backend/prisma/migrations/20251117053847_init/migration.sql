-- CreateTable
CREATE TABLE "public"."Contactus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "exam" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "studentClass" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "pageName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contactus_pkey" PRIMARY KEY ("id")
);
