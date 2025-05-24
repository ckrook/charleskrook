# Google Analytics Setup

This Next.js website includes Google Analytics 4 integration. Follow these steps to properly set up analytics tracking.

## Setup Instructions

1. Create a `.env.local` file in the root of your project if it doesn't already exist.

2. Add your Google Analytics Measurement ID to the `.env.local` file:

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

Replace `G-XXXXXXXXXX` with your actual Google Analytics Measurement ID.

3. Restart your development server after making these changes.

## How It Works

- The Google Analytics component is integrated into the root layout file and will load on all pages.
- Page views are automatically tracked as users navigate through the site.
- The setup includes SameSite cookie configuration for better cross-site tracking.
- The implementation uses Next.js Script component with the `afterInteractive` strategy for optimal performance.

## Privacy Considerations

- Make sure to include information about cookies and tracking in your site's privacy policy.
- Consider implementing a cookie consent mechanism for GDPR compliance if your site targets European users.

## Testing Your Implementation

1. Run your site in development mode
2. Open the browser developer tools and check the Network tab
3. Filter for "google" to see if the analytics scripts are loading
4. You can also check the Google Analytics real-time dashboard to confirm events are being tracked

## Additional Analytics Events

You can track custom events by calling the gtag function:

```javascript
window.gtag("event", "button_click", {
  event_category: "engagement",
  event_label: "hero_cta",
});
```
