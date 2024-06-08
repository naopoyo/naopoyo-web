import { formatInTimeZone } from 'date-fns-tz'

export default function createDateFormat(
  formatString: string = 'yyyy/MM/dd HH:mm',
  timeZone: string = 'Asia/Tokyo'
) {
  return (value: string) => {
    return formatInTimeZone(value, timeZone, formatString)
  }
}
