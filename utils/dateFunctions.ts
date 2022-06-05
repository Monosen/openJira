import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export const getFormatDistanceTonow = (date: Date) => {
	const froNow = formatDistanceToNow(date, { locale: es })

	return froNow
}
