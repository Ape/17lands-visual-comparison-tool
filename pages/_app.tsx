import 'fontsource-roboto';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import store from '../redux/store';
import GlobalStyle from '../components/styles/GlobalStyle';
import Layout from '../components/layout/Layout';
import darkTheme from '../themes/darkTheme';

const MtgCbWebApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  if (process.browser) {
    console.log(
      `%c
       ██╗███████╗    ██╗   ██╗██╗███████╗██╗   ██╗ █████╗ ██╗     
      ███║╚════██║    ██║   ██║██║██╔════╝██║   ██║██╔══██╗██║     
      ╚██║   ██╔╝     ██║   ██║██║███████╗██║   ██║███████║██║     
       ██║  ██╔╝      ╚██╗ ██╔╝██║╚════██║██║   ██║██╔══██║██║     
       ██║  ██║        ╚████╔╝ ██║███████║╚██████╔╝██║  ██║███████╗
       ╚═╝  ╚═╝         ╚═══╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
    Hello fellow dev! Feel free to check this repo out on GitHub. :)
     https://github.com/brianchuchua/17lands-visual-comparison-tool
`,
      'font-family:monospace;color:#1976d2;font-size:12px;'
    );
  }

  return (
    <MuiThemeProvider theme={darkTheme}>
      <SnackbarProvider maxSnack={3}>
        <StylesProvider injectFirst>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <GlobalStyle />
            <ReduxProvider store={store}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ReduxProvider>
          </ThemeProvider>
        </StylesProvider>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
};

export default MtgCbWebApp;
