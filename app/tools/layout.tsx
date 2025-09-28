
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="w-full md:w-[80%] bg-gray-50 dark:bg-gray-900 flex flex-col">
        <div className="flex-grow p-4 md:p-8">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  )
}
