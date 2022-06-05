import { CustomState } from './'

type CustomActionType =
	| { type: 'Open_sidebar' }
	| { type: 'Close_sidebar' }
	| { type: 'Set_isAdding'; payload: boolean }
	| { type: 'Set_isDragging'; payload: boolean }

export const CustomReducer = (
	state: CustomState,
	action: CustomActionType
): CustomState => {
	switch (action.type) {
		case 'Open_sidebar':
			return {
				...state,
				sidemenuOpen: true
			}
		case 'Close_sidebar':
			return {
				...state,
				sidemenuOpen: false
			}
		case 'Set_isAdding':
			return {
				...state,
				isAddingEntry: action.payload
			}
		case 'Set_isDragging':
			return {
				...state,
				isDragging: action.payload
			}

		default:
			return state
	}
}
