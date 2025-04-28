'use client'

import * as React from 'react'
import MatomoContext, { MatomoContextType } from './MatomoContext'
import { MatomoInstance } from './types'

export interface MatomoProviderProps {
  children: React.ReactNode
}

const MatomoProvider = ({ children }: MatomoProviderProps) => {
  const [isInitialized, setIsInitialized] = React.useState(false)
  const [matomo, setMatomo] = React.useState<MatomoInstance>(null!)
  const [isLinkTrackingEnabled, setIsLinkTrackingEnabled] = React.useState(false)

  React.useEffect(() => {
    if (!matomo) return

    const checkMatomo = () => {
      if (typeof window !== 'undefined' && (window as any).Matomo) {
        setIsInitialized(true)
        return true
      }
      return false
    }

    if (!checkMatomo()) {
      let retryTimes = 0
      const interval = setInterval(() => {
        if (checkMatomo() || retryTimes++ > 60) {
          clearInterval(interval)
        }
      }, 500)
      return () => clearInterval(interval)
    }

    return

  }, [matomo])

  const value = React.useMemo<MatomoContextType>(() => ({
    isInitialized,
    instance: matomo,
    setInstance: (instance: MatomoInstance) => setMatomo(instance),
    isLinkTrackingEnabled,
    setIsLinkTrackingEnabled,
  }), [isInitialized, matomo, isLinkTrackingEnabled])

  return (
    <MatomoContext.Provider value={value}>
      {children}
    </MatomoContext.Provider>
  )
}

export default MatomoProvider
