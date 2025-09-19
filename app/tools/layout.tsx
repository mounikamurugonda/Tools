
import Sidebar from "@/components/Sidebar";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row flex-grow">
      <Sidebar />
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 overflow-y-auto">
        {children}
      </div>
    </div>
  )
}
