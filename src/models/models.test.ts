import { SearchIdResponse, StopFilter, TicketsResponse } from '../types';
import { createEvent } from 'effector';
import {
  $isAllStopFiltersActive,
  $stopFilters,
  setAllStopFilters,
  toggleStopFilter,
  updateStopFiltersFx,
} from './filters';

import { $ordering, setOrdering } from './ordering';
import { $searchId, $stop, $tickets, $visibleTickets, fetchSearchIdFx, fetchTickets, fetchTicketsFx } from './tickets';
import { AppGate } from './app';
import { delay } from '../utils';


const testSearchIdResponse: SearchIdResponse = {
  searchId: '123qwe',
};

const emptyTicketsResponse: TicketsResponse = {
  tickets: [],
  stop: true,
};

const testTicketResponse: TicketsResponse = {
  tickets: [
    {
      'price': 1000,
      'carrier': 'S7',
      'segments': [
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-09-28T10:45:00.000Z',
          'stops': [
            'HKG',
            'JNB',
          ],
          'duration': 2000,
        },
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-10-18T11:20:00.000Z',
          'stops': [
            'HKG',
            'JNB',
          ],
          'duration': 2000,
        },
      ],
    },
    {
      'price': 2000,
      'carrier': 'SU',
      'segments': [
        {
          'origin': 'MOW',
          'destination': 'HKT',
          'date': '2020-09-28T03:43:00.000Z',
          'stops': [
            'IST',
          ],
          'duration': 1000,
        },
        {
          'origin': 'HKT',
          'destination': 'MOW',
          'date': '2020-10-18T07:52:00.000Z',
          'stops': [],
          'duration': 1000,
        },
      ],
    },
  ],
  stop: true,
};

describe('Stop filters tests', () => {
  const reset = createEvent();
  let currentHandler: ReturnType<typeof updateStopFiltersFx.use.getCurrent>;
  let updateStopFiltersMock = jest.fn(async (): Promise<number[]> => {
    return [];
  });
  beforeEach(() => {
    reset();
    currentHandler = updateStopFiltersFx.use.getCurrent();
    updateStopFiltersFx.use(updateStopFiltersMock);
  });

  afterEach(() => {
    updateStopFiltersFx.use(currentHandler);
  });

  beforeAll(() => {
    $stopFilters.reset(reset);
  });

  afterAll(() => {
    $stopFilters.off(reset);
  });

  test('$stopFilters should have valid initial value', () => {
    expect($stopFilters.getState()).toEqual([]);
  });

  test('updateStopFiltersFx add new filters', async () => {
    updateStopFiltersMock.mockResolvedValue([1]);
    await updateStopFiltersFx(emptyTicketsResponse);

    expect($stopFilters.getState()).toEqual([
      {
        stops: 1,
        active: true,
      },
    ]);
  });

  test('updateStopFiltersFx handler should return valid values', async () => {
    expect(await currentHandler(emptyTicketsResponse)).toEqual([]);
    expect(await currentHandler(testTicketResponse)).toEqual([2, 1, 0]);
  });

  test('updateStopFiltersFx should not create duplicate filters', async () => {
    updateStopFiltersMock.mockResolvedValue([1, 2]);
    await updateStopFiltersFx(emptyTicketsResponse);

    expect($stopFilters.getState()).toEqual([
      {
        stops: 1,
        active: true,
      },
      {
        stops: 2,
        active: true,
      },
    ]);

    updateStopFiltersMock.mockResolvedValue([2]);
    await updateStopFiltersFx(emptyTicketsResponse);
    expect($stopFilters.getState()).toEqual([
      {
        stops: 1,
        active: true,
      },
      {
        stops: 2,
        active: true,
      },
    ]);
  });

  test('updateStopFiltersFx should sort filters', async () => {
    updateStopFiltersMock.mockResolvedValue([3, 1, 2]);
    await updateStopFiltersFx(emptyTicketsResponse);
    expect($stopFilters.getState()).toEqual([
      {
        stops: 1,
        active: true,
      },
      {
        stops: 2,
        active: true,
      },
      {
        stops: 3,
        active: true,
      },
    ]);
  });

  test('toggleStopFilter should toggle filter', async () => {
    updateStopFiltersMock.mockResolvedValue([3, 1, 2]);
    await updateStopFiltersFx(emptyTicketsResponse);
    toggleStopFilter(2);
    expect($stopFilters.getState()).toEqual(expect.arrayContaining<StopFilter>([{
      stops: 2,
      active: false,
    }]));
    toggleStopFilter(2);
    toggleStopFilter(3);
    expect($stopFilters.getState()).toEqual(expect.arrayContaining<StopFilter>([
      {
        stops: 2,
        active: true,
      },
      {
        stops: 3,
        active: false,
      },
    ]));
  });

  test('setAllStopFilters should set all filter to value', async () => {
    updateStopFiltersMock.mockResolvedValue([3, 1, 2]);
    await updateStopFiltersFx(emptyTicketsResponse);
    expect($stopFilters.getState().map(f => f.active).every(v => v)).toBe(true);

    setAllStopFilters(false);
    expect($stopFilters.getState().map(f => f.active).every(v => !v)).toBe(true);

    toggleStopFilter(2);
    setAllStopFilters(true);
    expect($stopFilters.getState().map(f => f.active).every(v => v)).toBe(true);
  });

  test('$isAllStopFiltersActive contains valid value', async () => {
    updateStopFiltersMock.mockResolvedValue([3, 1, 2]);
    await updateStopFiltersFx(emptyTicketsResponse);
    expect($isAllStopFiltersActive.getState()).toBe(true);

    setAllStopFilters(false);
    expect($isAllStopFiltersActive.getState()).toBe(false);

    setAllStopFilters(true);
    expect($isAllStopFiltersActive.getState()).toBe(true);

    toggleStopFilter(2);
    expect($isAllStopFiltersActive.getState()).toBe(false);
  });
});

