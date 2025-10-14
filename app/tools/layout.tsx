
import Sidebar from "@/components/Sidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 bg-gray-50 dark:bg-gray-900 flex flex-col overflow-y-auto">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  )
}
