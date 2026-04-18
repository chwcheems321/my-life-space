import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-auto py-6">
      <div className="max-w-5xl mx-auto px-4">
        <div className="cute-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
            用心记录每一天
          </p>
          <p className="text-sm text-muted">
            ✨ 日常碎片 · {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
