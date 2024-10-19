import React, { useMemo, useState } from 'react'
import MatomoContext, { MatomoContextType } from './MatomoContext'
import { MatomoInstance } from './types'

export interface MatomoProviderProps {
  children: React.ReactNode
}

const MatomoProvider: React.FC<MatomoProviderProps> = function ({ children }) {
  const [isReady, setIsReady] = useState<boolean>(false)
  const [matomo, setMatomo] = useState<MatomoInstance>(null!)
  const [isLinkTrackingEnabled, setIsLinkTrackingEnabled] =
    useState<boolean>(false)

  const setMatomoInstance = (instance: MatomoInstance) => {
    setMatomo(instance)
    setIsReady(true)
  }

  const value: MatomoContextType = useMemo(
    () => ({
      isReady,
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
