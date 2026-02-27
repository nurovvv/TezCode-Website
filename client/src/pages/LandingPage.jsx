import { Link } from 'react-router-dom';
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
                            {t('landing.cta.buyLaunch')}
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
                            {t('landing.cta.discussion')}
                        </Link>
                    </div>
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
            <section style={{ borderTop: '1px solid #e5e5e5' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '48px 24px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '32px', fontSize: '13px' }}>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                {t('landing.footer.chapters')}
                            </p>
                            <Link to="/catalog" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('catalog.python.title')}</Link>
                            <Link to="/challenges" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('nav.challenges')}</Link>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                {t('nav.dashboard')}
                            </p>
                            <Link to="/dashboard" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('dashboard.myCourses')}</Link>
                            <Link to="/profile" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('nav.profile')}</Link>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                {t('landing.footer.contact')}
                            </p>
                            <a href="https://instagram.com/tezcode" target="_blank" rel="noreferrer" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>Instagram</a>
                            <a href="mailto:support@tezcode.tj" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>Support</a>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                {t('landing.footer.about')}
                            </p>
                            <Link to="/catalog" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('landing.footer.about')}</Link>
                        </div>
                        <div>
                            <p style={{ fontWeight: 700, color: '#1d1d1f', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                                {t('landing.footer.legal')}
                            </p>
                            <Link to="#" style={{ display: 'block', color: '#86868b', textDecoration: 'none', marginBottom: '8px', fontSize: '13px' }}>{t('landing.footer.privacy')}</Link>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '40px',
                        paddingTop: '24px',
                        borderTop: '1px solid #e5e5e5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <span style={{ fontSize: '20px', fontWeight: 900, color: '#1d1d1f' }}>TezCode</span>
                        <p style={{ fontSize: '11px', color: '#ccc', margin: 0 }}>© 2026 · Built with ❤️ for Students</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
