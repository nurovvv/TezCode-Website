import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function CatalogPage() {
    const { t } = useLanguage();
    return (
        <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1d1d1f', margin: '0 0 12px' }}>{t('catalog.title')}</h1>
                    <p style={{ fontSize: '16px', color: '#86868b', margin: 0 }}>{t('catalog.subtitle')}</p>
                </div>

                {/* Python Course Card */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Link to="/course/1" style={{ textDecoration: 'none', display: 'block' }}>
                        <div style={{
                            background: '#fff', borderRadius: '20px', overflow: 'hidden',
                            boxShadow: '0 2px 20px rgba(0,0,0,0.06)', cursor: 'pointer',
                            transition: 'box-shadow 0.3s, transform 0.3s',
                        }}
                            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                            {/* Hero Banner */}
                            <div style={{
                                background: 'linear-gradient(135deg, #306998 0%, #FFD43B 100%)',
                                padding: '48px 40px', position: 'relative', overflow: 'hidden',
                            }}>
                                <div style={{ position: 'relative', zIndex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                                            {t('catalog.python.category')}
                                        </span>
                                        <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: 'rgba(255,255,255,0.25)', color: '#fff' }}>
                                            {t('catalog.python.badge')}
                                        </span>
                                    </div>
                                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>{t('catalog.python.title')}</h2>
                                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
                                        {t('catalog.python.desc')}
                                    </p>
                                </div>
                                {/* Python logo watermark */}
                                <div style={{ position: 'absolute', right: '32px', top: '50%', transform: 'translateY(-50%)', fontSize: '100px', opacity: 0.15 }}>🐍</div>
                            </div>

                            {/* Details */}
                            <div style={{ padding: '28px 40px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: '32px' }}>
                                        <div>
                                            <p style={{ fontSize: '11px', color: '#86868b', margin: '0 0 2px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('catalog.labels.chapters')}</p>
                                            <p style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f', margin: 0 }}>12</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', color: '#86868b', margin: '0 0 2px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('catalog.labels.sections')}</p>
                                            <p style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f', margin: 0 }}>36</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', color: '#86868b', margin: '0 0 2px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('catalog.labels.activities')}</p>
                                            <p style={{ fontSize: '20px', fontWeight: 800, color: '#1d1d1f', margin: 0 }}>65+</p>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '11px', color: '#86868b', margin: '0 0 2px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('catalog.labels.instructor')}</p>
                                            <p style={{ fontSize: '14px', fontWeight: 600, color: '#1d1d1f', margin: 0 }}>Farrukh Saidov</p>
                                        </div>
                                    </div>
                                    <div style={{
                                        padding: '12px 28px', borderRadius: '12px',
                                        background: '#1d1d1f', color: '#fff',
                                        fontSize: '14px', fontWeight: 600,
                                    }}>
                                        {t('catalog.startBtn')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </motion.div>

                {/* Coming Soon */}
                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                    <p style={{ fontSize: '14px', color: '#aeaeb2' }}>{t('catalog.comingSoon')}</p>
                </div>
            </div>
        </div>
    );
}
