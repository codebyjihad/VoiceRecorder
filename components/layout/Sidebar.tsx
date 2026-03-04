"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  PhoneCall,
  Mic,
   User,
  LogOut
} from "lucide-react"

const menuItems = [
  { name: "Users", href: "/", icon: Users },
  { name: "Calls", href: "calls", icon: PhoneCall },
  { name: "Recordings", href: "/recordings", icon: Mic },
   { name: "Profile", href: "/profile", icon: User }
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen bg-sidebar border-r border-sidebar-border flex-col justify-between p-6">

        <div>
          <h1 className="text-2xl font-bold text-sidebar-foreground mb-10">
            VoiceRecorder
          </h1>

          <ul className="space-y-3">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-lg transition-all
                      ${isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"}
                    `}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="border-t border-sidebar-border pt-6">
          <button className="w-full flex items-center justify-center gap-2 bg-destructive/10 text-destructive py-2 rounded-lg hover:bg-destructive/20 transition">
            <LogOut size={16} />
            Logout
          </button>
        </div>

      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-sidebar border-t border-sidebar-border flex justify-around py-2 z-50">

        {menuItems.map((item, index) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={index}
              href={item.href}
              className={`flex flex-col items-center text-xs transition
                ${isActive
                  ? "text-sidebar-primary"
                  : "text-sidebar-foreground"}
              `}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Sidebar