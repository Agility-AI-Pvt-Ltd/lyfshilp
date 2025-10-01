// prisma/seed.js
import dotenv from "dotenv";
dotenv.config();

import { hashPassword } from "../src/utils/hashUtil.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear tables (be careful in prod)
  await prisma.testSubmission.deleteMany().catch(() => {});
  await prisma.test.deleteMany().catch(() => {});
  await prisma.enrollment.deleteMany().catch(() => {});
  await prisma.externalLink.deleteMany().catch(() => {});
  await prisma.course.deleteMany().catch(() => {});
  await prisma.user.deleteMany().catch(() => {});

  // Create users
  const pwd = await hashPassword("password123");
  const alice = await prisma.user.create({
    data: { name: "Alice Student", email: "alice@example.com", password: pwd, role: "student" }
  });
  const bob = await prisma.user.create({
    data: { name: "Bob Instructor", email: "bob@example.com", password: pwd, role: "instructor" }
  });

  // Create courses
  const course1 = await prisma.course.create({
    data: {
      title: "Introduction to JavaScript",
      slug: "intro-to-javascript",
      description: "Learn JavaScript from basics to intermediate.",
      thumbnail: null,
      instructor: "Bob Instructor"
    }
  });

  const course2 = await prisma.course.create({
    data: {
      title: "React with Vite",
      slug: "react-with-vite",
      description: "Build fast React apps with Vite.",
      thumbnail: null,
      instructor: "Bob Instructor"
    }
  });

  // Create tests
  const test1 = await prisma.test.create({
    data: {
      courseId: course1.id,
      title: "JS Basics Quiz",
      maxScore: 100
    }
  });

  // Enrollment: Alice in course1
  await prisma.enrollment.create({
    data: { userId: alice.id, courseId: course1.id }
  });

  // Test submission sample
  await prisma.testSubmission.create({
    data: {
      testId: test1.id,
      userId: alice.id,
      answers: { q1: "a", q2: "b" },
      score: 80
    }
  });

  // External Links
  await prisma.externalLink.createMany({
    data: [
      { title: "Edumaniax", url: "https://edumaniax.example.com", logo: "" },
      { title: "Agility AI", url: "https://agilityai.example.com", logo: "" }
    ]
  });

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
