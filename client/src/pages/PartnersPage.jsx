import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function PartnersPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#fff', fontFamily: "'Inter', -apple-system, sans-serif" }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 24px' }}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 800,
                        color: '#1d1d1f',
                        margin: '0 0 48px',
                        letterSpacing: '-0.02em'
                    }}>
                        Контактная информация
                    </h1>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '16px', color: '#4a4a4a' }}>
                        <div>
                            <span>Электронная почта: </span>
                            <a href="mailto:tezyoft@gmail.com" style={{ color: '#4a4a4a', textDecoration: 'none' }}>tezyoft@gmail.com</a>
                        </div>

                        <div>
                            <span>Телефон: </span>
                            <a href="tel:+14805699854" style={{ color: '#4a4a4a', textDecoration: 'none' }}>+1 (480) 569-9854</a>
                        </div>

                        <div>
                            <span>Адрес: </span>
                            <span>Tempe, AZ, 500 E University Drive</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
