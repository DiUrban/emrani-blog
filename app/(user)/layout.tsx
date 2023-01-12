import Banner from '../../components/Banner'
import ContactPage from '../../components/ContactPage'
import Header from '../../components/Header'
import '../../styles/globals.css'
export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html>
      <head />
      <body className="bg-primary-100 max-w-7xl mx-auto">
        <Header />
        <Banner />
        {children}
        <ContactPage />
      </body>
    </html>
  )
}
