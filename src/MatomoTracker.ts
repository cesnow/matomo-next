import { TRACK_TYPES } from './constants'
import {
  AddEcommerceItemParams,
  CustomDimension,
  MatomoInstance,
  RemoveEcommerceItemParams,
  SetEcommerceViewParams,
  TrackEcommerceOrderParams,
  TrackEventParams,
  TrackLinkParams,
  TrackPageViewParams,
  TrackParams,
  TrackSiteSearchParams,
  UserOptions,
} from './types'

class MatomoTracker implements MatomoInstance {
  private mutationObserver?: MutationObserver

  private permanentTitle: string | undefined

  private permanentHref: string | undefined

  constructor(userOptions: UserOptions) {
    if (!userOptions.urlBase) {
      throw new Error('Matomo urlBase is required.')
    }
    if (!userOptions.siteId) {
      throw new Error('Matomo siteId is required.')
    }

    this.initialize(userOptions)
  }

  private initialize({
    urlBase,
    siteId,
    userId,
    permanentTitle,
    permanentHref,
    trackerUrl,
    srcUrl,
    disabled,
    heartBeat,
    linkTracking = false,
    configurations = {},
  }: UserOptions) {
    const normalizedUrlBase =
      urlBase[urlBase.length - 1] !== '/' ? `${urlBase}/` : urlBase

    if (typeof window === 'undefined') {
      return
    }

    this.permanentTitle = permanentTitle
    this.permanentHref = permanentHref

    window._paq = window._paq || []

    if (window._paq.length !== 0) {
      return
    }

    if (disabled) {
      return
    }

    this.pushInstruction(
      'setTrackerUrl',
      trackerUrl || `${normalizedUrlBase}matomo.php`,
    )

    this.pushInstruction('setSiteId', siteId)

    if (userId) this.pushUserId(userId)

    Object.entries(configurations).forEach(([name, instructions]) => {
      if (instructions instanceof Array) {
        this.pushInstruction(name, ...instructions)
      } else {
        this.pushInstruction(name, instructions)
      }
    })

    // accurately measure the time spent on the last page view of a visit
    if (!heartBeat || (heartBeat && heartBeat.active)) {
      this.enableHeartBeatTimer((heartBeat && heartBeat.seconds) ?? 15)
    }

    // // measure outbound links and downloads
    // // might not work accurately on SPAs because new links (dom elements) are created dynamically without a server-side page reload.
    if (linkTracking) this.enableLinkTracking(linkTracking)

    const scriptElement = document.createElement('script')
    const scripts = document.getElementsByTagName('script')[0]

    scriptElement.type = 'text/javascript'
    scriptElement.async = true
    scriptElement.defer = true
    scriptElement.src = srcUrl || `${normalizedUrlBase}matomo.js`

    if (scripts && scripts.parentNode) {
      scripts.parentNode.insertBefore(scriptElement, scripts)
    }
  }

  // Install a Heart beat timer that will send additional requests to Matomo in order to better measure the time spent in the visit.
  enableHeartBeatTimer(seconds: number): void {
    this.pushInstruction('enableHeartBeatTimer', seconds)
  }

  // Install link tracking on all applicable link elements.
  enableLinkTracking(active: boolean): void {
    this.pushInstruction('enableLinkTracking', active)
  }

  // Enable tracking of file:// protocol actions. By default, the file:// protocol is not tracked.
  enableFileTracking(): void {
    this.pushInstruction('enableFileTracking')
  }

  private trackEventsForElements(elements: HTMLElement[]) {
    if (elements.length) {
      elements.forEach((element) => {
        element.addEventListener('click', () => {
          const { matomoCategory, matomoAction, matomoName, matomoValue } =
            element.dataset
          if (matomoCategory && matomoAction) {
            this.trackEvent({
              category: matomoCategory,
              action: matomoAction,
              name: matomoName,
              value: Number(matomoValue),
            })
          } else {
            throw new Error(
              `Error: data-matomo-category and data-matomo-action are required.`,
            )
          }
        })
      })
    }
  }

