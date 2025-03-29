import { t } from 'i18next';

import { flagsHooks } from '@/hooks/flags-hooks';

const FullLogo = () => {
  const branding = flagsHooks.useWebsiteBranding();

  return (
    <div className="h-[60px]">
      {/* <img
        className="h-full"
        src={branding.logos.fullLogoUrl}
        alt={t('logo')}
      /> */}
      <h1 style={{ color: '#6e41e2', fontSize:'40px',fontWeight: '700' }}>NOYCO</h1>
    </div>
  );
};
FullLogo.displayName = 'FullLogo';
export { FullLogo };
