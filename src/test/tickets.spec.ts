import { fetchSearchIdFx$, fetchTicketsFx$, searchId$, tickets$ } from '../models/tickets';
import { TestScheduler } from 'rxjs/testing';
import { emptyTicketResponse, searchIdResponse, ticketResponse } from './helpers';
import { appMounted$ } from '../models/app';
import { of } from 'rxjs';
import { ObservableEvent } from '@carex/core';
import { transformTicket } from '../utils/ticket';


describe('tickets model tests', () => {
  let fetchTicketsHandler: any;
  let fetchSearchIdHandler: any;
  let scheduler: TestScheduler;
  const resetEvent$ = new ObservableEvent();
  const fetchSearchIdMock = jest.fn().mockImplementation(() => of(searchIdResponse));
  const fetchTicketsMock = jest.fn().mockImplementation(() => of(emptyTicketResponse));


  beforeEach(() => {
    fetchSearchIdHandler = fetchSearchIdFx$.getHandler();
    fetchTicketsHandler = fetchTicketsFx$.getHandler();

    fetchSearchIdFx$.setHandler(fetchSearchIdMock);
    fetchTicketsFx$.setHandler(fetchTicketsMock);

    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    fetchSearchIdFx$.setHandler(fetchSearchIdHandler);
    fetchTicketsFx$.setHandler(fetchTicketsHandler);

    scheduler.flush();

    fetchTicketsMock.mockClear();
    fetchSearchIdMock.mockClear();


    tickets$.reset(resetEvent$);
    searchId$.reset(resetEvent$);

    resetEvent$.trigger();

    tickets$.off(resetEvent$);
    searchId$.off(resetEvent$);
  });

  it('searchId$ should have initial value', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(searchId$).toBe('a', { a: '' });
    });
  });

  it('tickets$ should have initial value', () => {
    scheduler.run(({ expectObservable }) => {
      expectObservable(tickets$).toBe('a', { a: [] });
    });
  });


  it('should start fetchSearchIdFx$ and fetchTicketsFx$ once on appMounted$', async () => {
    appMounted$.trigger();
    expect(fetchSearchIdMock).toBeCalledTimes(1);
    expect(fetchTicketsMock).toBeCalledTimes(1);

    expect(fetchTicketsMock).toBeCalledWith(searchIdResponse.searchId);
  });

  it('fetchTicketsFx$ handler should be possible to emit several values', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const trigger$ = cold('-t|');

      const handler = jest
        .fn()
        .mockImplementation(() => cold('--t -t ---t|', { t: emptyTicketResponse }));

      fetchTicketsFx$.setHandler(handler);

      expectObservable(fetchTicketsFx$.result$).toBe('- --t -t ---t', { t: emptyTicketResponse });
      trigger$.subscribe(fetchTicketsFx$.trigger);

    });
  });

  it('searchId$ should set value after fetchSearchIdFx$ done', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const trigger$ = cold('-t|');

      const handler = jest
        .fn()
        .mockImplementation(() => cold('--t|', { t: searchIdResponse }));

      fetchSearchIdFx$.setHandler(handler);

      expectObservable(searchId$).toBe('a --b', { a: '', b: searchIdResponse.searchId });
      trigger$.subscribe(() => fetchSearchIdFx$.trigger());
    });
  });

  it('$tickets should set value after fetchTicketsFx$ done', () => {
    scheduler.run(({ expectObservable, cold }) => {
      const trigger$ = cold('-t|');

      const handler = jest
        .fn()
        .mockImplementation(() => cold('---t|', { t: ticketResponse }));

      fetchTicketsFx$.setHandler(handler);


      expectObservable(tickets$).toBe('a---b', { a: [], b: ticketResponse.tickets.map(transformTicket) });
      trigger$.subscribe(fetchTicketsFx$.trigger);

    });
  });
});
