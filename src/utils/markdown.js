import { readFile } from 'fs/promises';
import matter from 'gray-matter';
import remark from 'remark';

export async function parseMarkdown(filePath) {
  const markdown = await readFile(filePath, 'utf8');

  const { data, content } = matter(markdown, { sections: true });
  let html = '';
  if (content) {
    html = (await remark().use(html).process(content)).toString();
  }
  return { data, html };
}
