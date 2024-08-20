

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function humanizeTime(date) {
  return dayjs(date).fromNow();
}
