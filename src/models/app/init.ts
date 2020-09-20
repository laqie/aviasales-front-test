import { $appReady } from './index';
import { fetchTicketsFx } from '../tickets';


$appReady.on(fetchTicketsFx.done, () => true);
