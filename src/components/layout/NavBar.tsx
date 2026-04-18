import { Link, useLocation } from 'react-router-dom'
import { Home, Image, Video, Plus, Menu, X, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'

const navLinks = [
  { to: '/', label: '首页', icon: Home },
  { to: '/gallery', label: '相册', icon: Image },
  { to: '/videos', label: '视频', icon: Video },
]

export default function NavBar() {
  const location = useLocation()
  const { user } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 nav-gradient border-b border-primary/10">
        <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-cute group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text hidden sm:block">
              日常记录 ✨
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map(link => {
              const Icon = link.icon
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-cute"
                      : "text-muted hover:text-primary-dark hover:bg-secondary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Create Button */}
            <Link
              to="/create"
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                location.pathname === '/create'
                  ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-cute"
                  : "bg-gradient-to-r from-primary to-primary-dark text-white hover:shadow-lg hover:-translate-y-0.5"
              )}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">发布</span>
            </Link>

            {/* User Avatar */}
            <Link to="/about">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-soft hover:border-primary transition-all hover:scale-105"
              />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-primary-dark" /> : <Menu className="w-5 h-5 text-primary-dark" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce-in">
            <div className="space-y-2">
              {navLinks.map(link => {
                const Icon = link.icon
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                      isActive
                        ? "bg-gradient-to-r from-primary to-primary-dark text-white"
                        : "text-muted hover:bg-secondary hover:text-primary-dark"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                )
              })}
              <div className="cute-divider my-3" />
              <Link
                to="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-primary-dark text-white"
              >
                <Plus className="w-5 h-5" />
                发布内容
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
