import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useState } from 'react';
import Collapse from './collapse';
import styles from './faq-list.module.css';

export default function FaqList({ sections, hx, isDark = false, nRendered }) {
  const rendered = nRendered ? sections.slice(0, nRendered) : sections;

  return (
    <div>
      {rendered.map(({ key, data: { title }, html }, i) => (
        <FaqSection
          key={key}
          id={key}
          title={title}
          html={html}
          hx={hx}
          isDark={isDark}
          isOpened={i === 0}
        />
      ))}
    </div>
  );
}

FaqList.propTypes = {
  sections: PropTypes.array.isRequired,
  hx: PropTypes.oneOf(['h2', 'h3']),
  isDark: PropTypes.bool,
  nRendered: PropTypes.number
};

function FaqSection({
  id,
  title,
  html,
  isDark,
  isOpened: defaultIsOpened = false,
  hx: Hx = 'h2'
}) {
  const [isOpened, setIsOpened] = useState(defaultIsOpened);

  return (
    <section className="mt-2" id={id}>
      <header
        className={classNames(styles.header, 'px-4', {
          [styles.dark]: isDark
        })}
      >
        <a
          className={isOpened ? styles.active : undefined}
          href={`#${id}`}
          onClick={e => {
            e.preventDefault();
            setIsOpened(!isOpened);
          }}
        >
          <Hx>{title}</Hx>

          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
          </svg>
        </a>
      </header>

      <Collapse isOpened={isOpened}>
        <div
          className={`${styles.content} px-4 pt-4`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Collapse>
    </section>
  );
}

FaqSection.propTypes = {
  isOpened: PropTypes.bool,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
  isDark: PropTypes.bool,
  hx: PropTypes.oneOf(['h2', 'h3'])
};