import { useEffect, useMemo, useState } from 'react'
import { saveConsentPreferences, registerDefaultConsent, getStoredConsent, defaultConsentPreferences, type ConsentPreferences } from '../analytics/consent'
import { trackEvent } from '../analytics/events'
import { useTranslation } from '../features/i18n/i18n'

type ToggleKey = Exclude<keyof ConsentPreferences, 'necessary'>

const TOGGLE_KEYS: ToggleKey[] = ['analytics', 'marketing']

function ConsentBanner() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [preferences, setPreferences] = useState<ConsentPreferences>(defaultConsentPreferences)
  const [showManager, setShowManager] = useState(false)

  useEffect(() => {
    registerDefaultConsent()
    const stored = getStoredConsent()
    if (stored) {
      setPreferences(stored)
      setShowManager(true)
      return
    }
    setIsOpen(true)
  }, [])

  const togglePreference = (key: ToggleKey) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const acceptAll = () => {
    const updated: ConsentPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    saveConsentPreferences(updated)
    setPreferences(updated)
    setIsOpen(false)
    setShowManager(true)
    trackEvent('consent_accept_all', updated)
  }

  const saveSelection = () => {
    saveConsentPreferences(preferences)
    setIsOpen(false)
    setShowManager(true)
    trackEvent('consent_preferences_submit', preferences)
  }

  const resetBanner = () => {
    setIsOpen(true)
    setShowManager(false)
    setPreferences(defaultConsentPreferences)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('jr-consent-preferences')
    }
  }

  const preferenceItems = useMemo(
    () => [
      {
        key: 'necessary' as const,
        title: t('consent.necessary.title'),
        description: t('consent.necessary.description'),
        disabled: true,
        value: true,
      },
      ...TOGGLE_KEYS.map((key) => ({
        key,
        title: t(`consent.${key}.title` as const),
        description: t(`consent.${key}.description` as const),
        disabled: false,
        value: preferences[key],
      })),
    ],
    [preferences, t]
  )

  if (!isOpen && !showManager) {
    return null
  }

  return (
    <>
      {showManager ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed z-40 bottom-6 left-6 rounded-full border border-border/60 bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-wide shadow-lg backdrop-blur-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t('consent.managePreferences')}
        >
          {t('consent.managePreferences')}
        </button>
      ) : null}

      {isOpen ? (
        <div
          className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
          role="dialog"
          aria-modal="true"
          aria-label={t('consent.title')}
        >
          <div className="mx-auto max-w-4xl rounded-3xl border border-border/70 bg-background/95 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-foreground">{t('consent.title')}</h2>
                <p className="text-sm text-muted-foreground">{t('consent.description')}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {preferenceItems.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-2xl border border-border/60 bg-muted/40 p-4 shadow-sm transition hover:border-border"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                      <label className="relative inline-flex h-6 w-11 items-center">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={item.value}
                          onChange={() => { if (!item.disabled) { togglePreference(item.key as ToggleKey) } }}
                          disabled={item.disabled}
                          aria-checked={item.value}
                        />
                        <span
                          className="peer h-6 w-11 rounded-full border border-border/60 bg-background transition peer-checked:bg-primary peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-ring"
                          aria-hidden="true"
                        />
                        <span
                          className="absolute left-1 top-1 h-4 w-4 rounded-full bg-muted-foreground transition peer-checked:translate-x-5 peer-checked:bg-primary-foreground"
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetBanner}
                  className="text-xs uppercase tracking-wide text-muted-foreground hover:text-foreground"
                >
                  {t('consent.reset')}
                </button>
                <button
                  type="button"
                  onClick={saveSelection}
                  className="inline-flex items-center justify-center rounded-full border border-border/60 px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {t('consent.save')}
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {t('consent.acceptAll')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default ConsentBanner


