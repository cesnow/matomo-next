import React, { useMemo, useState } from 'react'
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

  const setMatomoInstance = (instance: MatomoInstance) => {
    setMatomo(instance)

    const checkMatomo = (): boolean => {
      if (window.Matomo) {
        setIsInitialized(true) // Matomo is initialized, update state
        return true
      }
      return false
    }

    let interval = setInterval(() => {
      if (checkMatomo()) {
        clearInterval(interval)
      }
    }, 500)
  }

  const value: MatomoContextType = useMemo(
    () => ({
      isInitialized,
      instance: matomo,
      setInstance: setMatomoInstance,
      isLinkTrackingEnabled,
      setIsLinkTrackingEnabled,
    }),
    [matomo, isLinkTrackingEnabled],
  )

  return (
    <MatomoContext.Provider value={value}>{children}</MatomoContext.Provider>
  )
}

export default MatomoProvider
