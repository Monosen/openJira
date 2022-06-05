import { useContext } from 'react'
import NextLink from 'next/link'

import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import { CustomContext } from '../../../context/custom'

export const Navbar = () => {
	const { openSidemenu } = useContext(CustomContext)

	return (
		<AppBar position='sticky' elevation={0}>
			<Toolbar>
				<IconButton size='large' edge='start' onClick={() => openSidemenu()}>
					<MenuIcon />
				</IconButton>
				<NextLink href='/' passHref>
					<Link underline='none' color='white'>
						<Typography variant='h6'>OpenJira</Typography>
					</Link>
				</NextLink>
			</Toolbar>
		</AppBar>
	)
}
