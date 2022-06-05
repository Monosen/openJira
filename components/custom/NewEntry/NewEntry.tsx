import { Box, Button, TextField } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { ChangeEvent, useState, useContext } from 'react'
import { EntriesContext, CustomContext } from '../../../context'

export const NewEntry = () => {
	const [inputValue, setInputValue] = useState('')
	const [touched, setTouched] = useState(false)

	const { addNewEntry } = useContext(EntriesContext)
	const { isAddingEntry, setIsAddingEntry } = useContext(CustomContext)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value)
	}

	const onSave = () => {
		if (inputValue.length === 0) return

		addNewEntry(inputValue)
	}

	return (
		<Box sx={{ marginBottom: 2, paddingX: 2 }}>
			{isAddingEntry ? (
				<>
					<TextField
						fullWidth
						sx={{ marginTop: 2, marginBottom: 1 }}
						placeholder='Nueva entrada'
						autoFocus
						multiline
						label='Nueva entrada'
						helperText={touched && inputValue === '' && 'Ingrese una entrada'}
						error={touched && inputValue === ''}
						value={inputValue}
						onChange={handleChange}
						onBlur={() => setTouched(false)}
					/>
					<Box display='flex' justifyContent='space-between'>
						<Button variant='text' onClick={() => setIsAddingEntry(false)}>
							Cancelar
						</Button>
						<Button
							variant='outlined'
							color='secondary'
							endIcon={<SaveOutlinedIcon />}
							onClick={onSave}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					fullWidth
					variant='outlined'
					startIcon={<AddCircleOutlineOutlinedIcon />}
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar tarea
				</Button>
			)}
		</Box>
	)
}
