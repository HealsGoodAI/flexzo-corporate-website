import { useEffect, useRef, useCallback } from "react";

const SITE_KEY = "6LefSngsAAAAABzyZ46TVseQ7_SJpFY34gQYLBkg";

interface ReCaptchaProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
}

declare global {
  interface Window {
    grecaptcha: {
      render: (container: HTMLElement, params: Record<string, unknown>) => number;
      getResponse: (widgetId?: number) => string;
      reset: (widgetId?: number) => void;
      ready: (cb: () => void) => void;
    };
  }
}

const ReCaptcha = ({ onVerify, onExpire }: ReCaptchaProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const renderedRef = useRef(false);

  const handleVerify = useCallback((token: string) => {
    onVerify(token);
  }, [onVerify]);

  const handleExpire = useCallback(() => {
    onExpire?.();
  }, [onExpire]);

  useEffect(() => {
    if (renderedRef.current || !containerRef.current) return;

    const renderWidget = () => {
      if (!containerRef.current || renderedRef.current) return;
      renderedRef.current = true;
      widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: handleVerify,
        "expired-callback": handleExpire,
      });
    };

    if (window.grecaptcha?.render) {
      window.grecaptcha.ready(renderWidget);
    } else {
      const interval = setInterval(() => {
        if (window.grecaptcha?.render) {
          clearInterval(interval);
          window.grecaptcha.ready(renderWidget);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [handleVerify, handleExpire]);

  return <div ref={containerRef} className="my-2" />;
};

export default ReCaptcha;
