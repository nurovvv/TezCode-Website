import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      enrollments: {
        include: {
          course: {
            include: {
              chapters: {
                include: { sections: true }
              }
            }
          }
        }
      },
      progress: {
        include: {
          section: {
            include: {
              chapter: {
                include: { course: true }
              }
            }
          }
        }
      }
    }
  });

  if (!user) {
    return null;
  }

  const totalSections = user.progress.length;
  const completedSections = user.progress.filter(p => p.completed).length;
  const participationPercent = totalSections === 0 ? 0 : Math.round((completedSections / totalSections) * 100);

  const recentProgress = [...user.progress]
    .sort((a, b) => (b.lastViewed?.getTime?.() ?? 0) - (a.lastViewed?.getTime?.() ?? 0))
    .slice(0, 5);

  return (
    <div className="space-y-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight text-black">
          Good morning{user.name ? `, ${user.name}` : ""}.
        </h1>
        <p className="text-sm text-black/60">
          Continue where you left off, track participation, and see your progress across courses.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <div className="text-xs font-medium text-black/55">Courses enrolled</div>
          <div className="mt-3 text-2xl font-semibold text-black">{user.enrollments.length}</div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-medium text-black/55">Participation</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="text-2xl font-semibold text-black">{participationPercent}%</div>
          </div>
        </Card>
        <Card className="p-5">
          <div className="text-xs font-medium text-black/55">Completed sections</div>
          <div className="mt-3 text-2xl font-semibold text-black">
            {completedSections}
            <span className="text-sm font-normal text-black/50"> / {totalSections || "–"}</span>
          </div>
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-black">My Courses</h2>
          <Link href="/courses" className="text-xs text-black/60 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {user.enrollments.map(enrollment => {
            const courseSections =
              enrollment.course.chapters.flatMap(ch => ch.sections) ?? [];
            const courseSectionIds = new Set(courseSections.map(s => s.id));
            const courseProgress = user.progress.filter(p =>
              courseSectionIds.has(p.sectionId)
            );
            const courseCompleted = courseProgress.filter(p => p.completed).length;
            const coursePercent =
              courseSections.length === 0
                ? 0
                : Math.round((courseCompleted / courseSections.length) * 100);

            return (
              <Card key={enrollment.id} className="flex flex-col overflow-hidden p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-black/55">
                  <Badge className="bg-light text-black text-[11px]">
                    {enrollment.course.subject}
                  </Badge>
                  <span>
                    {courseCompleted}/{courseSections.length || 0} sections
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-black">
                  {enrollment.course.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-black/60">
                  {enrollment.course.description}
                </p>
                <div className="mt-4">
                  <Progress value={coursePercent} />
                  <div className="mt-1 flex justify-between text-[11px] text-black/55">
                    <span>Progress</span>
                    <span>{coursePercent}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${enrollment.course.id}`}
                  className="mt-4 inline-flex justify-center rounded-btn bg-black px-3 py-1.5 text-xs font-semibold text-white"
                >
                  Continue
                </Link>
              </Card>
            );
          })}
          {user.enrollments.length === 0 && (
            <Card className="flex items-center justify-center p-6 text-sm text-black/60">
              You&apos;re not enrolled in any courses yet.
            </Card>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-black">Recent activity</h2>
        <Card className="divide-y divide-black/5 bg-white">
          {recentProgress.length === 0 && (
            <div className="px-4 py-3 text-sm text-black/60">
              As you complete activities, your recent progress will appear here.
            </div>
          )}
          {recentProgress.map(item => (
            <div key={item.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <div>
                <div className="font-medium text-black">
                  {item.section.chapter.course.title} · {item.section.title}
                </div>
                <div className="text-xs text-black/55">
                  Score {Math.round(item.score)} pts ·{" "}
                  {item.completed ? "Section completed" : "In progress"}
                </div>
              </div>
            </div>
          ))}
        </Card>
      </section>
    </div>
  );
}

