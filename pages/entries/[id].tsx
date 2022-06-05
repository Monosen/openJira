import { ChangeEvent, FC, useContext, useMemo, useState } from 'react'
import { GetServerSideProps } from 'next'
import {
	Card,
	CardHeader,
	Grid,
	CardContent,
	TextField,
	CardActions,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	capitalize,
	IconButton
} from '@mui/material'

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'

import { Layout } from '../../components/layouts'
import { EntryStatus, Entry } from '../../interface'
import { dbEntries } from '../../database'
import { EntriesContext } from '../../context'
import { dateFunctions } from '../../utils'
import { useRouter } from 'next/router'

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
	entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
	const [inputValue, setInputValue] = useState(entry.description)
	const [status, setStatus] = useState<EntryStatus>(entry.status)
	const [touched, setTouched] = useState(false)

	const { updateEntry, deleteEntry } = useContext(EntriesContext)

	const router = useRouter()

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus)
	}

	const onSave = async () => {
		if (inputValue.trim().length === 0) return
		await updateEntry({ ...entry, description: inputValue, status }, true)
		router.push('/')
	}

	const onDelete = async () => {
		await deleteEntry(entry, true)
		router.push('/')
	}

	return (
		<Layout title={inputValue.substring(0, 20) + '...'}>
			<Grid container justifyContent='center' sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entry:`}
							subheader={`create ${dateFunctions.getFormatDistanceTonow(
								entry.createdAt
							)}`}
						/>
						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='New Entry'
								autoFocus
								multiline
								label='New Entry'
								value={inputValue}
								onChange={handleChange}
								onBlur={() => setTouched(true)}
								helperText={isNotValid && 'Input value'}
								error={isNotValid}
							/>

							<FormControl>
								<FormLabel>State:</FormLabel>
								<RadioGroup row value={status} onChange={onStatusChange}>
									{validStatus.map(option => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant='contained'
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				onClick={onDelete}
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'error.dark'
				}}
			>
				<DeleteOutlinedIcon />
			</IconButton>
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string }

	const entry = await dbEntries.getEntryById(id)

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return {
		props: {
			entry
		}
	}
}

export default EntryPage
