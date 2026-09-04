import { Event, EventTarget } from 'event-target-shim';
import { defaultHTTPRuntime, HTTPToolkit, type Request } from 'koajax';
import { githubClient } from 'mobx-github';
import { Blob, fetch, Headers, ReadableStream } from 'taro-fetch-polyfill';

import { isH5 } from '@/lib/platform';

const { request } = new HTTPToolkit({
  ...defaultHTTPRuntime,
  Event,
  EventTarget,
  Headers: Headers as unknown as typeof globalThis.Headers,
  Blob,
  ReadableStream,
  fetch: fetch as typeof globalThis.fetch
});

/**
 * @see {@link https://github.com/NervJS/taro/pull/17472}
 */
export function baseRequest<B>(
  this: { baseURI: string },
  { path, ...option }: Request<B>
) {
  const { pathname, search } = new URL(path, this.baseURI);

  return request<B>({
    ...option,
    path: `${this.baseURI}${pathname.slice(1)}${search}`
  });
}

if (!isH5()) {
  githubClient.baseURI = 'https://bazaar.fcc-cd.dev/api/GitHub/';

  githubClient.baseRequest = baseRequest;
}
