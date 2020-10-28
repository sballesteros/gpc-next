import { useEffect, useState } from 'react';

export default function StatusBar() {
  const [hasGpc, setHasGpc] = useState(undefined);

  useEffect(() => {
    setHasGpc(!!navigator.globalPrivacyControl);
  }, []);

  if (hasGpc === undefined) {
    return null;
  }

  return (
    <div className="status-bar">
      <div className="container">
        <div className="row justify-content-center align-items-center py-3">
          <div className="text-center">
            <span
              className={`d-inline-block status-dot rounded-circle mr-2 status-dot--${
                hasGpc ? 'green' : 'red'
              }`}
              style={{
                backgroundColor: hasGpc ? '#058A5E' : 'de0000'
              }}
            ></span>
            <span className="status__text mb-0 text-center" id="status-text">
              {hasGpc ? (
                <>
                  Good news, GPC signal detected.
                  <br />
                  Click{' '}
                  <a href="https://global-privacy-control.glitch.me">here</a> to
                  test against the reference server.
                </>
              ) : (
                <>
                  GPC signal not detected.
                  <br />
                  Download a{' '}
                  <a href="/index.html#download">browser or extension</a> that
                  supports it.
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
