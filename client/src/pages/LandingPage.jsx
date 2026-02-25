import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);
    return (
        <div style={{ borderBottom: '1px solid #e5e5e5' }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 0',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                }}
            >
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f' }}>{question}</span>
                <span style={{ color: '#999', fontSize: '18px', marginLeft: '16px' }}>{open ? '−' : '+'}</span>
            </button>
            {open && (
                <div style={{ paddingBottom: '20px' }}>
                    <p style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>{answer}</p>
                </div>
            )}
        </div>
    );
}

export default function LandingPage() {
    return (
        <div style={{ background: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>

            {/* ═══════ HEADER ═══════ */}
            <section style={{ textAlign: 'center', padding: '80px 24px 48px' }}>
                <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                    <h1 style={{
                        fontSize: 'clamp(32px, 5vw, 48px)',
                        fontWeight: 900,
                        color: '#1d1d1f',
                        letterSpacing: '-0.02em',
                        margin: '0 0 8px',
                        fontStyle: 'italic',
                    }}>
                        Subject Overview.
                    </h1>
                    <p style={{ fontSize: '16px', color: '#86868b', margin: '0 0 32px' }}>
                        Explore chapters and practice problems.
                    </p>

                    {/* Toggle Buttons */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: '#f5f5f7',
                        borderRadius: '12px',
                        padding: '4px',
                        gap: '2px',
                    }}>
                        <Link to="/register" style={{
                            padding: '10px 24px',
                            background: '#1d1d1f',
                            color: '#fff',
                            fontSize: '13px',
                            fontWeight: 600,
                            borderRadius: '10px',
                            textDecoration: 'none',
                        }}>
                            Buy / Launch
                        </Link>
                        <Link to="/catalog" style={{
                            padding: '10px 24px',
                            background: 'transparent',
                            color: '#86868b',
                            fontSize: '13px',
                            fontWeight: 500,
                            borderRadius: '10px',
                            textDecoration: 'none',
                        }}>
                            Start Discussion
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ THREE FEATURE CARDS ═══════ */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 64px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[
                        {
                            icon: (
                                <svg width="40" height="40" viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="20" fill="#1d1d1f" /></svg>
                            ),
                            title: 'Interactive content',
                        },
                        {
                            icon: (
                                <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="11" fill="#1d1d1f" /></svg>
                            ),
                            title: 'Problem sets',
                        },
                        {
                            icon: (
                                <svg width="40" height="40" viewBox="0 0 40 40"><polygon points="20,6 34,34 6,34" fill="#1d1d1f" /></svg>
                            ),
                            title: 'Track results',
                        },
                    ].map((card, i) => (
                        <motion.div
                            key={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            transition={{ delay: i * 0.1 }}
                            style={{
                                background: '#f5f5f7',
                                borderRadius: '16px',
                                padding: '40px 24px 32px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                            }}
                        >
                            <div style={{ marginBottom: '16px', opacity: 0.85 }}>{card.icon}</div>
                            <p style={{ fontSize: '13px', fontWeight: 600, color: '#1d1d1f', margin: 0 }}>{card.title}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ═══════ CHAPTER 1 ═══════ */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 24px' }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div style={{
                        background: '#f5f5f7',
                        borderRadius: '16px',
                        height: '320px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}>
                        <span style={{
                            fontSize: 'clamp(48px, 8vw, 80px)',
                            fontWeight: 900,
                            color: 'rgba(29,29,31,0.07)',
                            letterSpacing: '0.1em',
                            userSelect: 'none',
                        }}>
                            BOA
                        </span>
                    </div>
                    <div style={{ maxWidth: '420px', marginBottom: '48px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px' }}>
                            Chapter 1: Introduction
                        </h3>
                        <p style={{ fontSize: '13px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>
                            Start your journey with programming fundamentals.
                            Learn about variables, data types, and basic syntax
                            that form the foundation of every program you'll
                            write. Interactive activities reinforce each concept.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ CHAPTER 2 ═══════ */}
            <section style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div style={{
                        background: '#f5f5f7',
                        borderRadius: '16px',
                        height: '320px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}>
                        <span style={{
                            fontSize: 'clamp(48px, 8vw, 80px)',
                            fontWeight: 900,
                            color: 'rgba(29,29,31,0.07)',
                            letterSpacing: '0.1em',
                            userSelect: 'none',
                        }}>
                            BOA
                        </span>
                    </div>
                    <div style={{ maxWidth: '420px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1d1d1f', margin: '0 0 8px' }}>
                            Chapter 2: Power and Index
                        </h3>
                        <p style={{ fontSize: '13px', color: '#86868b', lineHeight: 1.7, margin: 0 }}>
                            Dive deeper into functions, loops, and string
                            manipulation. Understand indexing, slicing,
                            and how to write efficient, reusable code.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* ═══════ TESTIMONIALS ═══════ */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1d1d1f', margin: '0 0 6px' }}>
                            Hear from Learners
                        </h2>
                        <p style={{ fontSize: '15px', color: '#86868b', margin: 0 }}>What students say</p>
                    </motion.div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                        {[
                            { text: '"The interactive problems helped me understand concepts I was stuck on for months."', name: 'Alex R.', role: 'CS Student' },
                            { text: '"Practice sections after every topic made it easy to retain everything."', name: 'Maria K.', role: 'Math Student' },
                            { text: '"Love the chapter progress tracking. It keeps me motivated to finish."', name: 'David S.', role: 'Engineering' },
                            { text: '"This is exactly what good e-learning should feel like. Clean and focused."', name: 'Sara N.', role: 'Graduate Student' },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    background: '#f5f5f7',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '180px',
                                }}
                            >
                                <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.6, margin: '0 0 20px' }}>{item.text}</p>
                                <div>
                                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#1d1d1f', margin: 0 }}>{item.name}</p>
                                    <p style={{ fontSize: '11px', color: '#86868b', margin: 0 }}>{item.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FAQ ═══════ */}
            <section style={{ maxWidth: '580px', margin: '0 auto', padding: '0 24px 80px' }}>
                <FAQItem
                    question="How do I start a practice problem set?"
                    answer="Navigate to any chapter and click on the practice section. Each problem set includes multiple-choice, fill-in-the-blank, and coding activities."
                />
                <FAQItem
                    question="What's included in the subscription?"
                    answer="Full access to all chapters, interactive activities, practice problem sets, progress tracking, and downloadable resources."
                />
                <FAQItem
                    question="Can I track my progress?"
                    answer="Yes! Your dashboard shows XP earned, chapters completed, streak count, and your position on the leaderboard."
                />
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <section style={{ borderTop: '1px solid #e5e5e5' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px', fontSize: '13px' }}>
                        {[
                            { title: 'Chapters', links: ['Chapters', 'Reviews'] },
                            { title: 'Instructors', links: ['FAQ', 'Guides'] },
                            { title: 'Support', links: ['Contact', 'Privacy Policy'] },
                            { title: 'Company', links: ['About', 'Careers'] },
                            { title: 'Platforms', links: ['Web App', 'Education'] },
                        ].map((col) => (
                            <div key={col.title}>
                                <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                    {col.title}
                                </p>
                                {col.links.map((link) => (
                                    <a key={link} href="#" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>
                                        {link}
                                    </a>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div style={{
                        marginTop: '40px',
                        paddingTop: '24px',
                        borderTop: '1px solid #e5e5e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#1d1d1f' }}>BOA</span>
                        <p style={{ fontSize: '11px', color: '#ccc', margin: 0 }}>Careers · Newsroom · Reports</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