describe('Ordering tests', () => {
  const reset = createEvent();

  beforeEach(() => {
    reset();
  });

  beforeAll(() => {
    $ordering.reset(reset);
  });

  afterAll(() => {
    $ordering.off(reset);
  });

  test('$ordering should have valid initial value', () => {
    expect($ordering.getState()).toBe('price');
  });

  test('setOrdering should change value', () => {
    setOrdering('time');
    expect($ordering.getState()).toBe('time');

    setOrdering('price');
    expect($ordering.getState()).toBe('price');
  });
});


describe('Tickets tests', () => {

  const reset = createEvent();
  const fetchSearchIdMock = jest.fn(async () => testSearchIdResponse);
  const fetchTicketsMock = jest.fn(async () => emptyTicketsResponse);
  let fetchSearchIdHandler: ReturnType<typeof fetchSearchIdFx.use.getCurrent>;
  let fetchTicketsHandler: ReturnType<typeof fetchTicketsFx.use.getCurrent>;


  beforeEach(() => {
    reset();
    fetchSearchIdHandler = fetchSearchIdFx.use.getCurrent();
    fetchTicketsHandler = fetchTicketsFx.use.getCurrent();
    fetchSearchIdFx.use(fetchSearchIdMock);
    fetchTicketsFx.use(fetchTicketsMock);
  });

  afterEach(() => {
    fetchSearchIdFx.use(fetchSearchIdHandler);
    fetchTicketsFx.use(fetchTicketsHandler);
    fetchSearchIdMock.mockClear();
    fetchTicketsMock.mockClear();
  });

  beforeAll(() => {
    $tickets.reset(reset);
    $searchId.reset(reset);
    $stop.reset(reset);
    $stopFilters.reset(reset);
    $ordering.reset(reset);
  });

  afterAll(() => {
    $tickets.off(reset);
    $searchId.off(reset);
    $stop.off(reset);
    $stopFilters.off(reset);
    $ordering.off(reset);
  });

  test('should start fetchSearchIdFx on open AppGate', async () => {
    AppGate.open({});

    expect(fetchSearchIdMock).toBeCalledTimes(1);
  });

  test('should start fetchTicketsFx when fetchSearchIdFx finished', async () => {
    await fetchSearchIdFx();

    expect(fetchSearchIdMock).toBeCalledTimes(1);
    expect(fetchTicketsMock).toBeCalledTimes(1);
    expect(fetchTicketsMock).toBeCalledWith('123qwe');
  });

  test('fetchTicketsFx should repeat request until stop is false', async () => {
    fetchTicketsMock.mockResolvedValueOnce({ ...emptyTicketsResponse, stop: false });

    await fetchTicketsFx(testSearchIdResponse.searchId);

    expect(fetchTicketsMock).toBeCalledTimes(2);
  });


  test('fetchTicketsFx should retry on error 500', async () => {
    // TODO: Mock api.getTickets
  });

  test('$searchId should set value after fetchSearchIdFx done', async () => {
    expect($searchId.getState()).toBe('');
    await fetchSearchIdFx();
    expect($searchId.getState()).toBe('123qwe');
  });

  test('fetchTickets should map searchId to fetchTicketsFx', async () => {
    await fetchSearchIdFx();
    fetchTicketsMock.mockClear();
    fetchTickets();
    expect(fetchTicketsMock).toBeCalledTimes(1);
    expect(fetchTicketsMock).toBeCalledWith('123qwe');
  });

  test('$stop should set value after fetchSearchIdFx done', async () => {
    expect($stop.getState()).toBe(false);
    fetchTickets();
    await delay(0);
    expect($stop.getState()).toBe(true);
  });

  test('$tickets should set value after fetchSearchIdFx done', async () => {
    expect($tickets.getState()).toEqual([]);
    fetchTickets();
    await delay(0);
    expect($tickets.getState()).toEqual([]);

    fetchTicketsMock.mockResolvedValueOnce(testTicketResponse);
    fetchTickets();
    await delay(0);
    expect($tickets.getState()).toEqual(testTicketResponse.tickets);

    fetchTicketsMock.mockResolvedValueOnce(testTicketResponse);
    fetchTickets();
    await delay(0);
    expect($tickets.getState().length).toBe(4);
  });

  test('$stopFilters should set value after fetchSearchIdFx done', async () => {
    expect($stopFilters.getState()).toEqual([]);
    fetchTickets();
    await delay(0);
    expect($stopFilters.getState()).toEqual([]);

    fetchTicketsMock.mockResolvedValueOnce(testTicketResponse);
    fetchTickets();
    await delay(0);
    expect($stopFilters.getState()).toEqual([
      {
        stops: 0,
        active: true,
      },
      {
        stops: 1,
        active: true,
      },
      {
        stops: 2,
        active: true,
      },
    ]);
  });

  test('$visibleTickets should respect ordering', async () => {
    fetchTicketsMock.mockResolvedValueOnce(testTicketResponse);
    fetchTickets();
    await delay(0);

    expect($visibleTickets.getState()).toEqual(testTicketResponse.tickets);

    setOrdering('time');

    expect($visibleTickets.getState()).toEqual([...testTicketResponse.tickets].reverse());
  })

  test('$visibleTickets should respect stop filters', async () => {
    fetchTicketsMock.mockResolvedValueOnce(testTicketResponse);
    fetchTickets();
    await delay(0);

    expect($visibleTickets.getState()).toEqual(testTicketResponse.tickets);

    setAllStopFilters(false);

    expect($visibleTickets.getState()).toEqual([]);

    toggleStopFilter(0);

    expect($visibleTickets.getState()).toEqual([]);

    setAllStopFilters(false);
    toggleStopFilter(1);
    expect($visibleTickets.getState()).toEqual([testTicketResponse.tickets[1]]);

    setAllStopFilters(false);
    toggleStopFilter(2);
    expect($visibleTickets.getState()).toEqual([testTicketResponse.tickets[0]]);
  })
});
