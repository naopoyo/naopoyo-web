import { formatDistance } from 'date-fns'
import { ja } from 'date-fns/locale'

export default function timeAgo(value: string) {
  return formatDistance(Date.parse(value), new Date(), { addSuffix: true, locale: ja })
}
