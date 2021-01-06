import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import useSWR from 'swr';
import Clock from '../../components/Clock';
import { getEntries, getEntry } from '../../modules/contentful';

export async function getStaticProps({ params }) {
  const recipe = await getEntry('recipe', params.slug);
  return {
    props: {
      recipe,
      slug: params.slug,
    },
  };
}

export async function getStaticPaths() {
  const recipes = await getEntries('recipe');

  return {
    paths: recipes.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: true,
  };
}

const Recipe = props => {
  const router = useRouter();

  const { data: recipe } = useSWR(['recipe', props.slug], getEntry, {
    initialData: props.recipe,
    revalidateOnMount: true,
  });

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container">
      <Head>
        <title>{recipe.title}</title>
      </Head>
      <Link href="/">
        <h4>&laquo; Back to Home</h4>
      </Link>
      <h1>{recipe.title}</h1>
      <div className="description-container">
        <div>
          <p>{recipe.description}</p>
          <div className="duration-container">
            <Clock /> {recipe.duration}
          </div>
        </div>
        <div>
          <img src={recipe.mainImage.fields.file.url} alt={recipe.title} />
        </div>
      </div>
      <div className="steps-container">
        <h2>Directions</h2>
        {recipe.steps.map((step, index) => (
          <div className="recipe-step" key={`step-${index}`}>
            <div className="step-number">{index + 1}.</div>
            <div className="step-description">{step.fields.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipe;
