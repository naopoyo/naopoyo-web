import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export default function createDateFormat(
  formatString: string = 'yyyy/MM/dd HH:mm',
  timeZone: string = 'Asia/Tokyo'
) {
  return (value: string) => {
    return format(utcToZonedTime(value, timeZone), formatString)
  }
}
