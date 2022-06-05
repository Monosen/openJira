import { createContext } from 'react'

interface ContextProps {
	sidemenuOpen: boolean
	isAddingEntry: boolean
	isDragging: boolean
	openSidemenu: () => void
	closeSidemenu: () => void
	setIsAddingEntry: (isAdding: boolean) => void
	setIsDragging: (isDragging: boolean) => void
}

export const CustomContext = createContext({} as ContextProps)
