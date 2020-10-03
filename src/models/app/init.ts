import { appReady$ } from './index';
import { fetchTicketsFx$ } from '../tickets';
import { mapTo, take } from 'rxjs/operators';


appReady$.on(
  fetchTicketsFx$.result$.pipe(
    mapTo(true),
    take(1),
  ),
  () => true,
);
