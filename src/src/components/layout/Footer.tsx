import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-1">
            用
            <Heart className="w-4 h-4 text-primary fill-primary" />
            记录生活
          </p>
          <p className="text-sm text-muted">
            © 2026 MyLifeSpace · 记录正在发生的生活
          </p>
        </div>
      </div>
    </footer>
  )
}
