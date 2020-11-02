import PropTypes from 'prop-types';
import styles from './featured-articles.module.css';

export default function FeaturedArticles({ entries }) {
  const featured = entries
    .filter(e => e.isFeaturedIndex != null)
    .sort((a, b) => {
      return a.isFeaturedIndex - b.isFeaturedIndex;
    });

  return (
    <ul className={styles.list}>
      {featured.map(({ contentUrl, source, title, img }) => (
        <li key={contentUrl}>
          <a href={contentUrl}>
            <span>
              <img src={`${process.env.publicPrefix}${img}`} />
            </span>
            <span>
              <span>{title}</span>
              <span>{source}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

FeaturedArticles.propTypes = {
  entries: PropTypes.array.isRequired
};
