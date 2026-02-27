import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";

interface Props {
  params: { courseId: string; chapterId: string; sectionId: string };
}

export default async function SectionReaderPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  });
  if (!user) return null;

  const section = await prisma.section.findUnique({
    where: { id: params.sectionId },
    include: {
      chapter: {
        include: {
          course: {
            include: {
              chapters: {
                orderBy: { order: "asc" },
                include: {
                  sections: {
                    orderBy: { order: "asc" }
                  }
                }
              }
            }
          }
        }
      },
      activities: {
        orderBy: { order: "asc" }
      },
      progress: {
        where: { userId: user.id }
      }
    }
  });

  if (!section) return null;

  const course = section.chapter.course;
  const chapters = course.chapters;
  const allSections = chapters.flatMap(ch => ch.sections);
  const flatIndex = allSections.findIndex(s => s.id === section.id);
  const prevSection = flatIndex > 0 ? allSections[flatIndex - 1] : null;
  const nextSection =
    flatIndex >= 0 && flatIndex < allSections.length - 1
      ? allSections[flatIndex + 1]
      : null;

  const completedActivities = 0;
  const totalActivities = section.activities.length;
  const sectionScore = 0;

  const breadcrumb = `${course.title} › ${section.chapter.title} › ${section.title}`;

  return (
    <div className="flex min-h-[calc(100vh-52px)] flex-col bg-light">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-6 py-3 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-black/60">
          <div className="truncate">{breadcrumb}</div>
          <div className="flex items-center gap-3">
            <span>
              Section {flatIndex + 1} of {allSections.length}
            </span>
            <div className="w-40">
              <Progress value={((flatIndex + 1) / allSections.length) * 100} />
            </div>
          </div>
        </div>
      </div>

      {/* Three column layout */}
      <div className="mx-auto flex w-full max-w-6xl flex-1 gap-6 px-6 py-6">
        {/* Left TOC */}
        <aside className="hidden w-60 flex-shrink-0 rounded-card border border-black/10 bg-white p-3 text-xs text-black/80 lg:block">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-black/55">
            Contents
          </div>
          <div className="space-y-2">
            {chapters.map(ch => (
              <div key={ch.id}>
                <div className="text-[11px] font-medium text-black/70">
                  {ch.title}
                </div>
                <div className="mt-1 space-y-1">
                  {ch.sections.map(s => {
                    const active = s.id === section.id;
                    return (
                      <Link
                        key={s.id}
                        href={`/courses/${course.id}/${ch.id}/${s.id}`}
                        className={`block rounded-btn px-2 py-1 text-[11px] ${
                          active
                            ? "border-l-2 border-black bg-light font-semibold text-black"
                            : "text-black/65 hover:bg-light"
                        }`}
                      >
                        {s.title}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Center content */}
        <main className="flex-1 space-y-4">
          {/* Placeholder for rich content; rendered from contentJson in future steps */}
          <Card className="p-5">
            <h1 className="mb-3 text-lg font-semibold text-black">{section.title}</h1>
            <p className="text-sm text-black/70">
              This section&apos;s rich TipTap content and inline activities will appear
              here. For now, this is a placeholder to scaffold the reader layout.
            </p>
          </Card>

          <Card className="p-5">
            <p className="text-sm text-black/70">
              Activities for this section (multiple choice, coding, drag and drop, and
              more) will render here in the exact ZyBooks-style flow.
            </p>
          </Card>
        </main>

        {/* Right summary */}
        <aside className="hidden w-56 flex-shrink-0 rounded-card border border-black/10 bg-white p-4 text-xs text-black/80 md:block">
          <div className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-black/55">
            Section summary
          </div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between">
              <span>Activities</span>
              <span>
                {completedActivities}/{totalActivities}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Section score</span>
              <span>
                {sectionScore}/{totalActivities}
              </span>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom navigation */}
      <div className="border-t border-black/10 bg-white px-6 py-3 text-xs text-black/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            {prevSection && (
              <Link
                href={`/courses/${course.id}/${prevSection.chapterId}/${prevSection.id}`}
                className="hover:underline"
              >
                ← Previous: {prevSection.title}
              </Link>
            )}
          </div>
          <div>
            {nextSection && (
              <Link
                href={`/courses/${course.id}/${nextSection.chapterId}/${nextSection.id}`}
                className="hover:underline"
              >
                Next: {nextSection.title} →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

