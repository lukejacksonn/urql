import { createClient } from '@urql/core';
import { createMutation } from './createMutation';

describe('createMutation', () => {
  const client = createClient({ url: 'https://example.com' });
  const variables = {};
  const context = {};
  const query =
    'mutation ($input: Example!) { doExample(input: $input) { id } }';
  const [store] = createMutation({
    client,
    query,
    variables,
    context,
  });

  it('fills the store with correct values', () => {
    expect(store.operation.kind).toBe('mutation');
    expect(store.operation.context.url).toBe('https://example.com');
    expect(store.operation.query.loc?.source.body).toBe(query);
    expect(store.operation.variables).toBe(variables);
  });
});
