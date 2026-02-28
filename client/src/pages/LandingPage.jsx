import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LandingPage() {
    const { t } = useLanguage();

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
                        {t('landing.subjectOverview')}
                    </h1>
                    <p style={{ fontSize: '16px', color: '#86868b', margin: '0 0 32px' }}>
                        {t('landing.exploreSubtitle')}
                    </p>

                    {/* Action Button */}
                    <Link to="/register" style={{
                        display: 'inline-block',
                        padding: '12px 28px',
                        background: '#1d1d1f',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 600,
                        borderRadius: '12px',
                        textDecoration: 'none',
                    }}>
                        {t('landing.cta.buyLaunch')}
                    </Link>
                </motion.div>
            </section>

            {/* ═══════ CURRICULUM OVERVIEW ═══════ */}
            <section style={{ padding: '80px 24px', background: '#f5f5f7' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#1d1d1f', margin: '0 0 6px' }}>
                            {t('landing.chapters.curriculumTitle')}
                        </h2>
                        <p style={{ fontSize: '15px', color: '#86868b', margin: 0 }}>
                            {t('landing.chapters.curriculumSubtitle')}
                        </p>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '20px',
                    }}>
                        {t('landing.chapters.list', { returnObjects: true })?.map((course, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                transition={{ delay: i * 0.1 }}
                                style={{
                                    background: '#fff',
                                    borderRadius: '16px',
                                    padding: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                                    border: '1px solid rgba(0,0,0,0.02)',
                                }}
                            >
                                <div style={{
                                    width: '12px',
                                    height: '12px',
                                    borderRadius: '50%',
                                    background: course.includes('Available') || course.includes('Доступно') || course.includes('Ҳоло') ? '#28a745' : '#ccc',
                                }} />
                                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1d1d1f' }}>{course}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ FOOTER ═══════ */}
            <section style={{ backgroundColor: '#1a1a1a', color: '#a0a0a0', paddingTop: '64px', paddingBottom: '32px' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'minmax(250px, 1.5fr) repeat(4, 1fr)',
                        gap: '24px',
                        fontSize: '13px',
                        marginBottom: '48px'
                    }}>
                        {/* Logo & Description */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                {/* Placeholder for Logo icon */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>TezCode</span>
                            </div>
                            <p style={{ lineHeight: '1.5', margin: 0 }}>
                                Interactive learning platform<br />
                                for the modern student
                            </p>
                        </div>

                        {/* Contacts */}
                        <div>
                            <a href="https://t.me/tezcode" target="_blank" rel="noreferrer" style={{ display: 'block', color: 'inherit', textDecoration: 'none', marginBottom: '12px' }}>Telegram</a>
                            <a href="https://instagram.com/tezcode" target="_blank" rel="noreferrer" style={{ display: 'block', color: 'inherit', textDecoration: 'none', marginBottom: '12px' }}>Instagram</a>
                        </div>


                    </div>

                    {/* Bottom Bar */}
                    <div style={{
                        borderTop: '1px solid #333',
                        paddingTop: '24px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                        <p style={{ margin: 0 }}>© 2026 TezCode. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
