/* global injectedGlue */
const locationChangedEvent = new Event('locationchange')
const pushStateEvent = new Event('pushState')
const replaceStateEvent = new Event('replaceState')

history.pushState = (f =>
  function pushState() {
    const ret = f.apply(this, arguments)
    window.dispatchEvent(pushStateEvent)
    window.dispatchEvent(locationChangedEvent)
    return ret
  })(history.pushState)

history.replaceState = (f =>
  function replaceState() {
    const ret = f.apply(this, arguments)
    window.dispatchEvent(replaceStateEvent)
    window.dispatchEvent(locationChangedEvent)
    return ret
  })(history.replaceState)

window.addEventListener('popstate', () => {
  window.dispatchEvent(locationChangedEvent)
})

const stockExchangesMap = {
  LN: 'London-Stock-Exchange-LSE',
  // XNAS: 'NASDAQ-Stock-Market',
  US: 'New-York-Stock-Exchange-NYSE',
  GR: 'Frankfurt-Stock-Exchange-FWB',
}

const [
  instrumentName,
  stockExchange,
] = injectedGlue.windows.my().context.ticker.split(':')

if (
  window.location.href !==
  `https://market24hclock.com/Trading-Hours/Trading-Hours-of-${stockExchangesMap[stockExchange]}`
) {
  window.location.href = `https://market24hclock.com/Trading-Hours/Trading-Hours-of-${stockExchangesMap[stockExchange]}`
}

const marketClock = document.getElementsByClassName('trading-hours')[0].scrollIntoView()
