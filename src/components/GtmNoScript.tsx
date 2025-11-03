import { getGtmId } from '../analytics/gtm'

function GtmNoScript() {
  const gtmId = getGtmId()

  if (!gtmId) {
    return null
  }

  return (
    <noscript>
      <iframe
        title="Google Tag Manager"
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}

export default GtmNoScript
