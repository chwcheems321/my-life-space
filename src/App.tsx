import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from '@/context/AppContext'
import NavBar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import Gallery from '@/pages/Gallery'
import Videos from '@/pages/Videos'
import Create from '@/pages/Create'
import About from '@/pages/About'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 pt-24 pb-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/create" element={<Create />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
