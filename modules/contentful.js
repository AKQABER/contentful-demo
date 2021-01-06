const contentful = require('contentful');

const getClient = () => {
  return contentful.createClient({
    // This is the space ID. A space is like a project folder in Contentful terms
    space: 'tdb7rbybk22m',
    // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
    accessToken: 'lcwCohQY_VEUyMfV2VCwEscGwF3qTpdt9eMIuvKsq3U',
  });
};

let client;

export const contentfulClient = () => {
  if (!client) {
    client = getClient();
  }

  return client;
};

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
