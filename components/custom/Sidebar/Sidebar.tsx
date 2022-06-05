import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material'
import { Box } from '@mui/system'
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { useContext } from 'react'
import { CustomContext } from '../../../context'

const menuItems: string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

export const Sidebar = () => {
	const { closeSidemenu, sidemenuOpen } = useContext(CustomContext)

	return (
		<Drawer anchor='left' open={sidemenuOpen} onClose={() => closeSidemenu()}>
			<Box sx={{ width: 250 }}>
				<Box sx={{ padding: '5px 10px' }}>
					<Typography variant='h4'>OpenJira</Typography>
				</Box>
				<List>
					{menuItems.map((text, index) => (
						<ListItem button key={text}>
							<ListItemIcon>
								{index % 2 === 0 ? (
									<InboxOutlinedIcon />
								) : (
									<EmailOutlinedIcon />
								)}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	)
}
