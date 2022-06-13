import { createRequest } from '@urql/core';
import { createResource, onCleanup } from 'solid-js';
import { pipe, subscribe } from 'wonka';

const fetcher = (args, { refetching }) =>
  new Promise(resolve => {
    if (!refetching) return;

    const operation = args.client.createRequestOperation(
      'mutation',
      createRequest(args.query, refetching),
      {
        requestPolicy: args.requestPolicy,
        ...args.context,
      }
    );

    const { unsubscribe } = pipe(
      args.client.executeRequestOperation(operation),
      subscribe(resolve)
    );

    onCleanup(() => unsubscribe());
  });

export const createMutation = args => createResource(args, fetcher);
