import { PrismaClient, ActivityType, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.activitySubmission.deleteMany();
  await prisma.sectionProgress.deleteMany();
  await prisma.enrollment.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.section.deleteMany();
  await prisma.chapter.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Instructors
  const instructors = await prisma.user.createMany({
    data: [
      { email: "instructor1@tezcode.test", name: "Instructor One", role: Role.INSTRUCTOR },
      { email: "instructor2@tezcode.test", name: "Instructor Two", role: Role.INSTRUCTOR }
    ]
  });

  const allInstructors = await prisma.user.findMany({
    where: { role: Role.INSTRUCTOR },
    orderBy: { email: "asc" }
  });

  // Students
  const students: { email: string; name: string }[] = Array.from({ length: 10 }).map((_, i) => ({
    email: `student${i + 1}@tezcode.test`,
    name: `Student ${i + 1}`
  }));

  await prisma.user.createMany({
    data: students.map(s => ({ ...s, role: Role.STUDENT }))
  });

  const allStudents = await prisma.user.findMany({
    where: { role: Role.STUDENT },
    orderBy: { email: "asc" }
  });

  // Helper for content & activities
  const makeContent = (title: string, index: number) => ({
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: title }]
      },
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: `This is an interactive TezCode section (${index}). Concepts are explained briefly, followed by activities.`
          }
        ]
      }
    ]
  });

  const makeActivities = (sectionIndex: number) => {
    const baseOrder = sectionIndex * 10;
    return [
      {
        type: ActivityType.MULTIPLE_CHOICE,
        order: baseOrder + 1,
        configJson: {
          prompt: "Which statement about interactive learning is true?",
          options: [
            { id: "a", text: "Passive reading is enough to master CS.", correct: false },
            { id: "b", text: "Practice with feedback accelerates learning.", correct: true },
            { id: "c", text: "Only lectures matter.", correct: false }
          ],
          explanation: "Frequent, low-stakes practice with feedback improves retention."
        }
      },
      {
        type: ActivityType.FILL_IN_BLANK,
        order: baseOrder + 2,
        configJson: {
          prompt: "TezCode replaces passive reading with ____ activities.",
          blanks: ["interactive"]
        }
      },
      {
        type: ActivityType.SHORT_ANSWER,
        order: baseOrder + 3,
        configJson: {
          prompt: "In your own words, why is instant feedback helpful?",
          sampleAnswer:
            "It helps correct misconceptions immediately so they do not become habits."
        }
      },
      {
        type: ActivityType.CODING,
        order: baseOrder + 4,
        configJson: {
          prompt: "Write a function sum_to_n(n) that returns 1 + 2 + ... + n.",
          language: "python",
          starterCode: "def sum_to_n(n):\n    # TODO: implement\n    pass",
          tests: [
            { input: 3, expected: 6 },
            { input: 5, expected: 15 }
          ]
        }
      },
      {
        type: ActivityType.PARTICIPATION,
        order: baseOrder + 5,
        configJson: {
          prompt: "Click to reveal a quick tip about practicing every day.",
          answer: "Consistent, small sessions beat cramming. Aim for frequent practice."
        }
      }
    ];
  };

  // Courses specification
  const coursesSpec = [
    {
      title: "Introduction to Python",
      subject: "Python",
      slug: "intro-to-python",
      chapters: 5,
      sectionsPerChapter: 4
    },
    {
      title: "Data Structures & Algorithms",
      subject: "Data Structures & Algorithms",
      slug: "data-structures-algorithms",
      chapters: 6,
      sectionsPerChapter: 5
    },
    {
      title: "Web Development Fundamentals",
      subject: "Web Development",
      slug: "web-development-fundamentals",
      chapters: 4,
      sectionsPerChapter: 4
    }
  ] as const;

  const createdCourses = [];

  for (let i = 0; i < coursesSpec.length; i++) {
    const spec = coursesSpec[i];
    const instructor = allInstructors[i % allInstructors.length];

    const course = await prisma.course.create({
      data: {
        title: spec.title,
        subject: spec.subject,
        slug: spec.slug,
        description: `${spec.title} on TezCode with fully interactive readings and activities.`,
        instructorId: instructor.id,
        published: true
      }
    });

    for (let c = 0; c < spec.chapters; c++) {
      const chapter = await prisma.chapter.create({
        data: {
          title: `Chapter ${c + 1}`,
          order: c + 1,
          courseId: course.id
        }
      });

      for (let s = 0; s < spec.sectionsPerChapter; s++) {
        const sectionIndex = c * spec.sectionsPerChapter + s + 1;
        const section = await prisma.section.create({
          data: {
            title: `Section ${c + 1}.${s + 1}`,
            order: s + 1,
            chapterId: chapter.id,
            contentJson: makeContent(`Section ${c + 1}.${s + 1}`, sectionIndex)
          }
        });

        const activities = makeActivities(sectionIndex);
        for (const [idx, act] of activities.entries()) {
          await prisma.activity.create({
            data: {
              type: act.type,
              order: idx + 1,
              sectionId: section.id,
              configJson: act.configJson,
              maxPoints: 1
            }
          });
        }
      }
    }

    createdCourses.push(course);
  }

  // Enroll each student in at least 2 courses with random progress
  for (const student of allStudents) {
    const shuffledCourses = [...createdCourses].sort(() => Math.random() - 0.5);
    const enrolledCourses = shuffledCourses.slice(0, 2);

    for (const course of enrolledCourses) {
      await prisma.enrollment.create({
        data: {
          userId: student.id,
          courseId: course.id
        }
      });

      // Random progress: mark some sections as viewed/completed
      const sections = await prisma.section.findMany({
        where: { chapter: { courseId: course.id } },
        include: { activities: true }
      });

      const sampledSections = sections.filter(() => Math.random() < 0.4);

      for (const section of sampledSections) {
        const completed = Math.random() < 0.6;
        const score = completed ? Math.random() * section.activities.length : 0;

        await prisma.sectionProgress.upsert({
          create: {
            userId: student.id,
            sectionId: section.id,
            completed,
            score
          },
          update: {
            completed,
            score
          },
          where: {
            userId_sectionId: {
              userId: student.id,
              sectionId: section.id
            }
          }
        });

        // Create some submissions per activity
        for (const activity of section.activities) {
          if (Math.random() < 0.6) {
            const earned = completed ? 1 : Math.random() < 0.5 ? 1 : 0;
            await prisma.activitySubmission.create({
              data: {
                userId: student.id,
                activityId: activity.id,
                answerJson: { seeded: true },
                score: earned,
                maxScore: activity.maxPoints,
                attempt: 1
              }
            });
          }
        }
      }
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

