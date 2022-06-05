import { DragEvent, FC, useContext } from 'react'
import { useRouter } from 'next/router'
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography
} from '@mui/material'

import { Entry } from '../../../interface'
import { CustomContext } from '../../../context'
import { dateFunctions } from '../../../utils'

interface Props {
	entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
	const { setIsDragging } = useContext(CustomContext)
	const router = useRouter()

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id)
		setIsDragging(true)
	}

	const onDragEnd = () => {
		setIsDragging(false)
	}

	const onClick = () => {
		router.push(`/entries/${entry._id}`)
	}

	return (
		<Card
			onClick={onClick}
			draggable
			sx={{ marginBottom: 1 }}
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<CardActionArea>
				<CardContent>
					<Typography sx={{ whiteSpace: 'pre-line' }}>
						{entry.description}
					</Typography>
				</CardContent>

				<CardActions
					sx={{ display: 'flex', justityContent: 'end', paddingRight: 2 }}
				>
					<Typography variant='body2'>
						{dateFunctions.getFormatDistanceTonow(entry.createdAt)}
					</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	)
}
