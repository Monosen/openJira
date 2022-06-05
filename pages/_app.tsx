import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme } from '../themes'
import { CustomProvider, EntriesProvider } from '../context'
import { SnackbarProvider } from 'notistack'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<CustomProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</CustomProvider>
			</EntriesProvider>
		</SnackbarProvider>
	)
}

export default MyApp
