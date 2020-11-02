import path from 'path';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Home from '../components/home';
import { parseMarkdown } from '../utils/markdown';

export default function HomePage({ pressData, faqData }) {
  return (
    <Layout header={false}>
      <Home pressData={pressData} faqData={faqData} />
    </Layout>
  );
}

HomePage.propTypes = {
  pressData: PropTypes.object,
  faqData: PropTypes.object
};

export async function getStaticProps(context) {
  const faqData = await parseMarkdown(
    path.join(process.cwd(), 'content', 'faq.md')
  );
  const pressData = await parseMarkdown(
    path.join(process.cwd(), 'content', 'press.md')
  );

  return { props: { faqData, pressData } };
}
