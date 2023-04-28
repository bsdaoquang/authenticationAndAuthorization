import '@/styles/globals.css'
import { Layout } from 'antd'
import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'

const { Content, Header } = Layout

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Content
        style={{
          minHeight: '100vh',
          backgroundColor: '#fafafa',
        }}
      >
        <Component {...pageProps} />
      </Content>
    </Layout>
  )
}
