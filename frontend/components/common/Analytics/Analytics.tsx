import { useEffect, useState } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import {
  GoogleAnalytics,
  sendGAEvent,
} from "@next/third-parties/google";
import {
  COOKIE_CONSENT_ACCEPTED_EVENT,
  GA_MEASUREMENT_ID,
  hasAnalyticsConsent,
  LINKEDIN_PARTNER_ID,
} from "../../../lib/analytics";

const Analytics = () => {
  const router = useRouter();
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    setConsented(hasAnalyticsConsent());

    const onConsent = () => setConsented(true);
    window.addEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, onConsent);
    return () =>
      window.removeEventListener(COOKIE_CONSENT_ACCEPTED_EVENT, onConsent);
  }, []);

  useEffect(() => {
    if (!consented || !GA_MEASUREMENT_ID) return;

    const onRouteChange = (url: string) => {
      sendGAEvent("event", "page_view", {
        page_path: url,
      });
    };

    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [consented, router.events]);

  if (!consented) return null;

  return (
    <>
      {GA_MEASUREMENT_ID ? <GoogleAnalytics gaId={GA_MEASUREMENT_ID} /> : null}
      {LINKEDIN_PARTNER_ID ? (
        <>
          <Script id="linkedin-insight-init" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            `}
          </Script>
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              (function(l) {
                if (!l) {
                  window.lintrk = function(a, b) { window.lintrk.q.push([a, b]); };
                  window.lintrk.q = [];
                }
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";
                b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${LINKEDIN_PARTNER_ID}&fmt=gif`}
            />
          </noscript>
        </>
      ) : null}
    </>
  );
};

export default Analytics;
