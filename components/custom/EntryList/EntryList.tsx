import { List, Paper } from '@mui/material'
import { DragEvent, FC, useContext, useMemo } from 'react'

import { EntryCard } from '../'
import { EntryStatus } from '../../../interface'

import { CustomContext, EntriesContext } from '../../../context'

import styles from './EntryList.module.css'

interface Props {
	status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext)
	const { isDragging, setIsDragging } = useContext(CustomContext)

	const entriesByStatus = useMemo(
		() => entries.filter(entry => entry.status === status),
		[entries]
	)

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
	}

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const entryId = event.dataTransfer.getData('text')

		const entry = entries.find(e => e._id === entryId)!

		entry.status = status

		updateEntry(entry)

		setIsDragging(false)
	}

	return (
		<div
			onDrop={onDropEntry}
			onDragOver={allowDrop}
			className={isDragging ? styles.draggin : ''}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 250px)',
					overflow: 'auto',
					backgroundColor: 'transparent',
					padding: '1px 3px'
				}}
			>
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
					{entriesByStatus.map(entry => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	)
}
