const contentful = require('contentful');

const locales = {
  en: 'en-US',
  de: 'de-DE',
};

const getClient = () => {
  return contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: process.env.CONTENTFUL_SPACE,
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: process.env.CONTENTFUL_TOKEN,
  });
};

let client;

export const contentfulClient = () => {
  if (!client) {
    client = getClient();
  }

  return client;
};

export async function getLocalisedEntries(contentType, locale = 'de') {
  const entries = await contentfulClient().getEntries({
    content_type: contentType,
    locale: locales[locale],
  });

  const pages = entries.items.map(entry => entry.fields);
  return pages.map(page => page.post.fields);
}

export async function getEntries(contentType) {
  const entries = await contentfulClient().getEntries({
    content_type: contentType,
  });

  return entries.items.map(entry => entry.fields);
}

export async function getEntry(contentType, slug) {
  const entry = await contentfulClient().getEntries({
    'fields.slug': slug,
    content_type: contentType,
  });

  return entry.items[0].fields;
}
