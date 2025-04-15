import SSCCGLTracker from './components/SSCCGLTracker'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4 md:p-8">
        <SSCCGLTracker />
      </main>
      <Footer />
    </div>
  )
}
