import moment from 'moment';

export function humanizeTime(date) {
  return moment(date).fromNow();
}
