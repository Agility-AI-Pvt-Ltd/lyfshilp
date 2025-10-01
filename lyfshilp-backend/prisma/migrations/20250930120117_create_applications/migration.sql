-- CreateTable
CREATE TABLE "public"."Application" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "about" TEXT,
    "resume_url" TEXT NOT NULL,
    "jobId" INTEGER,
    "job_title" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