  // Tracks events based on data attributes
  trackEvents(): void {
    const matchString = '[data-matomo-event="click"]'
    let firstTime = false
    if (!this.mutationObserver) {
      firstTime = true
      this.mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            // only track HTML elements
            if (!(node instanceof HTMLElement)) return

            // check the inserted element for being a code snippet
            if (node.matches(matchString)) {
              this.trackEventsForElements([node])
            }

            const elements = Array.from(
              node.querySelectorAll<HTMLElement>(matchString),
            )
            this.trackEventsForElements(elements)
          })
        })
      })
    }
    this.mutationObserver.observe(document, { childList: true, subtree: true })

    // Now track all already existing elements
    if (firstTime) {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(matchString),
      )
      this.trackEventsForElements(elements)
    }
  }

  stopObserving(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  }

  // Tracks events
  // https://matomo.org/docs/event-tracking/#tracking-events
  trackEvent({
    category,
    action,
    name,
    value,
    ...otherParams
  }: TrackEventParams): void {
    if (category && action) {
      this.track({
        data: [TRACK_TYPES.TRACK_EVENT, category, action, name, value],
        ...otherParams,
      })
    } else {
      throw new Error(`Error: category and action are required.`)
    }
  }

  // Tracks site search
  // https://developer.matomo.org/guides/tracking-javascript-guide#internal-search-tracking
  trackSiteSearch({
    keyword,
    category,
    count,
    ...otherParams
  }: TrackSiteSearchParams): void {
    if (keyword) {
      this.track({
        data: [TRACK_TYPES.TRACK_SEARCH, keyword, category, count],
        ...otherParams,
      })
    } else {
      throw new Error(`Error: keyword is required.`)
    }
  }

  // Tracks outgoing links to other sites and downloads
  // https://developer.matomo.org/guides/tracking-javascript-guide#enabling-download-outlink-tracking
  trackLink({ href, linkType = 'link' }: TrackLinkParams): void {
    this.pushInstruction(TRACK_TYPES.TRACK_LINK, href, linkType)
  }

  // Tracks page views
  // https://developer.matomo.org/guides/spa-tracking#tracking-a-new-page-view
  trackPageView(params?: TrackPageViewParams): void {
    this.track({ data: [TRACK_TYPES.TRACK_VIEW], ...params })
  }

  // Adds a product to an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  // https://matomo.org/docs/ecommerce-analytics/#1-addecommerceitemproductsku-productname-productcategory-price-quantity
  addEcommerceItem({
    sku,
    productName,
    productCategory,
    productPrice = 0.0,
    productQuantity = 1,
  }: AddEcommerceItemParams): void {
    this.pushInstruction(
      'addEcommerceItem',
      sku,
      productName,
      productCategory,
      productPrice,
      productQuantity,
    )
  }

  // Removes a product from an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  removeEcommerceItem({ sku }: RemoveEcommerceItemParams): void {
    this.pushInstruction('removeEcommerceItem', sku)
  }

  // Removes all products from an Ecommerce order to be tracked via trackEcommerceOrder.
  // https://matomo.org/docs/ecommerce-analytics
  clearEcommerceCart(): void {
    this.pushInstruction('clearEcommerceCart')
  }

  // Tracks an Ecommerce order containing items added via addEcommerceItem.
  // https://matomo.org/docs/ecommerce-analytics/#2-trackecommerceorderorderid-revenue-subtotal-tax-shipping-discount
  trackEcommerceOrder({
    orderId,
    orderRevenue,
    orderSubTotal,
    taxAmount,
    shippingAmount,
    discountOffered = false,
  }: TrackEcommerceOrderParams): void {
    this.track({
      data: [
        TRACK_TYPES.TRACK_ECOMMERCE_ORDER,
        orderId,
        orderRevenue,
        orderSubTotal,
        taxAmount,
        shippingAmount,
        discountOffered,
      ],
    })
  }

  // Tracks updates to an Ecommerce Cart before an actual purchase.
  // This will replace currently tracked information of the cart. Always include all items of the updated cart!
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-an-ecommerce-cart-update-containing-two-products
  trackEcommerceCartUpdate(amount: number): void {
    this.pushInstruction(TRACK_TYPES.TRACK_ECOMMERCE_CART_UPDATE, amount)
  }

  // Marks the next page view as an Ecommerce product page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-product-page-view
  setEcommerceView({
    sku,
    productName,
    productCategory,
    productPrice,
  }: SetEcommerceViewParams): void {
    this.pushInstruction(
      'setEcommerceView',
      sku,
      productName,
      productCategory,
      productPrice,
    )
  }

  // Marks the next tracked page view as an Ecommerce category page.
  // https://matomo.org/docs/ecommerce-analytics/#example-tracking-a-category-page-view
  setEcommerceCategoryView(productCategory: string): void {
    this.setEcommerceView({ productCategory, productName: false, sku: false })
  }

  pushCustomDimension(customDimension: CustomDimension): MatomoTracker {
    return this.pushInstruction(
      'setCustomDimension',
      customDimension.id,
      customDimension.value,
    )
  }

  pushCustomDimensions(customDimensions: CustomDimension[]): MatomoTracker {
    if (!this.arrayHasValues(customDimensions))
      // Early exit
      return this

    customDimensions.map((customDimension: CustomDimension) =>
      this.pushCustomDimension(customDimension),
    )
    return this
  }

  // Sets a User ID to this user (such as an email address or a username).
  pushUserId(userId: string): void {
    this.pushInstruction('setUserId', userId)
  }

  // Specify the website ID. Redundant: can be specified in getTracker() constructor.
  pushSiteId(siteId: number): void {
    this.pushInstruction('setSiteId', siteId)
  }

  // Set array of hostnames or domains to be treated as local.
  //   For wildcard subdomains, you can use: setDomains('.example.com'); or setDomains('*.example.com');.
  //   You can also specify a path along a domain: setDomains('*.example.com/subsite1');
  pushDomains(domains: string[]): void {
    this.pushInstruction('setDomains', domains)
  }

  // visitorId needs to be a 16 digit hex string.
  // The visitorId won't be persisted in a cookie and needs to be set on every new page load.
  pushVisitorId(visitorId: string): void {
    const hexRegex = /^[0-9a-fA-F]{16}$/
    if (!hexRegex.test(visitorId)) {
      throw new Error('visitorId must be a 16 digit hex string.')
    }
    this.pushInstruction('setVisitorId', visitorId)
  }

  // Specify the Matomo server URL. Redundant: can be specified in getTracker() constructor.
  pushTrackerUrl(trackerUrl: string): void {
    this.pushInstruction('setTrackerUrl', trackerUrl)
  }

  // Specify the Matomo HTTP API URL endpoint.
  pushApiUrl(apiUrl: string): void {
    this.pushInstruction('setApiUrl', apiUrl)
  }

  // Set the cross domain linking timeout (in seconds).
  // By default, the two visits across domains will be linked together when the link is clicked and the page is loaded within a 180 seconds timeout window.`
  pushCrossDomainLinkingTimeout(timeout: number): void {
    this.pushInstruction('setCrossDomainLinkingTimeout', timeout)
  }

  // the default is 13 months
  pushVisitorCookieTimeout(seconds: number): void {
    this.pushInstruction('setVisitorCookieTimeout', seconds)
  }

  // the default is 6 months
  pushReferralCookieTimeout(seconds: number): void {
    this.pushInstruction('setReferralCookieTimeout', seconds)
  }

  // the default is 30 minutes
  pushSessionCookieTimeout(seconds: number): void {
    this.pushInstruction('setSessionCookieTimeout', seconds)
  }

  // set to true to enable the Secure cookie flag on all first party cookies.
  // This should be used when your website is only available under HTTPS so that all tracking cookies are always sent over secure connection.
  pushSecureCookie(secure: boolean): void {
    this.pushInstruction('setSecureCookie', secure)
  }

  // the default prefix is _pk_.
  pushCookieNamePrefix(prefix: string): void {
    this.pushInstruction('setCookieNamePrefix', prefix)
  }

  // the default is the document domain;
  //  if your website can be visited at both www.example.com and example.com,
  //  you would use: tracker.setCookieDomain('.example.com');
  //  or tracker.setCookieDomain('*.example.com');
  pushCookieDomain(domain: string): void {
    this.pushInstruction('setCookieDomain', domain)
  }

  // the default is '/'.
  pushCookiePath(path: string): void {
    this.pushInstruction('setCookiePath', path)
  }

  // defaults to Lax. Can be set to None or Strict.
  //  None requires all traffic to be on HTTPS and will also automatically set the secure cookie. It can be useful for example if the tracked website is an iframe. Strict only works if your Matomo and the website runs on the very same domain.
  pushCookieSameSite(string: string): void {
    this.pushInstruction('setCookieSameSite', string)
  }

  // Mark that the current user has consented to using cookies.
  //  The consent is one-time only, so in a subsequent browser session, the user will have to consent again. To remember cookie consent, see the method below: rememberCookieConsentGiven.
  pushCookieConsentGiven(): void {
    this.pushInstruction('setCookieConsentGiven')
  }

  // Mark that the current user has consented.
  //  The consent is one-time only, so in a subsequent browser session, the user will have to consent again. To remember consent, see the method below: rememberConsentGiven.
  pushConsentGiven(): void {
    this.pushInstruction('setConsentGiven')
  }

  // Manually set performance metrics in milliseconds in a Single Page App or when Matomo cannot detect some metrics.
  //  args: ([networkTimeInMs], [serverTimeInMs], [transferTimeInMs], [domProcessingTimeInMs], [domCompletionTimeInMs], [onloadTimeInMs])
  pushPagePerformanceTiming(...args: number[]): void {
    this.pushInstruction('setPagePerformanceTiming', ...args)
  }

  // Set array of hostnames or domains that should be ignored as referrers.
  pushExcludedReferrers(domains: string | string[]): void {
    if (typeof domains === 'string') {
      domains = [domains]
    }
    this.pushInstruction('setExcludedReferrers', domains)
  }

  // Remove a user's cookie consent, both if the consent was one-time only and if the consent was remembered.
  forgetCookieConsentGiven(): void {
    this.pushInstruction('forgetCookieConsentGiven')
  }

  // By default, the Matomo tracker assumes consent to using cookies.
  //  To change this behavior so no cookies are used by default, you must call requireCookieConsent.
  requireCookieConsent(): void {
    this.pushInstruction('requireCookieConsent')
  }

  // By default, Matomo accesses information from the visitor's browser to detect the current browser resolution and what browser plugins (for example PDF and cookies) are supported.
  disableBrowserFeatureDetection(): void {
    this.pushInstruction('disableBrowserFeatureDetection')
  }

  // By default, Matomo will send campaign parameters (mtm, utm, etc.)
  //  to the tracker and record that information.
  disableCampaignParameters(): void {
    this.pushInstruction('disableCampaignParameters')
  }

  // Disable all first party cookies.
  //  Existing Matomo cookies for this website will be deleted on the next page view.
  disableCookies(): void {
    this.pushInstruction('disableCookies')
  }

  // Enable cross domain linking.
  //  By default, the visitor ID that identifies a unique visitor is stored in the browser's first party cookies.
  enableCrossDomainLinking(): void {
    this.pushInstruction('enableCrossDomainLinking')
  }

  // Disables sending tracking requests using navigator.
  //  sendBeacon which is enabled by default.
  disableAlwaysUseSendBeacon(): void {
    this.pushInstruction('disableAlwaysUseSendBeacon')
  }

  // By default, the Matomo tracker assumes consent to tracking.
  //  To change this behavior so nothing is tracked until a user consents, you must call requireConsent.
  requireConsent(): void {
    this.pushInstruction('requireConsent')
  }

  // Disables page performance tracking.
  disablePerformanceTracking(): void {
    this.pushInstruction('disablePerformanceTracking')
  }

  // Adds a new tracker
  addTracker(trackerUrl: string, siteId: number): void {
    this.pushInstruction('addTracker', trackerUrl, siteId)
  }

  // Sends the tracked page/view/search to Matomo
  track({
    data = [],
    documentTitle = this.permanentTitle ?? window.document.title,
    href = this.permanentHref ?? window.location.href,
    customDimensions = [],
  }: TrackParams): void {
    if (data.length) {
      if (typeof href === 'object')
        // Probably of type location
        href = href.toString()
      else if (href.indexOf('http') !== 0) {
        href = window.location.origin + href + window.location.search
      }

      this.pushCustomDimensions(customDimensions)

      this.pushInstruction('setCustomUrl', href)
      this.pushInstruction('setDocumentTitle', documentTitle)
      this.pushInstruction(...(data as [string, ...any[]]))

      // Automatically remove any custom dimensions that were set.
      const dimensionsToReset = customDimensions
        .filter((cd) => cd.keepAfterOperation !== true)
        .map((cd) => ({
          ...cd,
          value: undefined,
        }))
      this.pushCustomDimensions(dimensionsToReset)
    }
  }

  /**
   * Pushes an instruction to Matomo for execution, this is equivalent to pushing entries into the `_paq` array.
   *
   * For example:
   *
   * ```ts
   * pushInstruction('setDocumentTitle', document.title)
   * ```
   * Is the equivalent of:
   *
   * ```ts
   * _paq.push(['setDocumentTitle', document.title]);
   * ```
   *
   * @param name The name of the instruction to be executed.
   * @param args The arguments to pass along with the instruction.
   */
  pushInstruction(name: string, ...args: any[]): MatomoTracker {
    window._paq.push([name, ...args])
    return this
  }

  arrayHasValues(customDimensions: CustomDimension[]): boolean {
    return !!(
      customDimensions &&
      Array.isArray(customDimensions) &&
      customDimensions.length
    )
  }
}

export default MatomoTracker
