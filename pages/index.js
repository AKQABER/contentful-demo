import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { getLocalisedEntries, getEntries } from '../modules/contentful';

export async function getStaticProps() {
  const recipes = await getEntries('recipe');
  const blogs = await getLocalisedEntries('blogPostGlobal');

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

  const blogs = useSWR('blogPostGlobal', getLocalisedEntries, {
    initialData: props.blogs,
    revalidateOnMount: true,
  }).data;

  return (
    <div className="container">
      <Head>
        <title>Recipes</title>
      </Head>
      <h1>Recipes</h1>
      <div className="locale-switch">
        <ul>
          <li>
            <Link href="/en">English</Link>
          </li>
          <li>
            <Link href="/de">Deutsch</Link>
          </li>
        </ul>
      </div>
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
              <p key={blog.slug}>
                <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
