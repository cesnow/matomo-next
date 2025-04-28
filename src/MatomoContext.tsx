'use client'

import * as React from 'react'
import { MatomoInstance } from './types'

export type MatomoContextType = {
  isInitialized: boolean
  isLinkTrackingEnabled: boolean
  setIsLinkTrackingEnabled: React.Dispatch<React.SetStateAction<boolean>>
  instance: MatomoInstance
  setInstance: (instance: MatomoInstance) => void
}

const MatomoContext = React.createContext<MatomoContextType>(null!)

export default MatomoContext
