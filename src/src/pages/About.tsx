import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function About() {
  const { user, posts } = useApp()

  const stats = {
    blogs: posts.filter(p => p.type === 'blog').length,
    diaries: posts.filter(p => p.type === 'diary').length,
    photos: posts.flatMap(p => p.media.filter(m => m.type === 'image')).length,
    videos: posts.flatMap(p => p.media.filter(m => m.type === 'video')).length,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      {/* Profile Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2"
        >
          {user.name}
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-muted max-w-md mx-auto"
        >
          {user.bio}
        </motion.p>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { label: '博客', value: stats.blogs, emoji: '📝' },
          { label: '日记', value: stats.diaries, emoji: '📔' },
          { label: '照片', value: stats.photos, emoji: '📷' },
          { label: '视频', value: stats.videos, emoji: '🎬' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-xl p-6 text-center shadow-soft"
          >
            <div className="text-3xl mb-2">{stat.emoji}</div>
            <div className="font-serif text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-sm text-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* About Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-card rounded-xl p-8 shadow-soft">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
            关于这个空间
          </h2>
          <div className="prose prose-gray max-w-none space-y-4 text-foreground">
            <p>
              欢迎来到我的个人空间！这里是我记录生活、分享想法的地方。
            </p>
            <p>
              我相信每一个平凡的日子都值得被记住。阳光穿过树叶的缝隙、咖啡杯上袅袅升起的热气、深夜读到的一段触动人心的话……这些看似微不足道的瞬间，构成了我们生命中最珍贵的回忆。
            </p>
            <p>
              这个网站就是我的数字手账，用来存放那些想要永远留住的照片、文字和视频。
            </p>
            <h3 className="font-serif text-xl font-semibold mt-6 mb-3">我在这里记录</h3>
            <ul className="list-disc list-inside space-y-2 text-muted">
              <li>旅途中的风景和故事</li>
              <li>日常的小确幸和感悟</li>
              <li>读过的书、看过的电影</li>
              <li>烹饪的美食和烘焙的甜点</li>
              <li>一闪而过的灵感想法</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-muted italic">
          「生活不是等待风暴过去，而是学会在雨中起舞」
        </p>
        <p className="text-sm text-muted mt-2 flex items-center justify-center gap-1">
          用 <Heart className="w-4 h-4 text-primary fill-primary" /> 记录
        </p>
      </motion.div>
    </motion.div>
  )
}
