'use client'
import * as React from 'react'
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
    isInitialized,
    instance,
    setInstance,
    isLinkTrackingEnabled,
    setIsLinkTrackingEnabled,
  } = React.useContext(MatomoContext)

  useOutboundClickListener(instance, isLinkTrackingEnabled)

  const trackPageView = React.useCallback(
    (params?: TrackPageViewParams) => instance.trackPageView(params),
    [instance],
  )

  const trackEvent = React.useCallback(
    (params: TrackEventParams) => instance.trackEvent(params),
    [instance],
  )

  const trackEvents = React.useCallback(() => instance.trackEvents(), [instance])

  const trackSiteSearch = React.useCallback(
    (params: TrackSiteSearchParams) => instance.trackSiteSearch(params),
    [instance],
  )

  const trackLink = React.useCallback(
    (params: TrackLinkParams) => instance.trackLink(params),
    [instance],
  )

  const addTracker = React.useCallback(
    (trackerUrl: string, siteId: number) => {
      instance.addTracker(trackerUrl, siteId)
    },
    [instance],
  )

  const enableLinkTracking = React.useCallback(() => {
    setIsLinkTrackingEnabled(true)
  }, [setIsLinkTrackingEnabled])

  const enableFileTracking = React.useCallback(() => {
    instance.enableFileTracking()
  }, [instance])

  const forgetCookieConsentGiven = React.useCallback(() => {
    instance.forgetCookieConsentGiven()
  }, [instance])

  const requireCookieConsent = React.useCallback(() => {
    instance.requireCookieConsent()
  }, [instance])

  const disableBrowserFeatureDetection = React.useCallback(() => {
    instance.disableBrowserFeatureDetection()
  }, [instance])

  const disableCampaignParameters = React.useCallback(() => {
    instance.disableCampaignParameters()
  }, [instance])

  const disableCookies = React.useCallback(() => {
    instance.disableCookies()
  }, [instance])

  const enableCrossDomainLinking = React.useCallback(() => {
    instance.enableCrossDomainLinking()
  }, [instance])

  const disableAlwaysUseSendBeacon = React.useCallback(() => {
    instance.disableAlwaysUseSendBeacon()
  }, [instance])

  const requireConsent = React.useCallback(() => {
    instance.requireConsent()
  }, [instance])

  const disablePerformanceTracking = React.useCallback(() => {
    instance.disablePerformanceTracking()
  }, [instance])

  const pushInstruction = React.useCallback(
    (name: string, ...args: any[]) => {
      instance.pushInstruction(name, ...args)
    },
    [instance],
  )

  const pushCustomDimensions = React.useCallback(
    (dimensions: CustomDimension[]) => {
      instance.pushCustomDimensions(dimensions)
    },
    [instance],
  )

  const pushCustomDimension = React.useCallback(
    (dimension: CustomDimension) => {
      instance.pushCustomDimension(dimension)
    },
    [instance],
  )

  const pushSiteId = React.useCallback(
    (siteId: number) => {
      instance.pushSiteId(siteId)
    },
    [instance],
  )

  const pushDomains = React.useCallback(
    (domains: string[]) => {
      instance.pushDomains(domains)
    },
    [instance],
  )

  const pushVisitorId = React.useCallback(
    (visitorId: string) => {
      instance.pushVisitorId(visitorId)
    },
    [instance],
  )

  const pushTrackerUrl = React.useCallback(
    (trackerUrl: string) => {
      instance.pushTrackerUrl(trackerUrl)
    },
    [instance],
  )

  const pushAPIUrl = React.useCallback(
    (apiUrl: string) => {
      instance.pushApiUrl(apiUrl)
    },
    [instance],
  )

  const pushCrossDomainLinkingTimeout = React.useCallback(
    (timeout: number) => {
      instance.pushCrossDomainLinkingTimeout(timeout)
    },
    [instance],
  )

  const pushSessionCookieTimeout = React.useCallback(
    (seconds: number) => {
      instance.pushSessionCookieTimeout(seconds)
    },
    [instance],
  )

  const pushVisitorCookieTimeout = React.useCallback(
    (seconds: number) => {
      instance.pushVisitorCookieTimeout(seconds)
    },
    [instance],
  )

  const pushSecureCookie = React.useCallback(
    (secure: boolean) => {
      instance.pushSecureCookie(secure)
    },
    [instance],
  )

  const pushCookieNamePrefix = React.useCallback(
    (prefix: string) => {
      instance.pushCookieNamePrefix(prefix)
    },
    [instance],
  )

  const pushCookieDomain = React.useCallback(
    (domain: string) => {
      instance.pushCookieDomain(domain)
    },
    [instance],
  )

  const pushCookiePath = React.useCallback(
    (path: string) => {
      instance.pushCookiePath(path)
    },
    [instance],
  )

  const pushCookieSameSite = React.useCallback(
    (string: string) => {
      instance.pushCookieSameSite(string)
    },
    [instance],
  )

  const pushCookieConsentGiven = React.useCallback(() => {
    instance.pushCookieConsentGiven()
  }, [instance])

  const pushConsentGiven = React.useCallback(() => {
    instance.pushConsentGiven()
  }, [instance])

  const pushPagePerformanceTiming = React.useCallback(
    (...args: number[]) => {
      instance.pushPagePerformanceTiming(...args)
    },
    [instance],
  )

  const pushExcludedReferrers = React.useCallback(
    (domains: string | string[]) => {
      instance.pushExcludedReferrers(domains)
    },
    [instance],
  )

  const pushUserId = React.useCallback(
    (userId: string) => {
      instance.pushUserId(userId)
    },
    [instance],
  )

  return {
    isInitialized,
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
