import { appReady$ } from './index';
import { fetchTicketsFx$ } from '../tickets';
import { take } from 'rxjs/operators';


appReady$.on(
  fetchTicketsFx$.result$.pipe(
    take(1),
  ),
  () => true,
);
