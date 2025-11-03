import { FormEvent, useState } from 'react'
import { Loader2, CheckCircle2, AlertCircle, Mail, User, MessageSquare } from 'lucide-react'
import { useTranslation } from '../features/i18n/i18n'
import { trackEvent } from '../analytics/events'

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

function ContactForm() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
      _captcha: 'false',
    }

    try {
      setStatus('loading')
      setErrorMessage(null)
      trackEvent('form_submit', { form: 'contact', status: 'started' })

      const response = await fetch('https://formsubmit.co/ajax/juniorsantos.dev86@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      await response.json()
      setStatus('success')
      form.reset()
      trackEvent('form_submit', { form: 'contact', status: 'success' })
    } catch (error) {
      console.error(error)
      setStatus('error')
      setErrorMessage(t('cta.form.error'))
      trackEvent('form_submit', { form: 'contact', status: 'error' })
    } finally {
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto lg:mx-0">
      <div className="rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-white mb-2">{t('cta.form.title')}</h3>
          <p className="text-sm text-white/70">{t('cta.form.subtitle')}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="group flex flex-col text-sm">
              <span className="mb-2 flex items-center gap-2 text-white/70 font-medium uppercase tracking-wide">
                <User className="h-4 w-4" />
                {t('cta.form.name')}
              </span>
              <input
                name="name"
                type="text"
                required
                placeholder={t('cta.form.namePlaceholder')}
                className="h-12 rounded-xl border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              />
            </label>

            <label className="group flex flex-col text-sm">
              <span className="mb-2 flex items-center gap-2 text-white/70 font-medium uppercase tracking-wide">
                <Mail className="h-4 w-4" />
                {t('cta.form.email')}
              </span>
              <input
                name="email"
                type="email"
                required
                placeholder="nome@email.com"
                className="h-12 rounded-xl border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
              />
            </label>
          </div>

          <label className="group flex flex-col text-sm">
            <span className="mb-2 flex items-center gap-2 text-white/70 font-medium uppercase tracking-wide">
              <MessageSquare className="h-4 w-4" />
              {t('cta.form.subject')}
            </span>
            <input
              name="subject"
              type="text"
              required
              placeholder={t('cta.form.subjectPlaceholder')}
              className="h-12 rounded-xl border border-white/20 bg-white/5 px-4 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200"
            />
          </label>

          <label className="group flex flex-col text-sm">
            <span className="mb-2 flex items-center gap-2 text-white/70 font-medium uppercase tracking-wide">
              <MessageSquare className="h-4 w-4" />
              {t('cta.form.message')}
            </span>
            <textarea
              name="message"
              required
              rows={5}
              placeholder={t('cta.form.messagePlaceholder')}
              className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 resize-none"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-white text-gray-900 font-semibold uppercase tracking-wide shadow-lg shadow-black/30 transition-all duration-200 hover:scale-[1.01] hover:shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t('cta.form.sending')}
              </>
            ) : (
              <>
                <Mail className="h-4 w-4" />
                {t('cta.form.submit')}
              </>
            )}
          </button>
        </form>

        {status === 'success' && (
          <div
            className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100"
            role="status"
            aria-live="polite"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span>{t('cta.form.success')}</span>
          </div>
        )}

        {status === 'error' && (
          <div
            className="mt-4 flex items-center gap-2 rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-100"
            role="alert"
            aria-live="assertive"
          >
            <AlertCircle className="h-5 w-5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactForm
