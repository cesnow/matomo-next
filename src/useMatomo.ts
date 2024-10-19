import { useCallback, useContext } from 'react'
import MatomoContext from './MatomoContext'
import {
  CustomDimension,
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackSiteSearchParams,
} from './types'
import useOutboundClickListener from './utils/useOutboundClickListener'

function useMatomo() {
  const {
    isReady,
    instance,
    setInstance,
    isLinkTrackingEnabled,
    setIsLinkTrackingEnabled,
  } = useContext(MatomoContext)

  useOutboundClickListener(instance, isLinkTrackingEnabled)

  const trackPageView = useCallback(
    (params?: TrackPageViewParams) => instance.trackPageView(params),
    [instance],
  )

  const trackEvent = useCallback(
    (params: TrackEventParams) => instance.trackEvent(params),
    [instance],
  )

  const trackEvents = useCallback(() => instance.trackEvents(), [instance])

  const trackSiteSearch = useCallback(
    (params: TrackSiteSearchParams) => instance.trackSiteSearch(params),
    [instance],
  )

  const trackLink = useCallback(
    (params: TrackLinkParams) => instance.trackLink(params),
    [instance],
  )

  const enableLinkTracking = useCallback(() => {
    setIsLinkTrackingEnabled(true)
  }, [setIsLinkTrackingEnabled])

  const pushInstruction = useCallback(
    (name: string, ...args: any[]) => {
      instance.pushInstruction(name, ...args)
    },
    [instance],
  )

  const pushCustomDimensions = useCallback(
    (dimensions: CustomDimension[]) => {
      instance.pushCustomDimensions(dimensions)
    },
    [instance],
  )

  const pushCustomDimension = useCallback(
    (dimension: CustomDimension) => {
      instance.pushCustomDimension(dimension)
    },
    [instance],
  )

  const pushUserId = useCallback(
    (userId: string) => {
      instance.pushUserId(userId)
    },
    [instance],
  )

  return {
    isReady,
    instance,
    setInstance,
    trackEvent,
    trackEvents,
    trackPageView,
    trackSiteSearch,
    trackLink,
    isLinkTrackingEnabled,
    enableLinkTracking,
    pushInstruction,
    pushCustomDimensions,
    pushCustomDimension,
    pushUserId,
  }
}

export default useMatomo
