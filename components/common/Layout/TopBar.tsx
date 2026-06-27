import { Bell, Menu } from "lucide-react"
import UserProfile from "../User/UserProfile"
import { Button } from "@/components/ui/button"
import MobileSidebar from "./MobileSidebar"
import LogoutModal from "@/components/auth/Logout/LogoutModal"

interface Props {
  toggleSidebar: () => void
  userName: string
}

const TopBar = ({ toggleSidebar, userName }: Props) => {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b bg-popover px-6 shadow-sm backdrop-blur">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="outline"
          className="rounded-xl max-lg:hidden"
          onClick={toggleSidebar}
        >
          <Menu size={18} />
        </Button>
        <MobileSidebar />
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Button size="icon" variant="outline" className="relative rounded-xl">
          <Bell size={18} />

          <span className="absolute top-2 right-2 size-2 rounded-full bg-red-500" />
        </Button>

        <UserProfile name={userName} />
        <LogoutModal />
      </div>
    </header>
  )
}

export default TopBar
