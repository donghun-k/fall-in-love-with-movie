import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export const convertTimestampToDateString = (timestamp: number) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    throw new Error('유효하지 않은 타임스탬프입니다.');
  }

  return format(date, 'yyyy. MM. dd. a hh:mm', { locale: ko });
};
