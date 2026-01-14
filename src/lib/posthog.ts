import posthog from 'posthog-js'
const isDev = import.meta.env.MODE === 'development'
// Initialize PostHog with your public key and host, plus recommended defaults
posthog.init(
  import.meta.env.VITE_PUBLIC_POSTHOG_KEY as string,
  {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string,
    defaults: '2025-05-24',
    capture_exceptions: true, // enable Error Tracking
    debug: isDev,
    capture_pageview: !isDev,
    disable_session_recording: isDev
  }
)

export default posthog
