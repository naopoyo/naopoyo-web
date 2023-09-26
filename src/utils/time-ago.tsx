import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { ja } from 'date-fns/locale'

export default function timeAgo(value: string) {
  return formatDistanceToNow(Date.parse(value), { addSuffix: true, locale: ja })
}
