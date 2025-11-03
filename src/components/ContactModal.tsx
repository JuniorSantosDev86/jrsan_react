import { useEffect } from 'react'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'
import { useTranslation } from '../features/i18n/i18n'

type ContactModalProps = {
  open: boolean
  onClose: () => void
}

function ContactModal({ open, onClose }: ContactModalProps) {
  const { t } = useTranslation()

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('overflow-hidden')

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('overflow-hidden')
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4 py-10"
      aria-modal="true"
      role="dialog"
      aria-labelledby="contact-modal-title"
    >
      <button
        type="button"
        className="fixed inset-0 h-full w-full cursor-default"
        aria-label="Fechar contato"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f1126]/95 shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
        <div className="flex items-start justify-between border-b border-white/10 px-6 py-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/40">
              {t('cta.button')}
            </p>
            <h2 id="contact-modal-title" className="mt-2 text-2xl font-bold text-white">
              {t('cta.form.title')}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/70 transition-colors duration-200 hover:border-white/30 hover:text-white"
            aria-label="Fechar formulário de contato"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto px-6 py-6">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

export default ContactModal

