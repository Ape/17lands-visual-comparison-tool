import React from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const OuterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 'calc(100vh)',
  height: 'calc(100vh)',
});

const Footer = styled(Paper)({
  position: 'sticky',
  textAlign: 'center',
  bottom: 0,
  width: '100%',
  padding: '0.5rem',
  marginTop: 'calc(100vh-64px)',
});

const ContentWrapper = styled.main(({ theme }) => ({
  flexGrow: 1,
  width: '100%',
  height: 'calc(100vh-64px)',
  overflow: 'auto',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
}));

const Layout: React.FC = ({ children }) => (
  <OuterWrapper>
    <Head>
      <title>17Lands Visual Comparison</title>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
    <ContentWrapper>{children}</ContentWrapper>
    <Footer>
      <Typography color="textSecondary">
        Made with <strong style={{ color: 'red' }}>♥</strong> by Brian from{' '}
        <Link href="https://www.mtgcollectionbuilder.com" target="_blank" rel="noreferrer">
          MTG Collection Builder
        </Link>{' '}
        - Go support{' '}
        <Link href="https://www.patreon.com/17lands" target="_blank" rel="noreferrer">
          17Lands
        </Link>{' '}
        on Patreon!
      </Typography>
    </Footer>
  </OuterWrapper>
);

export default Layout;
