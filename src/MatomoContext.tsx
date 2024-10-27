import { createContext, Dispatch, SetStateAction } from 'react'
import { MatomoInstance } from './types'

export type MatomoContextType = {
  isInitialized: boolean
  isLinkTrackingEnabled: boolean
  setIsLinkTrackingEnabled: Dispatch<SetStateAction<boolean>>
  instance: MatomoInstance
  setInstance: (instance: MatomoInstance) => void
}

const MatomoContext = createContext<MatomoContextType>(null!)

export default MatomoContext
