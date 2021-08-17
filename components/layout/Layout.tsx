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
