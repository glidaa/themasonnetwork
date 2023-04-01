/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createJokes = /* GraphQL */ `
  mutation CreateJokes(
    $input: CreateJokesInput!
    $condition: ModelJokesConditionInput
  ) {
    createJokes(input: $input, condition: $condition) {
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
export const updateJokes = /* GraphQL */ `
  mutation UpdateJokes(
    $input: UpdateJokesInput!
    $condition: ModelJokesConditionInput
  ) {
    updateJokes(input: $input, condition: $condition) {
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
export const deleteJokes = /* GraphQL */ `
  mutation DeleteJokes(
    $input: DeleteJokesInput!
    $condition: ModelJokesConditionInput
  ) {
    deleteJokes(input: $input, condition: $condition) {
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
