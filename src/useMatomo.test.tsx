import { act, fireEvent, render, renderHook } from '@testing-library/react'
import React, { useEffect } from 'react'
import MatomoProvider from './MatomoProvider'
import useMatomo from './useMatomo'
import MatomoTracker from './MatomoTracker'

jest.mock('./MatomoTracker')

describe('useMatomo', () => {
  const JustAComponent = function () {
    const { trackPageView, trackEvent, instance, setInstance } = useMatomo()

    useEffect(() => {
      const instance = new MatomoTracker({
        urlBase: 'https://LINK.TO.DOMAIN',
        siteId: 3, // optional, default value: `1`
      })
      setInstance(instance)
    }, [])

    // Track page view after page load
    React.useEffect(() => {
      if (!instance) return
      trackPageView({
        documentTitle: 'Hello',
      })
    }, [instance, trackPageView])

    const handleOnClick = () => {
      trackEvent({ category: 'sample-page', action: 'click-event' })
    }

    return (
      <button type="button" data-testid="btn" onClick={handleOnClick}>
        Click me
      </button>
    )
  }
  it('should render, call trackPageView once and call trackEvent when clicking a button', () => {
    const trackEventMock = jest.fn()
    const trackPageViewMock = jest.fn()
    const mockedMatomoTracker = jest.mocked(MatomoTracker)

    mockedMatomoTracker.mockImplementation(
      () =>
        ({
          trackEvent: trackEventMock,
          trackPageView: trackPageViewMock,
        }) as unknown as MatomoTracker,
    )

    const Component = function () {
      return (
        <MatomoProvider>
          <JustAComponent />
        </MatomoProvider>
      )
    }

    const { getByTestId } = render(<Component />)
    expect(mockedMatomoTracker).toHaveBeenCalled()
    expect(trackPageViewMock).toHaveBeenCalled()

    fireEvent.click(getByTestId('btn'))

    expect(trackEventMock).toHaveBeenCalledWith({
      category: 'sample-page',
      action: 'click-event',
    })
  })

  it('memorizes the methods between renders', () => {
    const { result, rerender } = renderHook(() => useMatomo(), {
      wrapper: ({ children }) => <MatomoProvider>{children}</MatomoProvider>,
    })

    act(() => {
      const instance = new MatomoTracker({
        urlBase: 'https://LINK.TO.DOMAIN',
        siteId: 3, // optional, default value: `1`
      })
      result.current.setInstance(instance)
    })

    const originalMethods = result.current

    rerender()

    expect(Object.values(originalMethods)).toEqual(
      Object.values(result.current),
    )
  })

  it('check enable link tracking', () => {
    const { result, rerender } = renderHook(() => useMatomo(), {
      wrapper: ({ children }) => <MatomoProvider>{children}</MatomoProvider>,
    })

    act(() => {
      const instance = new MatomoTracker({
        urlBase: 'https://LINK.TO.DOMAIN',
        siteId: 3, // optional, default value: `1`
      })
      result.current.setInstance(instance)
    })

    const originalMethods = result.current

    rerender()

    act(() => {
      originalMethods.enableLinkTracking()
    })
    expect(result.current.isLinkTrackingEnabled).toEqual(true)
  })
})
