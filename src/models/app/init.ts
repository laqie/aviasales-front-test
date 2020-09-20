import { fetchTicketsFx } from '../tickets';
import { $appReady } from '.';

$appReady.on(fetchTicketsFx.done, () => true);
