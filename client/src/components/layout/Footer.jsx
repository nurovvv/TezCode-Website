import { useLanguage } from '../../context/LanguageContext';
import tezcodeLogo from '../../assets/tezcode-logo.png';

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="bg-primary text-white/60">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                            <img src={tezcodeLogo} alt="TezCode" style={{ height: '22px', width: 'auto', filter: 'invert(1)' }} />
                            <span className="text-white text-xl font-bold">TezCode</span>
                        </div>
                        <p className="text-sm leading-relaxed">{t('footer.description')}</p>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">{t('footer.product.title')}</h4>
                        <ul className="space-y-2 list-none">
                            {(t('footer.product.links') || []).map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="text-sm hover:text-white transition-colors no-underline text-white/60">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">{t('footer.company.title')}</h4>
                        <ul className="space-y-2 list-none">
                            {(t('footer.company.links') || []).map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="text-sm hover:text-white transition-colors no-underline text-white/60">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-white text-sm font-semibold mb-4">{t('footer.legal.title')}</h4>
                        <ul className="space-y-2 list-none">
                            {(t('footer.legal.links') || []).map((link, i) => (
                                <li key={i}>
                                    <a href="#" className="text-sm hover:text-white transition-colors no-underline text-white/60">{link}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-sm text-center">
                    {t('footer.copyright')}
                </div>
            </div>
        </footer>
    );
}
