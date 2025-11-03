import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import ContactModal from '../components/ContactModal'

type ContactModalContextValue = {
  isOpen: boolean
  openContactModal: () => void
  closeContactModal: () => void
  toggleContactModal: () => void
}

const ContactModalContext = createContext<ContactModalContextValue | undefined>(undefined)

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const openContactModal = useCallback(() => setIsOpen(true), [])
  const closeContactModal = useCallback(() => setIsOpen(false), [])
  const toggleContactModal = useCallback(() => setIsOpen((prev) => !prev), [])

  const value = useMemo<ContactModalContextValue>(
    () => ({
      isOpen,
      openContactModal,
      closeContactModal,
      toggleContactModal,
    }),
    [isOpen, openContactModal, closeContactModal, toggleContactModal]
  )

  return (
    <ContactModalContext.Provider value={value}>
      {children}
      <ContactModal open={isOpen} onClose={closeContactModal} />
    </ContactModalContext.Provider>
  )
}

export function useContactModal() {
  const context = useContext(ContactModalContext)
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider')
  }
  return context
}

