import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function About() {
  const { user, posts } = useApp()

  const stats = {
    photos: posts.flatMap(p => p.media.filter(m => m.type === 'image')).length,
    videos: posts.flatMap(p => p.media.filter(m => m.type === 'video')).length,
    diaries: posts.filter(p => p.type === 'diary').length,
    ideas: posts.filter(p => p.type === 'idea').length,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="py-8"
    >
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-36 h-36 mx-auto mb-6 rounded-3xl overflow-hidden border-4 border-white shadow-cute bg-gradient-to-br from-primary to-primary-dark p-1"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </motion.div>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          <span className="gradient-text">{user.name}</span>
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-muted max-w-md mx-auto"
        >
          {user.bio}
        </motion.p>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-4 gap-3 mb-10"
      >
        {[
          { label: '照片', value: stats.photos, emoji: '📷' },
          { label: '视频', value: stats.videos, emoji: '🎬' },
          { label: '日记', value: stats.diaries, emoji: '📔' },
          { label: '想法', value: stats.ideas, emoji: '💭' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5 + idx * 0.05 }}
            className="cute-card p-4 text-center"
          >
            <div className="text-2xl mb-1">{stat.emoji}</div>
            <div className="font-bold text-lg text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* About Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <div className="cute-card p-6 md:p-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">关于这里</h2>
          </div>
          <div className="space-y-4 text-foreground/80">
            <p className="leading-relaxed">
              欢迎来到我的小天地 🌸 这里是我记录生活点滴的地方。
            </p>
            <p className="leading-relaxed">
              阳光、咖啡、书籍、音乐，还有那些平凡却温暖的小瞬间…… 都想好好收藏起来。
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['📸 生活记录', '🎬 视频收藏', '📔 日记随笔', '💭 碎碎念'].map(tag => (
                <span key={tag} className="cute-tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quote */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-center mt-10"
      >
        <p className="text-muted italic text-sm">
          「把普通的每一天，都过成闪闪发光的样子 ✨」
        </p>
        <p className="text-xs text-muted mt-3 flex items-center justify-center gap-1">
          用 <Heart className="w-3 h-3 text-primary fill-primary animate-pulse-soft" /> 记录
        </p>
      </motion.div>
    </motion.div>
  )
}
