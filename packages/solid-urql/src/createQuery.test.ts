import { createClient } from '@urql/core';
import { createQuery } from './createQuery';

describe('createQuery', () => {
  const client = createClient({ url: 'https://example.com' });
  const variables = {};
  const context = {};
  const query = '{ test }';
  const [store] = createQuery({ client, query, variables, context });

  it('fills the store with correct values', () => {
    expect(store.operation.kind).toBe('query');
    expect(store.operation.context.url).toBe('https://example.com');
    expect(store.operation.query.loc?.source.body).toBe(query);
    expect(store.operation.variables).toBe(variables);
  });

  it('adds pause handles', () => {
    expect(store.paused).toBe(false);

    store.pause();
    expect(store.paused).toBe(true);

    store.resume();
    expect(store.paused).toBe(false);
  });
});
