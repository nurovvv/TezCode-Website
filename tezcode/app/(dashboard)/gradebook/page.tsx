import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

export default async function GradebookPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      progress: {
        include: {
          section: {
            include: {
              chapter: {
                include: { course: true }
              },
              activities: true
            }
          }
        }
      }
    }
  });

  if (!user) return null;

  const rows = user.progress.map(p => {
    const maxScore = p.section.activities.length;
    const status = p.completed ? "Complete" : p.score > 0 ? "In Progress" : "Not Started";
    return {
      id: p.id,
      chapter: p.section.chapter.title,
      section: p.section.title,
      course: p.section.chapter.course.title,
      score: `${Math.round(p.score)}/${maxScore}`,
      participation: p.completed ? "100%" : p.score > 0 ? "50%" : "0%",
      status
    };
  });

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-black">Gradebook</h1>
        <p className="text-sm text-black/60">
          View your scores, participation, and completion status across sections.
        </p>
      </header>

      <Card className="overflow-hidden border border-black/10 bg-white">
        <div className="flex items-center justify-between border-b border-black/10 px-4 py-3 text-xs text-black/60">
          <span>Section performance</span>
          <button className="rounded-btn border border-black/15 bg-light px-3 py-1 text-[11px] font-medium text-black/70 hover:border-black/40 hover:text-black">
            Export CSV
          </button>
        </div>
        <div className="max-h-[480px] overflow-auto text-xs">
          <table className="min-w-full border-collapse text-left">
            <thead className="bg-light text-black/60">
              <tr>
                <th className="border-b border-black/10 px-4 py-2 font-medium">Course</th>
                <th className="border-b border-black/10 px-4 py-2 font-medium">Chapter</th>
                <th className="border-b border-black/10 px-4 py-2 font-medium">Section</th>
                <th className="border-b border-black/10 px-4 py-2 font-medium">Score</th>
                <th className="border-b border-black/10 px-4 py-2 font-medium">
                  Participation
                </th>
                <th className="border-b border-black/10 px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-4 text-center text-xs text-black/60"
                  >
                    As you complete sections, your gradebook will appear here.
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <tr
                    key={row.id}
                    className={isEven ? "bg-white" : "bg-light"}
                  >
                    <td className="px-4 py-2 align-top">{row.course}</td>
                    <td className="px-4 py-2 align-top">{row.chapter}</td>
                    <td className="px-4 py-2 align-top">{row.section}</td>
                    <td className="px-4 py-2 align-top">{row.score}</td>
                    <td className="px-4 py-2 align-top">{row.participation}</td>
                    <td className="px-4 py-2 align-top">
                      <span
                        className={
                          row.status === "Complete"
                            ? "inline-flex rounded-pill bg-black px-2.5 py-0.5 text-[11px] font-medium text-white"
                            : row.status === "In Progress"
                            ? "inline-flex rounded-pill bg-light px-2.5 py-0.5 text-[11px] font-medium text-black"
                            : "text-black/45"
                        }
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

