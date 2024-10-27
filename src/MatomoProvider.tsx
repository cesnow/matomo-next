import React, { useEffect, useMemo, useState } from 'react'
import MatomoContext, { MatomoContextType } from './MatomoContext'
import { MatomoInstance } from './types'

export interface MatomoProviderProps {
  children: React.ReactNode
}

const MatomoProvider: React.FC<MatomoProviderProps> = function ({ children }) {
  const [isInitialized, setIsInitialized] = useState<boolean>(false)
  const [matomo, setMatomo] = useState<MatomoInstance>(null!)
  const [isLinkTrackingEnabled, setIsLinkTrackingEnabled] =
    useState<boolean>(false)

  useEffect(() => {
    if (!matomo) return

    const checkMatomo = () => {
      if (window.Matomo) {
        setIsInitialized(true)
        return true
      }
      return false
    }

    if (!checkMatomo()) {
      let retryTimes: number = 0
      const interval: NodeJS.Timeout = setInterval(() => {
        if (checkMatomo() || retryTimes++ > 60) {
          clearInterval(interval)
        }
      }, 500)
    }
  }, [matomo])

  const value: MatomoContextType = useMemo(
    () => ({
      isInitialized,
      instance: matomo,
      setInstance: setMatomo,
      isLinkTrackingEnabled,
      setIsLinkTrackingEnabled,
    }),
    [matomo, isInitialized, isLinkTrackingEnabled],
  )

  return (
    <MatomoContext.Provider value={value}>{children}</MatomoContext.Provider>
  )
}

export default MatomoProvider
