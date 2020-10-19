import * as rxjsFetch from 'rxjs/fetch';
import * as api from '../api';
import { ApiError } from '../api';
import { TestScheduler } from 'rxjs/testing';
import { emptyTicketResponse, Params } from './helpers';


describe('api tests', () => {
  let fromFetchMock: jest.SpyInstance;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    fromFetchMock = jest
      .spyOn(rxjsFetch, 'fromFetch');
  });

  afterEach(() => {
    scheduler.flush();
    fromFetchMock.mockRestore();
  });

  it('should call api on fetchSearchId', () => {
    scheduler.run(({ expectObservable, cold }) => {
      fromFetchMock.mockImplementation(() => cold('--a|'));
      expectObservable(api.fetchSearchId()).toBe('--a|');

      expect(fromFetchMock).toBeCalledTimes(1);
      expect(fromFetchMock.mock.calls[0]).toHaveLength(2);
      expect(fromFetchMock.mock.calls[0][0]).toBe(`${process.env.REACT_APP_API_BASE_URL}/search`);
    });
  });

  it('should call api on fetchSearchId', () => {
    scheduler.run(({ expectObservable, cold }) => {
      fromFetchMock.mockImplementation((url: string) => cold('--a|', { a: url }));
      expectObservable(api.fetchTickets('param')).toBe('--a|',
        { a: `${process.env.REACT_APP_API_BASE_URL}/tickets?searchId=param` });
    });
  });

  it('should retry on status 500', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const error500 = new api.ApiError(500, 'api error 500');
      const responses: Params[] = [
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        {
          marbles: '--r|',
          values: { r: emptyTicketResponse },
        },
      ];

      let i = 0;

      fromFetchMock.mockImplementation(() => {
        const { marbles, values, error } = responses[(i++) % responses.length];
        return cold(marbles as string, values as any, error);
      });

      expectObservable(api.fetchTicketsWithRetries('param')).toBe('-- --v|', { v: emptyTicketResponse });
    });
  });

  it('should not retry if status !500', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const error404 = new api.ApiError(404, 'api error 500');

      const responses: Params[] = [
        {
          marbles: '--#',
          values: {},
          error: error404,
        },
      ];

      let i = 0;

      fromFetchMock.mockImplementation(() => {
        const { marbles, values, error } = responses[(i++) % responses.length];
        return cold(marbles as string, values as any, error);
      });

      expectObservable(api.fetchTicketsWithRetries('param')).toBe('--#', {}, error404);
    });
  });

  it('should retry on status 500 several times', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const error500 = new api.ApiError(500, 'api error 500');
      const responses: Params[] = [
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        {
          marbles: '--r|',
          values: { r: emptyTicketResponse },
        },
      ];

      let i = 0;

      fromFetchMock.mockImplementation(() => {
        const { marbles, values, error } = responses[(i++) % responses.length];
        return cold(marbles as string, values as any, error);
      });

      expectObservable(api.fetchTicketsWithRetries('param')).toBe('-- -- -- --v|', { v: emptyTicketResponse });
    });
  });

  it('should throw retry limit error', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const error500 = new api.ApiError(500, 'api error 500');
      const responses: Params[] = [
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        // retries = 0
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        // retries = 1
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        // retries = 2
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        // retries = 3
        {
          marbles: '--#',
          values: {},
          error: error500,
        },
        {
          marbles: '--r|',
          values: { r: emptyTicketResponse },
        },
      ];

      let i = 0;

      fromFetchMock.mockImplementation(() => {
        const { marbles, values, error } = responses[(i++) % responses.length];
        return cold(marbles as string, values as any, error);
      });

      expectObservable(api.fetchTicketsWithRetries('param'))
        .toBe('-- -- -- -- --#', {}, new ApiError(1337, 'Retries limit exceeded'));
    });
  });

  it('should continue fetch tickets until stop', () => {
    const nonStopResponse = { ...emptyTicketResponse, stop: false };
    scheduler.run(({ expectObservable, cold }) => {
      const responses: Params[] = [
        {
          marbles: '--n|',
          values: { n: nonStopResponse },
        },
        {
          marbles: '--n|',
          values: { n: nonStopResponse },
        },
        {
          marbles: '--n|',
          values: { n: nonStopResponse },
        },
        {
          marbles: '--s|',
          values: { s: emptyTicketResponse },
        },
        {
          marbles: '--n|',
          values: { n: nonStopResponse },
        },
      ];

      let i = 0;

      fromFetchMock.mockImplementation(() => {
        const { marbles, values, error } = responses[(i++) % responses.length];
        return cold(marbles as string, values as any, error);
      });

      expectObservable(api.fetchTicketsUntilStop('param'))
        .toBe('--n -n -n -s|', { n: nonStopResponse, s: emptyTicketResponse });
    });
  });
});
