import Head from 'next/head';
import styles from './layout.module.css';
import Navbar from './navbar';
import StatusBar from './status-bar';

export default function Layout({ children, header = true }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <!-- GPC STATUS --> */}
      <aside className="status status--light py-1 px-3 px-sm-4">
        <StatusBar />
      </aside>

      {header && (
        <header className={styles.header}>
          <div className="container">
            <div className="row no-gutters justify-content-center">
              <div className={`col-10 ${styles.navWrapper}`}>
                <Navbar />
              </div>
            </div>
          </div>
        </header>
      )}

      <main>{children}</main>

      {/* <!-- CONTACT SECTION --> */}
      <section
        id="contact"
        className="contact section section--green text-center"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6">
              <h1 className="contact__title">Get Involved</h1>

              <p className="contact__text">
                Contact us to learn more about becoming a Participating
                Organization and supporting GPC on your browser, app or website.
              </p>
              <a
                className="d-block contact__link"
                href="mailto:info@globalprivacycontrol.org"
              >
                info@globalprivacycontrol.org
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FOOTER --> */}
      <footer className="footer">
        <div className="container">
          <div className="row text-center">
            <div className="col">
              <p className="mb-0">
                This site is hosted by <a href="https://github.com">GitHub</a>{' '}
                and is subject to its{' '}
                <a href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement">
                  Privacy Policy
                </a>
                and{' '}
                <a href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-terms-of-service">
                  Terms of Service
                </a>
                .
              </p>
              <p className="mb-0">
                Content on this site is licensed under a Creative Commons
                Attribution 4.0 International license. This license does not
                apply to any logos or marks on this site.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
