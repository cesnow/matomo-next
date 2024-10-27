export interface WindowMatomoDOM {
  addEventListener: (event: string, handler: EventListener) => void
  onLoad: () => void
  onReady: () => void
  isNodeVisible: (node: HTMLElement) => boolean
  isOrWasNodeVisible: (node: HTMLElement) => boolean
}

export interface WindowMatomoJSON {
  parse: (text: string) => any
  stringify: (value: any) => string
  rawJSON: (text: string) => any
  isRawJSON: (value: any) => boolean
}

export interface WindowMatomoPlugin {
  addPlugin: (pluginName: string, plugin: any) => void
  retryMissedPluginCalls: () => void
}

export interface WindowMatomoInstance {
  addDownloadExtensions: (extensions: string) => void
  addEcommerceItem: (
    sku: string,
    name?: string,
    category?: string,
    price?: number,
    quantity?: number,
  ) => void
  addListener: (event: string, listener: () => void) => void
  addPlugin: (pluginName: string, plugin: any) => void
  addTracker: (url: string, siteId: number) => void
  alwaysUseSendBeacon: () => void
  appendToTrackingUrl: (queryString: string) => void
  areCookiesEnabled: () => boolean
  clearEcommerceCart: () => void
  deleteCookies: () => void
  deleteCustomDimension: (index: number) => void
  deleteCustomVariable: (index: number, scope: string) => void
  deleteCustomVariables: (scope: string) => void
  disableAlwaysUseSendBeacon: () => void
  disableBrowserFeatureDetection: () => void
  disableCampaignParameters: () => void
  disableCookies: () => void
  disableCrossDomainLinking: () => void
  disableHeartBeatTimer: () => void
  disablePerformanceTracking: () => void
  disableQueueRequest: () => void
  discardHashTag: (value: string) => void
  enableBrowserFeatureDetection: () => void
  enableCrossDomainLinking: () => void
  enableFileTracking: () => void
  enableHeartBeatTimer: (delayInSeconds: number) => void
  enableJSErrorTracking: () => void
  enableLinkTracking: (element?: HTMLElement) => void
  forgetConsentGiven: () => void
  forgetCookieConsentGiven: () => void
  forgetUserOptOut: () => void
  getAttributionCampaignKeyword: () => string | null
  getAttributionCampaignName: () => string | null
  getAttributionInfo: () => string | null
  getAttributionReferrerTimestamp: () => number | null
  getAttributionReferrerUrl: () => string | null
  getCookie: (name: string) => string | null
  getCookieDomain: () => string
  getCookiePath: () => string
  getCrossDomainLinkingUrlParameter: () => string
  getCurrentUrl: () => string
  getCustomData: () => Record<string, any>
  getCustomDimension: (index: number) => string | null
  getCustomVariable: (index: number, scope: string) => string | null
  getEcommerceItems: () => Array<[string, string?, string?, number?, number?]>
  getLinkTrackingTimer: () => number
  getMatomoUrl: () => string
  getNumTrackedPageViews: () => number
  getPageViewId: () => string
  getPiwikUrl: () => string
  getRememberedConsent: () => boolean
  getRememberedCookieConsent: () => boolean
  getRequest: (parameters: Record<string, any>) => string
  getSessionCookieTimeout: () => number
  getSiteId: () => number
  getTrackerUrl: () => string
  getUserId: () => string | null
  getVisitorId: () => string
  getVisitorInfo: () => any[]
  hasConsent: () => boolean
  hasCookies: () => boolean
  hasRememberedConsent: () => boolean
  isConsentRequired: () => boolean
  isCrossDomainLinkingEnabled: () => boolean
  isUserOptedOut: () => boolean
  killFrame: () => void
  logAllContentBlocksOnPage: () => void
  optUserOut: () => void
  ping: () => void
  queueRequest: (request: string, url: string) => void
  redirectFile: (url: string) => void
  rememberConsentGiven: (rememberConsent: boolean) => void
  rememberCookieConsentGiven: (rememberConsent: boolean) => void
  removeDownloadExtensions: (extensions: string) => void
  removeEcommerceItem: (sku: string) => void
  requireConsent: () => void
  requireCookieConsent: () => void
  resetUserId: () => void
  setAPIUrl: (url: string) => void
  setCampaignKeywordKey: (key: string) => void
  setCampaignNameKey: (key: string) => void
  setConsentGiven: (isConsentGiven: boolean) => void
  setConversionAttributionFirstReferrer: (isFirstReferrer: boolean) => void
  setCookieConsentGiven: () => void
  setCookieDomain: (domain: string) => void
  setCookieNamePrefix: (prefix: string) => void
  setCookiePath: (path: string) => void
  setCookieSameSite: (sameSite: string) => void
  setCountPreRendered: (isPreRendered: boolean) => void
  setCrossDomainLinkingTimeout: (timeout: number) => void
  setCustomData: (key: string, value: any) => void
  setCustomDimension: (index: number, value: string) => void
  setCustomRequestProcessing: (callback: (request: string) => void) => void
  setCustomUrl: (url: string) => void
  setCustomVariable: (
    index: number,
    name: string,
    value: string,
    scope: string,
  ) => void
  setDoNotTrack: (enabled: boolean) => void
  setDocumentTitle: (title: string) => void
  setDomains: (domains: string[]) => void
  setDownloadClasses: (classes: string) => void
  setDownloadExtensions: (extensions: string) => void
  setEcommerceView: (
    sku: string,
    name?: string,
    category?: string,
    price?: number,
  ) => void
  setExcludedQueryParams: (params: string[]) => void
  setExcludedReferrers: (referrers: string[]) => void
  setGenerationTimeMs: (generationTimeMs: number) => void
  setIgnoreClasses: (classes: string) => void
  setLinkClasses: (classes: string) => void
  setLinkTrackingTimer: (delay: number) => void
  setPagePerformanceTiming: (
    networkTime: number,
    serverTime: number,
    transferTime: number,
    domProcessingTime: number,
    domInteractiveTime: number,
    contentLoadTime: number,
  ) => void
  setPageViewId: (pageViewId: string) => void
  setReferralCookieTimeout: (timeout: number) => void
  setReferrerUrl: (url: string) => void
  setRequestContentType: (type: string) => void
  setRequestMethod: (method: string) => void
  setRequestQueueInterval: (interval: number) => void
  setSecureCookie: (isSecure: boolean) => void
  setSessionCookie: (
    isSessionCookie: boolean,
    isCrossDomain: boolean,
    cookieTimeout: number,
  ) => void
  setSessionCookieTimeout: (timeout: number) => void
  setSiteId: (siteId: number) => void
  setTrackerUrl: (url: string) => void
  setUserId: (userId: string) => void
  setVisitorCookieTimeout: (timeout: number) => void
  setVisitorId: (visitorId: string) => void
  storeCustomVariablesInCookie: () => void
  trackAllContentImpressions: () => void
  trackContentImpression: (name: string, piece: string, target?: string) => void
  trackContentImpressionsWithinNode: (node: HTMLElement) => void
  trackContentInteraction: (
    interaction: string,
    name: string,
    piece: string,
    target?: string,
  ) => void
  trackContentInteractionNode: (node: HTMLElement, interaction: string) => void
  trackEcommerceCartUpdate: (grandTotal: number) => void
  trackEcommerceOrder: (
    orderId: string,
    grandTotal: number,
    subTotal?: number,
    tax?: number,
    shipping?: number,
    discount?: number,
  ) => void
  trackEvent: (
    category: string,
    action: string,
    name?: string,
    value?: number,
    customData?: Record<string, any>,
    callback?: () => void,
  ) => void
  trackGoal: (
    idGoal: number,
    revenue?: number,
    customData?: Record<string, any>,
    callback?: () => void,
  ) => void
  trackLink: (
    url: string,
    linkType: string,
    customData?: Record<string, any>,
    callback?: () => void,
  ) => void
  trackPageView: (
    customTitle?: string,
    customData?: Record<string, any>,
    callback?: () => void,
  ) => void
  trackRequest: (
    parameters: string,
    requestMethod: string,
    requestContentType: string,
    requestData: string,
  ) => void
  trackSiteSearch: (
    keyword: string,
    category?: string,
    resultsCount?: number,
    customData?: Record<string, any>,
  ) => void
  trackVisibleContentImpressions: (threshold: number, interval: number) => void
}

export interface WindowMatomoTracker {
  addTracker: (url: string, siteId: number) => void
  getAsyncTracker: () => WindowMatomoInstance
  getAsyncTrackers: () => WindowMatomoInstance[]
  getTracker: (url: string, siteId: number) => WindowMatomoInstance
}

export interface WindowMatomoEvent {
  off: (event: string, handler: EventListener) => void
  on: (event: string, handler: EventListener) => void
  trigger: (event: string, ...args: any[]) => void
}

export interface WindowMatomo
  extends WindowMatomoPlugin,
    WindowMatomoTracker,
    WindowMatomoEvent {
  DOM: WindowMatomoDOM
  JSON: WindowMatomoJSON
  initialized: boolean
}
