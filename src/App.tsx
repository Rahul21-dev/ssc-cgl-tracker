import SSCCGLTracker from './components/SSCCGLTracker'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <SSCCGLTracker />
      </main>
      <Footer />
    </div>
  )
}
