import path from 'path';
import { parseMarkdown } from '../utils/markdown';
import Layout from '../components/layout';
import Article from '../components/article';
import PressList from '../components/press-list';

export default function Press({ data: { title, entries } = {} }) {
  return (
    <Layout>
      <Article title={title}>
        <div className="col-10">
          <PressList entries={entries} />
        </div>
      </Article>
    </Layout>
  );
}

export async function getStaticProps(context) {
  const props = await parseMarkdown(
    path.join(process.cwd(), 'content', 'press.md')
  );

  return { props };
}
