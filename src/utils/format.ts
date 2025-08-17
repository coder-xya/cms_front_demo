import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * UTC时间格式化=>东八区时间
 * @param utcString
 * @param format
 * @returns
 */
export function formatUTC(
  utcString: string,
  format: string = 'YYYY/MM/DD HH:mm:ss',
) {
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(format);
  return resultTime;
}
