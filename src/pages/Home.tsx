import { useState } from 'react'
import { motion } from 'framer-motion'
import { Filter } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import PostCard from '@/components/feed/PostCard'
import { PostType } from '@/types'
import { cn } from '@/lib/utils'

const filters: { label: string; value: PostType | 'all' }[] = [
  { label: '全部', value: 'all' },
  { label: '博客', value: 'blog' },
  { label: '日记', value: 'diary' },
  { label: '想法', value: 'idea' },
  { label: '相册', value: 'photo' },
  { label: '视频', value: 'video' },
]

export default function Home() {
  const { posts } = useApp()
  const [activeFilter, setActiveFilter] = useState<PostType | 'all'>('all')

  const filteredPosts = activeFilter === 'all'
    ? posts
    : posts.filter(post => post.type === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          记录正在发生的生活
        </h1>
        <p className="text-muted">
          每一个瞬间，都值得被珍藏
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-muted flex-shrink-0" />
        {filters.map(filter => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
              activeFilter === filter.value
                ? "bg-primary text-white"
                : "bg-secondary text-muted hover:bg-primary/10 hover:text-primary"
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Posts */}
      {filteredPosts.length > 0 ? (
        <div className="space-y-5">
          {filteredPosts.map(post => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={post} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-4xl">📝</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2">还没有内容</h3>
          <p className="text-muted mb-4">开始记录你的第一个瞬间吧</p>
          <a
            href="/create"
            className="inline-flex items-center justify-center h-10 px-6 bg-primary text-white rounded-lg font-medium hover:bg-[#D9A090] transition-colors"
          >
            写点什么
          </a>
        </div>
      )}
    </motion.div>
  )
}
