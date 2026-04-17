import { useState } from 'react'
import { motion } from 'framer-motion'
import { useApp } from '@/context/AppContext'
import Lightbox from '@/components/common/Lightbox'

export default function Gallery() {
  const { posts } = useApp()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Collect all images from posts
  const allImages = posts.flatMap(post =>
    post.media
      .filter(m => m.type === 'image')
      .map(img => ({
        ...img,
        postId: post.id,
        postTitle: post.title || post.content.slice(0, 30),
        postDate: post.createdAt
      }))
  )

  // Create masonry-like layout
  const columns = 3
  const columnImages: typeof allImages[] = Array.from({ length: columns }, () => [])
  
  allImages.forEach((img, idx) => {
    columnImages[idx % columns].push(img)
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          相册
        </h1>
        <p className="text-muted">
          {allImages.length} 张照片
        </p>
      </div>

      {allImages.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columnImages.map((column, colIdx) => (
            <div key={colIdx} className="space-y-4">
              {column.map((img, imgIdx) => {
                const globalIdx = allImages.findIndex(i => i.id === img.id)
                return (
                  <motion.div
                    key={img.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (colIdx + imgIdx) * 0.05, duration: 0.3 }}
                    className="relative group cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => {
                      setLightboxIndex(globalIdx)
                      setLightboxOpen(true)
                    }}
                  >
                    <img
                      src={img.thumbnail || img.url}
                      alt={img.postTitle}
                      className="w-full transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white text-sm line-clamp-2">{img.postTitle}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-4xl">📷</span>
          </div>
          <h3 className="font-serif text-xl text-foreground mb-2">还没有照片</h3>
          <p className="text-muted">上传你的第一张照片吧</p>
        </div>
      )}

      <Lightbox
        images={allImages.map(m => m.url)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </motion.div>
  )
}
