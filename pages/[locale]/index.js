import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import { getLocalisedEntries, getEntries } from '../../modules/contentful';

export async function getStaticProps({ params }) {
  const locale = params.locale;
  const recipes = await getEntries('recipe');
  const blogs = await getLocalisedEntries('blogPostGlobal', locale);

  return {
    props: {
      recipes,
      blogs,
      locale,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { locale: 'en' } }, { params: { locale: 'de' } }],
    fallback: false,
  };
}

const Index = props => {
  const recipes = useSWR('recipe', getEntries, {
    initialData: props.recipes,
    revalidateOnMount: true,
  }).data;

  const blogs = useSWR(['blogPostGlobal', props.locale], getLocalisedEntries, {
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
          <li className={props.locale === 'en' ? 'active' : ''}>
            <Link href="/en">English</Link>
          </li>
          <li className={props.locale === 'de' ? 'active' : ''}>
            <Link href="/de">Deutsch</Link>
          </li>
        </ul>
      </div>
      <div className="recipes-container">
        {recipes &&
          recipes.length &&
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
          {blogs &&
            blogs.length &&
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
