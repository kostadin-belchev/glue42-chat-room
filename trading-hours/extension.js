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
console.log('TCL: instrumentName', instrumentName)
console.log('TCL: stockExchange', stockExchange)

console.log('TCL: window.location.href 1', window.location.href)
if (
  window.location.href !==
  `https://market24hclock.com/Trading-Hours/Trading-Hours-of-${stockExchangesMap[stockExchange]}`
) {
  window.location.href = `https://market24hclock.com/Trading-Hours/Trading-Hours-of-${stockExchangesMap[stockExchange]}`
}

const marketClock = document.getElementById('marketsclocks').scrollIntoView()
console.log('TCL: marketClock', marketClock)

console.log('TCL: window.href 2', window.location.href)
