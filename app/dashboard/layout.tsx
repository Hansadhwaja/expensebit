
import DashboardShell from '@/components/dashboard/DashboardShell'
import React, { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
     <DashboardShell>
        {children}
     </DashboardShell>
    )
}

export default DashboardLayout