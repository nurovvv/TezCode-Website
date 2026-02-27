import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";

interface Props {
  params: { courseId: string };
}

export default async function CourseOverviewPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const [user, course] = await Promise.all([
    prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        progress: true
      }
    }),
    prisma.course.findUnique({
      where: { id: params.courseId },
      include: {
        chapters: {
          orderBy: { order: "asc" },
          include: {
            sections: {
              orderBy: { order: "asc" },
              include: { activities: true }
            }
          }
        },
        instructor: true
      }
    })
  ]);

  if (!user || !course) return null;

  const allSections = course.chapters.flatMap(ch => ch.sections);
  const sectionProgressMap = new Map(
    user.progress
      .filter(p => allSections.some(s => s.id === p.sectionId))
      .map(p => [p.sectionId, p])
  );

  const completedCount = allSections.filter(s => sectionProgressMap.get(s.id)?.completed)
    .length;
  const percent =
    allSections.length === 0 ? 0 : Math.round((completedCount / allSections.length) * 100);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-6 rounded-card bg-white p-6 shadow-card md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <Badge className="bg-light text-black text-[11px]">{course.subject}</Badge>
          <h1 className="text-2xl font-semibold tracking-tight text-black">
            {course.title}
          </h1>
          <p className="text-sm text-black/60">
            {course.description ??
              "Interactive readings with built-in activities, auto-graded participation, and a rich gradebook."}
          </p>
          <p className="text-xs text-black/55">
            Taught by <span className="font-medium">{course.instructor.name}</span>
          </p>
        </div>
        <div className="w-full max-w-xs space-y-3 rounded-card border border-black/10 bg-light p-4">
          <div className="flex items-center justify-between text-xs text-black/60">
            <span>Course progress</span>
            <span>{percent}%</span>
          </div>
          <Progress value={percent} />
          <div className="flex items-center justify-between text-xs text-black/60">
            <span>Completed sections</span>
            <span>
              {completedCount}/{allSections.length}
            </span>
          </div>
          <Link
            href={
              allSections[0]
                ? `/courses/${course.id}/${allSections[0].chapterId}/${allSections[0].id}`
                : "#"
            }
            className="mt-2 inline-flex w-full justify-center rounded-btn bg-black px-3 py-1.5 text-xs font-semibold text-white"
          >
            Continue reading
          </Link>
        </div>
      </section>

      <section className="space-y-4 rounded-card bg-light p-6">
        <h2 className="text-sm font-semibold text-black">Table of contents</h2>
        <div className="space-y-4">
          {course.chapters.map(chapter => {
            const chapterSections = chapter.sections;
            const completedInChapter = chapterSections.filter(
              s => sectionProgressMap.get(s.id)?.completed
            ).length;

            return (
              <Card key={chapter.id} className="overflow-hidden border border-black/10">
                <button className="flex w-full items-center justify-between bg-white px  -4 py-3 text-left">
                  <div>
                    <div className="text-sm font-semibold text-black">
                      {chapter.title}
                    </div>
                    <div className="text-xs text-black/55">
                      {completedInChapter}/{chapter.sections.length} sections
                    </div>
                  </div>
                </button>
                <div className="divide-y divide-black/5 bg-light">
                  {chapter.sections.map(section => {
                    const progress = sectionProgressMap.get(section.id);
                    const completed = progress?.completed ?? false;
                    const score = progress?.score ?? 0;
                    const maxScore = section.activities.length;

                    return (
                      <Link
                        key={section.id}
                        href={`/courses/${course.id}/${chapter.id}/${section.id}`}
                        className="flex items-center justify-between px-4 py-2 text-sm text-black hover:bg-white"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-black/40">
                            {completed ? (
                              <span className="text-[11px] text-black">✓</span>
                            ) : null}
                          </div>
                          <div>
                            <div className="text-sm">{section.title}</div>
                            <div className="text-xs text-black/55">
                              {maxScore ? `${score}/${maxScore} pts` : "0 pts"}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-black/50">Open section →</div>
                      </Link>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}

