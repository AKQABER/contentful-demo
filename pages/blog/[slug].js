import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { getEntries, getEntry } from '../../modules/contentful';
import renderComponent from '../../modules/renderComponent';

export async function getStaticProps({ params }) {
  const blog = await getEntry('blogPost', params.slug);

  return {
    props: {
      blog,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const blogs = await getEntries('blogPost');

  return {
    paths: blogs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

const Blog = props => {
  const router = useRouter();

  const { data: blog } = useSWR(['blogPost', props.slug], getEntry, {
    initialData: props.blog,
    revalidateOnMount: true,
  });

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <Head>
        <title>{blog.title}</title>
      </Head>
      <Link href="/">
        <h4>&laquo; Back to Home</h4>
      </Link>
      <h1>{blog.title}</h1>
      {blog.content.map(content => {
        return renderComponent(content);
      })}
    </div>
  );
};

export default Blog;
