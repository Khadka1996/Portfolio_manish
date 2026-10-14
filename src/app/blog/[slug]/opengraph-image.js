import { ImageResponse } from 'next/og';
import { getAllPosts, getPost } from '@/lib/blog';

export const alt = 'Blog post by Manish Khadka';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function OgImage({ params }) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#05060a',
          backgroundImage: 'radial-gradient(circle at 85% 15%, #2a1b4d 0%, #05060a 45%)',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#1DCD9F', letterSpacing: 4 }}>
          {(post?.category || 'BLOG').toUpperCase()}
        </div>
        <div style={{ display: 'flex', fontSize: post && post.title.length > 70 ? 54 : 64, fontWeight: 700, lineHeight: 1.15 }}>
          {post?.title || 'Blog'}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9ca3af' }}>
          <span>Manish Khadka · Full Stack Developer</span>
          <span>khadka-manish.com.np</span>
        </div>
      </div>
    ),
    size
  );
}
