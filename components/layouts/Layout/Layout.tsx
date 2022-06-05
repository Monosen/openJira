import { Box } from '@mui/system'
import Head from 'next/head'
import { FC } from 'react'
import { Navbar, Sidebar } from '../../custom'

interface Props {
	title?: string
	children?: any
}

export const Layout: FC<Props> = ({ title = 'OpenJira', children }) => {
	return (
		<Box sx={{ flexFlow: 1 }}>
			<Head>
				<title>{title}</title>
			</Head>

			<Navbar />
			<Sidebar />

			<Box sx={{ padding: '10px 20px' }}>{children}</Box>
		</Box>
	)
}
