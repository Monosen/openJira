import { Entry } from '../../interface'
import { EntriesState } from './'

type EntriesActionType =
	| { type: 'ADD_ENTRY'; payload: Entry }
	| { type: 'UPDATE_ENTRY'; payload: Entry }
	| { type: 'REFRESH_ENTRY'; payload: Entry[] }
	| { type: 'DELETE_ENTRY'; payload: Entry }

export const EntriesReducer = (
	state: EntriesState,
	action: EntriesActionType
): EntriesState => {
	switch (action.type) {
		case 'ADD_ENTRY':
			return {
				...state,
				entries: [...state.entries, action.payload]
			}
		case 'UPDATE_ENTRY':
			return {
				...state,
				entries: state.entries.map(entry => {
					if (entry._id === action.payload._id) {
						entry.status = action.payload.status
						entry.description = action.payload.description
					}
					return entry
				})
			}
		case 'REFRESH_ENTRY':
			return {
				...state,
				entries: [...action.payload]
			}
		case 'DELETE_ENTRY':
			return {
				...state,
				entries: state.entries.filter(entry => entry._id !== action.payload._id)
			}

		default:
			return state
	}
}
