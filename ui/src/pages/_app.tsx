import Header from '@/components/header'
import { Web3Modal } from '@/components/web3modal'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <style jsx global>{`
      * {
        font-family: ${inter.style.fontFamily}
      }
    `}</style>
    <Web3Modal>
      <Header />
      <main className="pt-8">
        <Component {...pageProps} />
      </main>
      <footer className="py-4 mt-20 text-center">
        Developed by @sudoshreyansh
      </footer>
    </Web3Modal>
  </>
}
