import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '@/context/AppContext'
import PostCard from '@/components/feed/PostCard'
import { PostType } from '@/types'
import { cn } from '@/lib/utils'

const filters: { label: string; value: PostType | 'all'; emoji: string }[] = [
  { label: '全部', value: 'all', emoji: '✨' },
  { label: '图文', value: 'photo', emoji: '📷' },
  { label: '视频', value: 'video', emoji: '🎬' },
  { label: '日记', value: 'diary', emoji: '📔' },
  { label: '想法', value: 'idea', emoji: '💭' },
]

export default function Home() {
  const { posts } = useApp()
  const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all')

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.type === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-8"
    >
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-5 py-2 shadow-cute mb-4">
          <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
          <span className="text-sm text-muted">记录美好的瞬间</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          <span className="gradient-text">日常碎片</span>
        </h1>
        <p className="text-muted">
          照片 · 视频 · 想法 · 日记
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-center gap-2 mb-8 flex-wrap"
      >
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300",
              activeFilter === filter.value
                ? "bg-gradient-to-r from-primary to-primary-dark text-white shadow-cute"
                : "bg-white text-muted hover:bg-secondary hover:text-primary-dark shadow-soft"
            )}
          >
            <span className="mr-1">{filter.emoji}</span>
            {filter.label}
          </button>
        ))}
      </motion.div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-5">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-cute animate-float">
            <span className="text-6xl">🌸</span>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">还没有内容</h3>
          <p className="text-muted mb-6">开始记录你的第一个美好瞬间吧</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 cute-btn"
          >
            <span>✨</span>
            开始记录
          </Link>
        </motion.div>
      )}
    </motion.div>
  )
}
