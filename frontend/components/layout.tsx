import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'


type LayoutProps = {
  walletAddress: string,
  connectWalletPressed: any,
  children?: ReactNode
}

const Layout: NextPage<LayoutProps> = ({ walletAddress, connectWalletPressed, children }) => {
  return (
    <>
      <Head>
        <title>White Elefun</title>
        <meta name="description" content="White Elefun" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="" />
      </Head>
      <Header walletAddress={ walletAddress } connectWalletPressed={ connectWalletPressed } />
      <main>{ children }</main>
      <Footer />
    </>
  )
}

export default Layout