import moment from 'moment';

export function formatDate(date: Date) {
  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export function getDateAfterWeeks(weeks: number): Date {
  const date = moment();
  const newDate = date.add(weeks, 'weeks').toDate();
  return newDate;
};