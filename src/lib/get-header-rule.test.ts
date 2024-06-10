import { describe, expect, it } from 'vitest';

import { getHeaderRule } from './get-header-rule';

describe('getHeaderRule', () => {
  it('should return a rule with request headers', () => {
    const headers = [{ name: 'User-Agent', value: 'Chrome', outgoing: true }];
    const id = 1;

    const rule = getHeaderRule(headers, id);

    expect(rule).toMatchObject({
      id,
      priority: 1,
      action: {
        type: 'modifyHeaders',
        requestHeaders: [
          {
            operation: 'set',
            header: 'User-Agent',
            value: 'Chrome',
          },
        ],
        responseHeaders: undefined,
      },
      condition: {
        urlFilter: '*',
        resourceTypes: [
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
        ],
      },
    });
  });
});
