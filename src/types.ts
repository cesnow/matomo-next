import { WindowMatomo } from './matomo.types'

export interface MatomoInstance {
  trackEvent: ({
    category,
    action,
    name,
    value,
    ...otherParams
  }: TrackEventParams) => void
  trackEvents: () => void
  trackPageView: (params?: TrackPageViewParams) => void
  trackSiteSearch: ({
    keyword,
    category,
    count,
    ...otherParams
  }: TrackSiteSearchParams) => void
  trackLink: ({ href, linkType }: TrackLinkParams) => void
  addTracker: (trackerUrl: string, siteId: number) => void
  enableFileTracking: () => void
  forgetCookieConsentGiven: () => void
  requireCookieConsent: () => void
  disableBrowserFeatureDetection: () => void
  disableCampaignParameters: () => void
  disableCookies: () => void
  enableCrossDomainLinking: () => void
  disableAlwaysUseSendBeacon: () => void
  requireConsent: () => void
  disablePerformanceTracking: () => void
  pushCustomDimension: (dimension: CustomDimension) => MatomoInstance
  pushCustomDimensions: (dimensions: CustomDimension[]) => MatomoInstance
  pushUserId: (userId: string) => void
  pushSiteId: (siteId: number) => void
  pushDomains: (domains: string[]) => void
  pushVisitorId: (visitorId: string) => void
  pushTrackerUrl: (trackerUrl: string) => void
  pushApiUrl: (apiUrl: string) => void
  pushCrossDomainLinkingTimeout: (timeout: number) => void
  pushVisitorCookieTimeout: (seconds: number) => void
  pushReferralCookieTimeout: (seconds: number) => void
  pushSessionCookieTimeout: (seconds: number) => void
  pushSecureCookie: (secure: boolean) => void
  pushCookieNamePrefix: (prefix: string) => void
  pushCookieDomain: (domain: string) => void
  pushCookiePath: (path: string) => void
  pushCookieSameSite: (string: string) => void
  pushCookieConsentGiven: () => void
  pushConsentGiven: () => void
  pushPagePerformanceTiming: (...args: number[]) => void
  pushExcludedReferrers: (domains: string | string[]) => void
  pushInstruction: (name: string, ...args: any[]) => MatomoInstance
}

export interface CustomDimension {
  id: number
  value: string | undefined
  keepAfterOperation?: boolean
}

export interface UserOptions {
  urlBase: string
  siteId: number
  userId?: string
  permanentTitle?: string
  permanentHref?: string
  trackerUrl?: string
  srcUrl?: string
  disabled?: boolean
  heartBeat?: {
    active: boolean
    seconds?: number
  }
  linkTracking?: boolean
  configurations?: {
    [key: string]: any
  }
}
export type InstanceParams = UserOptions

export interface TrackPageViewParams {
  documentTitle?: string
  href?: string | Location
  customDimensions?: CustomDimension[]
}

export interface TrackParams extends TrackPageViewParams {
  data: any[]
}

export interface TrackEventParams extends TrackPageViewParams {
  category: string
  action: string
  name?: string
  value?: number
}

export interface TrackLinkParams {
  href: string
  linkType?: 'download' | 'link'
}

export interface TrackSiteSearchParams extends TrackPageViewParams {
  keyword: string
  category?: string | boolean
  count?: number | boolean
}

export interface TrackEcommerceOrderParams {
  orderId: string
  orderRevenue: number
  orderSubTotal?: number
  taxAmount?: number
  shippingAmount?: number
  discountOffered?: boolean
}

export interface AddEcommerceItemParams {
  sku: string
  productName?: string
  productCategory?: string
  productPrice?: number
  productQuantity?: number
}

export interface RemoveEcommerceItemParams {
  sku: string
}

export interface SetEcommerceViewParams {
  sku: string | boolean
  productName?: string | boolean
  productCategory?: string
  productPrice?: number
}

declare global {
  interface Window {
    _paq: [string, ...any[]][]
    Matomo: WindowMatomo
  }
}
