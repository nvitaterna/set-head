import { DeclarativeNetRequest } from 'wxt/browser';

const allResourceTypes: DeclarativeNetRequest.ResourceType[] = [
  'csp_report',
  'font',
  'image',
  'main_frame',
  'media',
  'object',
  'other',
  'ping',
  'script',
  'stylesheet',
  'sub_frame',
  'websocket',
  'xmlhttprequest',
];

interface Header {
  name: string;
  value: string;
  outgoing: boolean;
}

export const getHeaderRule = (
  headers: Header[],
  id: number,
): DeclarativeNetRequest.Rule => {
  const requestHeaderData = headers.filter((header) => header.outgoing);
  const responseHeaderData = headers.filter((header) => !header.outgoing);

  const requestHeaders: DeclarativeNetRequest.RuleActionRequestHeadersItemType[] =
    requestHeaderData.map(({ name, value }) => ({
      operation: 'set',
      header: name,
      value,
    }));

  const responseHeaders: DeclarativeNetRequest.RuleActionResponseHeadersItemType[] =
    responseHeaderData.map(({ name, value }) => ({
      operation: 'set',
      header: name,
      value,
    }));

  return {
    id,
    priority: 1,
    action: {
      type: 'modifyHeaders',
      requestHeaders: requestHeaders.length ? requestHeaders : undefined,
      responseHeaders: responseHeaders.length ? responseHeaders : undefined,
    },
    condition: {
      urlFilter: '*',
      resourceTypes: allResourceTypes,
    },
  };
};
