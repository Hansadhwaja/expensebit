import DashboardShell from "@/components/dashboard/DashboardShell"
import { getCurrentSession } from "@/lib/utils/auth/session"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const session = await getCurrentSession()

  if (!session) redirect("/login")

  const user = session?.user

  return (
    <DashboardShell userName={user.name ?? "User"}>{children}</DashboardShell>
  )
}

export default DashboardLayout
