import { FC, ReactNode, useEffect, useReducer } from 'react'
import { useSnackbar } from 'notistack'

import { entriesApi } from '../../apis'
import { Entry, IResEntrys, IResEntry } from '../../interface'
import { EntriesContext, EntriesReducer } from './'

export interface EntriesState {
	entries: Entry[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: []
}

interface Props {
	children: ReactNode
}

export const EntriesProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(EntriesReducer, ENTRIES_INITIAL_STATE)

	const { enqueueSnackbar } = useSnackbar()

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<IResEntry>('/entries', {
			description
		})

		dispatch({
			type: 'ADD_ENTRY',
			payload: data.data
		})
	}

	const updateEntry = async (
		{ _id, description, status }: Entry,
		showSnackbar = false
	) => {
		try {
			const { data } = await entriesApi.patch<IResEntry>(`/entries/${_id}`, {
				description,
				status
			})
			dispatch({
				type: 'UPDATE_ENTRY',
				payload: data.data
			})
			if (showSnackbar) {
				enqueueSnackbar('Entrada actualizada', {
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
				})
			}
		} catch (error) {
			console.log(JSON.stringify(error))
		}
	}

	const refreshEntries = async () => {
		const { data } = await entriesApi.get<IResEntrys>('/entries')

		dispatch({ type: 'REFRESH_ENTRY', payload: data.data })
	}

	const deleteEntry = async (Entry: Entry, showSnackbar = false) => {
		try {
			await entriesApi.delete(`/entries/${Entry._id}`)

			dispatch({ type: 'DELETE_ENTRY', payload: Entry })

			if (showSnackbar) {
				enqueueSnackbar('Entry Delete', {
					variant: 'success',
					autoHideDuration: 1500,
					anchorOrigin: { vertical: 'bottom', horizontal: 'left' }
				})
			}
		} catch (error) {
			console.log(JSON.stringify(error))
		}
	}

	useEffect(() => {
		refreshEntries()
	}, [])

	return (
		<EntriesContext.Provider
			value={{ ...state, addNewEntry, updateEntry, deleteEntry }}
		>
			{children}
		</EntriesContext.Provider>
	)
}
