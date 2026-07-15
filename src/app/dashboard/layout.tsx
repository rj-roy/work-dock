import DashNav from "@/components/dashboard/DashNav";

export const metadata = {
    title: "Dashboard | Work Dock",
    description: "Dashboard",
};

export default function DashLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <div className="w-full max-w-7xl mx-auto flex bg-white-bg dark:bg-black-bg dark:text-gray-100 text-black">
      <DashNav />
      <main className="flex-1 flex flex-col p-8 h-full">
        {children}
      </main>
    </div>
  )
}