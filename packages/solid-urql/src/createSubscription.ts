import { createRequest } from '@urql/core';
import { createResource, onCleanup } from 'solid-js';
import { pipe, subscribe } from 'wonka';

const fetcher = args =>
  new Promise(resolve => {
    if (args.pause) return;

    const operation = args.client.createRequestOperation(
      'subscription',
      createRequest(args.query, args.variables),
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

export const createSubscription = args => createResource(args, fetcher);
