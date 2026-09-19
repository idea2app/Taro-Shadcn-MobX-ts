import { Event, EventTarget } from 'event-target-shim';
import { defaultHTTPRuntime, HTTPToolkit } from 'koajax';
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

if (!isH5()) {
  githubClient.baseURI = 'https://bazaar.fcc-cd.dev/api/GitHub/';

  githubClient.baseRequest = request;
}
