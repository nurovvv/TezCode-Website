import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { BookOpen, Code2, LineChart, Cpu, Database, Network, Boxes, Layers, TerminalSquare, Sigma } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-light text-black">
      <Navbar />

      {/* Hero */}
      <main className="bg-light">
        <section className="border-b border-black/10 bg-light">
          <div className="mx-auto flex max-w-6xl flex-col gap-14 px-6 pb-24 pt-20 md:flex-row md:items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center rounded-pill bg-white px-3 py-1 text-xs font-medium text-black/60">
                Interactive CS textbooks, reimagined
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-[64px] md:leading-tight">
                Learn CS by Doing
              </h1>
              <p className="max-w-xl text-lg text-black/60">
                Interactive textbooks that replace passive reading with
                hands-on exercises, instant feedback, and real code.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <Link href="/signup">Start Learning</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/for-instructors">For Instructors</Link>
                </Button>
              </div>
            </div>
            <div className="mt-10 flex-1 md:mt-0">
              <Card className="overflow-hidden border-black/10 bg-white">
                <div className="border-b border-black/10 bg-light px-5 py-3 text-xs font-medium text-black/60">
                  Section 2.3 · Arrays and Loops
                </div>
                <div className="space-y-4 px-5 py-4 text-sm">
                  <p className="text-black/80">
                    In TezCode, every concept is paired with an activity. Read a
                    short explanation, then immediately check your understanding.
                  </p>
                  <div className="rounded-card border border-black/10 bg-white p-3">
                    <p className="mb-3 text-sm font-semibold">
                      Which loop visits every element in an array exactly once?
                    </p>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between rounded-btn border border-black/15 bg-light px-3 py-2">
                        <span>for (let i = 0; i &lt; arr.length; i++)</span>
                        <span className="text-base">✅</span>
                      </div>
                      <div className="rounded-btn border border-black/10 px-3 py-2 text-black/60">
                        while (true)
                      </div>
                      <div className="rounded-btn border border-black/10 px-3 py-2 text-black/60">
                        for (const key in arr)
                      </div>
                    </div>
                    <div className="mt-3 rounded-card bg-light px-3 py-2 text-xs text-black/60">
                      ✅ <span className="font-semibold text-black">Correct! +1 participation point.</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats strip */}
        <section className="border-y border-black/10 bg-white">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 px-6 py-8 text-center md:grid-cols-3">
            <div>
              <div className="text-2xl font-semibold">500K+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-black/55">
                Students
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold">200+</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-black/55">
                Courses
              </div>
            </div>
            <div>
              <div className="text-2xl font-semibold">98%</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-black/55">
                Completion rate
              </div>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className="bg-light py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-2xl font-semibold tracking-tight text-black">
              Explore Subjects
            </h2>
            <p className="mt-2 text-center text-sm text-black/55">
              From intro programming to upper-division CS, all in one place.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
              {[
                { label: "Python", icon: BookOpen },
                { label: "Java", icon: TerminalSquare },
                { label: "C++", icon: Cpu },
                { label: "Data Structures", icon: Boxes },
                { label: "Algorithms", icon: Layers },
                { label: "Web Dev", icon: Code2 },
                { label: "Discrete Math", icon: Sigma },
                { label: "Operating Systems", icon: Network },
                { label: "Database Systems", icon: Database },
                { label: "Computer Architecture", icon: Cpu }
              ].map((s, i) => (
                <Card
                  key={s.label}
                  className="flex cursor-default flex-col gap-3 border-black/10 bg-white p-4 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <div className="flex items-center justify-between">
                    <s.icon className="h-5 w-5 text-black" />
                    <Badge>~{i < 5 ? 24 : 12} courses</Badge>
                  </div>
                  <div className="text-sm font-semibold text-black">{s.label}</div>
                  <p className="text-xs text-black/55">
                    Interactive readings, auto-graded activities, and rich practice.
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">
              How TezCode works
            </h2>
            <div className="grid gap-10 md:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Enroll in a course",
                  body: "Join a class or self-enroll with an access code in seconds."
                },
                {
                  step: "02",
                  title: "Read + complete activities",
                  body: "Short concept bites followed by interactive questions and coding tasks."
                },
                {
                  step: "03",
                  title: "Track your progress",
                  body: "See scores, participation, and completion at a glance."
                }
              ].map(item => (
                <div key={item.step} className="space-y-4">
                  <div className="text-5xl font-extrabold leading-none text-black/8">
                    {item.step}
                  </div>
                  <div className="text-sm font-semibold text-black">{item.title}</div>
                  <p className="text-sm text-black/60">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive demo teaser */}
        <section className="bg-black py-20 text-white">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 px-6 md:flex-row md:items-center">
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                See it in action
              </h2>
              <p className="text-sm text-white/70">
                A monochrome, distraction-free reading experience with activities
                built directly into the text.
              </p>
            </div>
            <div className="flex-1">
              <div className="rounded-card border border-white/15 bg-black p-4 shadow-card">
                <div className="mb-4 text-xs font-medium text-white/70">
                  Example · Multiple choice activity
                </div>
                <div className="space-y-3 text-sm">
                  <p className="font-medium">
                    Which of the following best describes TezCode?
                  </p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between rounded-btn border border-white bg-white/5 px-3 py-2">
                      <span>An interactive CS textbook platform</span>
                      <span>✅</span>
                    </div>
                    <div className="rounded-btn border border-white/20 px-3 py-2 text-white/70">
                      A static PDF reader
                    </div>
                    <div className="rounded-btn border border-white/20 px-3 py-2 text-white/70">
                      A generic video course site
                    </div>
                  </div>
                  <div className="mt-3 rounded-card bg-white/5 px-3 py-2 text-xs text-white/80">
                    ✅ <span className="font-semibold">Correct! +1 participation point.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-light py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight text-black">
              Loved by students and instructors
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quote:
                    "TezCode turned my CS1 class into something students actually look forward to.",
                  name: "Dr. Lee",
                  role: "University instructor"
                },
                {
                  quote:
                    "The bite-sized readings and instant feedback made it easy to keep up.",
                  name: "Ananya",
                  role: "First-year CS student"
                },
                {
                  quote:
                    "I stopped guessing whether students did the reading. The gradebook shows everything.",
                  name: "Prof. Martinez",
                  role: "CS department chair"
                }
              ].map(t => (
                <Card key={t.name} className="flex h-full flex-col justify-between p-5">
                  <p className="text-sm italic text-black/80">“{t.quote}”</p>
                  <div className="mt-4 text-sm font-medium text-black">{t.name}</div>
                  <div className="text-xs text-black/55">{t.role}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-10 text-center text-2xl font-semibold tracking-tight">
              Simple pricing
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: "Student",
                  price: "$49",
                  detail: "per course",
                  featured: false
                },
                {
                  name: "Instructor",
                  price: "$199",
                  detail: "per year",
                  featured: true
                },
                {
                  name: "Institution",
                  price: "Contact us",
                  detail: "department & campus plans",
                  featured: false
                }
              ].map(tier => (
                <Card
                  key={tier.name}
                  className={
                    tier.featured
                      ? "border-2 border-black bg-white p-6"
                      : "border border-black/10 bg-white p-6"
                  }
                >
                  <div className="mb-4 text-sm font-semibold text-black">{tier.name}</div>
                  <div className="flex items-baseline gap-1">
                    <div className="text-2xl font-semibold text-black">{tier.price}</div>
                    <div className="text-xs text-black/55">{tier.detail}</div>
                  </div>
                  <p className="mt-4 text-sm text-black/60">
                    Unlimited interactive readings, auto-graded activities, and a rich
                    gradebook.
                  </p>
                  <Button className="mt-6 w-full" variant={tier.featured ? "primary" : "secondary"}>
                    {tier.name === "Institution" ? "Contact sales" : "Get started"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
