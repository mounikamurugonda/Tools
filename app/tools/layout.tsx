
import Sidebar from "@/components/Sidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="w-full md:flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col h-[calc(100vh-81px)] overflow-y-auto">
        <div className="flex-grow p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
