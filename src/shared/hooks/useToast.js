import { useState, useCallback } from 'react'

let toastCount = 0

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description, variant = 'default', duration = 5000 }) => {
    const id = ++toastCount
    const newToast = {
      id,
      title,
      description,
      variant,
      open: true
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)

    return {
      id,
      dismiss: () => setToasts(prev => prev.filter(t => t.id !== id))
    }
  }, [])

  const dismiss = useCallback((toastId) => {
    setToasts(prev => prev.filter(t => t.id !== toastId))
  }, [])

  return {
    toast,
    dismiss,
    toasts
  }
}