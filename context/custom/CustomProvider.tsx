import { FC, ReactNode, useReducer } from 'react'
import { CustomContext, CustomReducer } from './'

export interface CustomState {
	sidemenuOpen: boolean
	isAddingEntry: boolean
	isDragging: boolean
}

const CUSTOM_INITIAL_STATE: CustomState = {
	sidemenuOpen: false,
	isAddingEntry: false,
	isDragging: false
}

interface Props {
	children: ReactNode
}

export const CustomProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(CustomReducer, CUSTOM_INITIAL_STATE)

	const openSidemenu = () => dispatch({ type: 'Open_sidebar' })

	const closeSidemenu = () => dispatch({ type: 'Close_sidebar' })

	const setIsAddingEntry = (isAdding: boolean) =>
		dispatch({ type: 'Set_isAdding', payload: isAdding })

	const setIsDragging = (isDragging: boolean) =>
		dispatch({ type: 'Set_isDragging', payload: isDragging })

	return (
		<CustomContext.Provider
			value={{
				...state,
				openSidemenu,
				closeSidemenu,
				setIsAddingEntry,
				setIsDragging
			}}
		>
			{children}
		</CustomContext.Provider>
	)
}
