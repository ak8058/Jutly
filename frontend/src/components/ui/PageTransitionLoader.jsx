import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function PageTransitionLoader() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 2100);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="page-transition-loader" role="status" aria-live="polite">
      <p className="page-transition-loader__brand" aria-label="JUTLY">
        {["J", "U", "T", "L", "Y"].map((letter, index) => (
          <span
            className="page-transition-loader__letter"
            key={letter}
            style={{ animationDelay: `${index * 260}ms` }}
            aria-hidden="true"
          >
            {letter}
          </span>
        ))}
      </p>
    </div>
  );
}

export default PageTransitionLoader;
