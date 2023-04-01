/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getJokes = /* GraphQL */ `
  query GetJokes($id: ID!) {
    getJokes(id: $id) {
      id
      title
      description
      author
      url
      imageUrl
      joke
      content
      source
      publishedAt
      createdAt
      updatedAt
    }
  }
`;

export const listJokes = /* GraphQL */ `
  query ListJokes(
    $filter: ModelJokesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listJokes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        author
        url
        imageUrl
        joke
        content
        source
        publishedAt
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
