-- CreateTable
CREATE TABLE "public"."Podcast" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "videoType" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnail" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);
