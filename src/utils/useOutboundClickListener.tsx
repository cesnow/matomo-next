'use client'

import * as React from 'react'
import { MatomoInstance } from '../types'

const useOutboundClickListener = (
  matomoInstance: MatomoInstance,
  isLinkTrackingEnabled: boolean,
): void => {
  const handleOutboundClick = (event: MouseEvent) => {
    // The target is not guaranteed to be a link, it could be a child element.
    // Look up the element's parent until the anchor element is found.
    const findLinkElement = (el: EventTarget | null): HTMLElement | null => {
      if (el instanceof HTMLAnchorElement && el.href) {
        return el
      }
      if (el instanceof HTMLElement && el.parentElement) {
        return findLinkElement(el.parentElement)
      }
      return null
    }

    const target = findLinkElement(event.target)

    if (!(target instanceof HTMLAnchorElement)) {
      return
    }

    const { href } = target

    // Check if the click target differs from the current hostname, meaning it's external
    if (
      !href.match(
        new RegExp(
          `^(http://www.|https://www.|http://|https://)+(${window.location.hostname})`,
        ),
      )
    ) {
      matomoInstance.trackLink({ href })
    }
  }

  React.useEffect(() => {
    if (!matomoInstance) return
    if (!isLinkTrackingEnabled) return

    window.document.addEventListener('click', handleOutboundClick, {
      capture: true,
    })

    return () =>
      window.document.removeEventListener('click', handleOutboundClick, {
        capture: true,
      })
  }, [matomoInstance, isLinkTrackingEnabled])
}

export default useOutboundClickListener
