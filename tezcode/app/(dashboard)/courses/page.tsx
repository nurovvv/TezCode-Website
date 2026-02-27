import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              chapters: { include: { sections: true } }
            }
          }
        }
      },
      progress: true
    }
  });

  if (!user) return null;

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-black">My Courses</h1>
        <p className="text-sm text-black/60">
          Enrolled interactive textbooks with readings, activities, and gradebook integration.
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        {user.enrollments.map(enrollment => {
          const courseSections =
            enrollment.course.chapters.flatMap(ch => ch.sections) ?? [];
          const courseSectionIds = new Set(courseSections.map(s => s.id));
          const courseProgress = user.progress.filter(p =>
            courseSectionIds.has(p.sectionId)
          );
          const completed = courseProgress.filter(p => p.completed).length;
          const percent =
            courseSections.length === 0
              ? 0
              : Math.round((completed / courseSections.length) * 100);

          return (
            <Card key={enrollment.id} className="flex flex-col overflow-hidden p-4">
              <div className="mb-3 flex items-center justify-between text-xs text-black/55">
                <Badge className="bg-light text-black text-[11px]">
                  {enrollment.course.subject}
                </Badge>
                <span>
                  {completed}/{courseSections.length || 0} sections
                </span>
              </div>
              <h2 className="text-sm font-semibold text-black">
                {enrollment.course.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs text-black/60">
                {enrollment.course.description}
              </p>
              <div className="mt-4">
                <Progress value={percent} />
                <div className="mt-1 flex justify-between text-[11px] text-black/55">
                  <span>Progress</span>
                  <span>{percent}%</span>
                </div>
              </div>
              <Link
                href={`/courses/${enrollment.course.id}`}
                className="mt-4 inline-flex justify-center rounded-btn bg-black px-3 py-1.5 text-xs font-semibold text-white"
              >
                Go to course
              </Link>
            </Card>
          );
        })}

        {user.enrollments.length === 0 && (
          <Card className="flex items-center justify-center p-6 text-sm text-black/60">
            No courses yet. Your enrolled ZyBooks-style textbooks will appear here.
          </Card>
        )}
      </div>
    </div>
  );
}

