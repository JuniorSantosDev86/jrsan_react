import { useTranslation } from '../features/i18n/i18n'

function SkipLink() {
  const { t } = useTranslation()

  return (
    <a
      href="#main-content"
      className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition focus-visible:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {t('accessibility.skipToContent')}
    </a>
  )
}

export default SkipLink
