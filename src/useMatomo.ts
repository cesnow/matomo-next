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
import { WindowMatomoTracker } from './matomo.types'

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

  const addTracker = useCallback(
    (tracker: WindowMatomoTracker) => {
      instance.addTracker(tracker)
    },
    [instance],
  )

  const enableLinkTracking = useCallback(() => {
    setIsLinkTrackingEnabled(true)
  }, [setIsLinkTrackingEnabled])

  const enableFileTracking = useCallback(() => {
    instance.enableFileTracking()
  }, [instance])

  const forgetCookieConsentGiven = useCallback(() => {
    instance.forgetCookieConsentGiven()
  }, [instance])

  const requireCookieConsent = useCallback(() => {
    instance.requireCookieConsent()
  }, [instance])

  const disableBrowserFeatureDetection = useCallback(() => {
    instance.disableBrowserFeatureDetection()
  }, [instance])

  const disableCampaignParameters = useCallback(() => {
    instance.disableCampaignParameters()
  }, [instance])

  const disableCookies = useCallback(() => {
    instance.disableCookies()
  }, [instance])

  const enableCrossDomainLinking = useCallback(() => {
    instance.enableCrossDomainLinking()
  }, [instance])

  const disableAlwaysUseSendBeacon = useCallback(() => {
    instance.disableAlwaysUseSendBeacon()
  }, [instance])

  const requireConsent = useCallback(() => {
    instance.requireConsent()
  }, [instance])

  const disablePerformanceTracking = useCallback(() => {
    instance.disablePerformanceTracking()
  }, [instance])

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

  const pushSiteId = useCallback(
    (siteId: number) => {
      instance.pushSiteId(siteId)
    },
    [instance],
  )

  const pushDomains = useCallback(
    (domains: string[]) => {
      instance.pushDomains(domains)
    },
    [instance],
  )

  const pushVisitorId = useCallback(
    (visitorId: string) => {
      instance.pushVisitorId(visitorId)
    },
    [instance],
  )

  const pushTrackerUrl = useCallback(
    (trackerUrl: string) => {
      instance.pushTrackerUrl(trackerUrl)
    },
    [instance],
  )

  const pushAPIUrl = useCallback(
    (apiUrl: string) => {
      instance.pushApiUrl(apiUrl)
    },
    [instance],
  )

  const pushCrossDomainLinkingTimeout = useCallback(
    (timeout: number) => {
      instance.pushCrossDomainLinkingTimeout(timeout)
    },
    [instance],
  )

  const pushSessionCookieTimeout = useCallback(
    (seconds: number) => {
      instance.pushSessionCookieTimeout(seconds)
    },
    [instance],
  )

  const pushVisitorCookieTimeout = useCallback(
    (seconds: number) => {
      instance.pushVisitorCookieTimeout(seconds)
    },
    [instance],
  )

  const pushSecureCookie = useCallback(
    (secure: boolean) => {
      instance.pushSecureCookie(secure)
    },
    [instance],
  )

  const pushCookieNamePrefix = useCallback(
    (prefix: string) => {
      instance.pushCookieNamePrefix(prefix)
    },
    [instance],
  )

  const pushCookieDomain = useCallback(
    (domain: string) => {
      instance.pushCookieDomain(domain)
    },
    [instance],
  )

  const pushCookiePath = useCallback(
    (path: string) => {
      instance.pushCookiePath(path)
    },
    [instance],
  )

  const pushCookieSameSite = useCallback(
    (string: string) => {
      instance.pushCookieSameSite(string)
    },
    [instance],
  )

  const pushCookieConsentGiven = useCallback(() => {
    instance.pushCookieConsentGiven()
  }, [instance])

  const pushConsentGiven = useCallback(() => {
    instance.pushConsentGiven()
  }, [instance])

  const pushPagePerformanceTiming = useCallback(
    (...args: number[]) => {
      instance.pushPagePerformanceTiming(...args)
    },
    [instance],
  )

  const pushExcludedReferrers = useCallback(
    (domains: string | string[]) => {
      instance.pushExcludedReferrers(domains)
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
    addTracker,
    enableLinkTracking,
    enableFileTracking,
    forgetCookieConsentGiven,
    requireCookieConsent,
    disableBrowserFeatureDetection,
    disableCampaignParameters,
    disableCookies,
    enableCrossDomainLinking,
    disableAlwaysUseSendBeacon,
    requireConsent,
    disablePerformanceTracking,
    pushInstruction,
    pushSiteId,
    pushDomains,
    pushVisitorId,
    pushTrackerUrl,
    pushAPIUrl,
    pushCrossDomainLinkingTimeout,
    pushSessionCookieTimeout,
    pushVisitorCookieTimeout,
    pushSecureCookie,
    pushCookieNamePrefix,
    pushCookieSameSite,
    pushCookiePath,
    pushCookieDomain,
    pushCookieConsentGiven,
    pushConsentGiven,
    pushPagePerformanceTiming,
    pushExcludedReferrers,
    pushCustomDimensions,
    pushCustomDimension,
    pushUserId,
  }
}

export default useMatomo
