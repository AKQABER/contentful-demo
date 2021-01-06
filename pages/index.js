import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { getEntries } from '../modules/contentful';

export async function getStaticProps() {
  const recipes = await getEntries('recipe');
  const blogs = await getEntries('blogPost');

  return {
    props: {
      recipes,
      blogs,
    },
  };
}

const Index = props => {
  const recipes = useSWR('recipe', getEntries, {
    initialData: props.recipes,
    revalidateOnMount: true,
  }).data;
  const blogs = useSWR('blogPost', getEntries, {
    initialData: props.blogs,
    revalidateOnMount: true,
  }).data;

  return (
    <div className="container">
      <Head>
        <title>Recipes</title>
      </Head>
      <h1>Recipes</h1>
      <div className="recipes-container">
        {recipes.length &&
          recipes.map(recipe => (
            <Link key={recipe.slug} href={`/recipes/${recipe.slug}`}>
              <div className="recipe-link">
                <img
                  src={recipe.mainImage.fields.file.url}
                  alt={recipe.title}
                />
                {recipe.title}
              </div>
            </Link>
          ))}
      </div>
      <h1>Content</h1>
      <div className="contents-container">
        <div>
          <h2>Blogs</h2>
          {blogs.length &&
            blogs.map(blog => (
              <Link key={blog.slug} href={`/blog/${blog.slug}`}>
                {blog.title}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
