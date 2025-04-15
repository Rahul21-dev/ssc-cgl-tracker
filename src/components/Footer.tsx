export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} SSC CGL Tracker
      </div>
    </footer>
  )
}
