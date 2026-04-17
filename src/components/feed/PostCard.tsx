import { Heart, MessageCircle, Share2, Play, Send } from 'lucide-react'
import { Post, PostType } from '@/types'
import { formatDate, cn } from '@/lib/utils'
import { Tag } from '@/components/ui/tag'
import { useApp } from '@/context/AppContext'
import { useState, useRef } from 'react'
import Lightbox from '@/components/common/Lightbox'

const typeLabels: Record<PostType, string> = {
  blog: '博客',
  diary: '日记',
  idea: '想法',
  photo: '相册',
  video: '视频'
}

const typeColors: Record<PostType, 'default' | 'primary' | 'secondary'> = {
  blog: 'primary',
  diary: 'default',
  idea: 'secondary',
  photo: 'primary',
  video: 'secondary'
}

export default function PostCard({ post }: { post: Post }) {
  const { likePost, addComment } = useApp()
  const [showComments, setShowComments] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [playingVideo, setPlayingVideo] = useState<string | null>(null)
  const [commentText, setCommentText] = useState('')
  const videoRef = useRef<HTMLVideoElement>(null)

  const images = post.media.filter(m => m.type === 'image')
  const videos = post.media.filter(m => m.type === 'video')

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('链接已复制！')
    } catch {
      // Fallback
    }
  }

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const handleSubmitComment = () => {
    const text = commentText.trim()
    if (!text) return
    addComment(post.id, {
      userId: 'visitor',
      userName: '访客',
      userAvatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop',
      content: text,
    })
    setCommentText('')
    setShowComments(true)
  }

  return (
    <>
      <article className="bg-card rounded-lg shadow-soft overflow-hidden card-hover">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground truncate">{post.authorName}</span>
              <Tag variant={typeColors[post.type]}>{typeLabels[post.type]}</Tag>
            </div>
            <span className="text-xs text-muted">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-3">
          {post.title && (
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
              {post.title}
            </h3>
          )}
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        {/* Media */}
        {post.media.length > 0 && (
          <div className="px-5 pb-3">
            {/* Images Grid */}
            {images.length > 0 && (
              <div className={cn(
                "grid gap-2",
                images.length === 1 && "grid-cols-1",
                images.length === 2 && "grid-cols-2",
                images.length >= 3 && "grid-cols-3"
              )}>
                {images.slice(0, 9).map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => handleImageClick(idx)}
                    className={cn(
                      "relative overflow-hidden rounded-lg aspect-square",
                      images.length === 1 && "aspect-video max-h-80",
                      "focus:outline-none focus:ring-2 focus:ring-primary"
                    )}
                  >
                    <img
                      src={img.thumbnail || img.url}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Videos */}
            {videos.map(video => (
              <div
                key={video.id}
                className="relative mt-2 rounded-lg overflow-hidden aspect-video bg-gray-100"
              >
                {playingVideo === video.id ? (
                  <video
                    ref={videoRef}
                    src={video.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <button
                    onClick={() => setPlayingVideo(video.id)}
                    className="absolute inset-0 group"
                  >
                    <img
                      src={video.thumbnail || ''}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-gray-800 ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 rounded text-white text-xs">
                        {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                      </div>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Tag key={tag} variant="default">#{tag}</Tag>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-3 border-t border-border/50 flex items-center gap-4">
          <button
            onClick={() => likePost(post.id)}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-colors",
              post.liked ? "text-red-500" : "text-muted hover:text-red-500"
            )}
          >
            <Heart className={cn("w-5 h-5", post.liked && "fill-current")} />
            <span>{post.likes || ''}</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length || ''}</span>
          </button>
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors ml-auto"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="px-5 pb-4 space-y-3 border-t border-border/30 pt-3">
            {post.comments.length > 0 ? (
              post.comments.map(comment => (
                <div key={comment.id} className="flex gap-2">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium">{comment.userName}</span>
                      <span className="text-xs text-muted">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-foreground">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted text-center py-2">还没有评论，来留下第一条吧 ✨</p>
            )}
            {/* Comment Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmitComment()}
                placeholder="写下你的想法..."
                className="flex-1 text-sm px-3 py-2 rounded-lg border border-border bg-secondary/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                className="p-2 rounded-lg bg-primary text-white hover:bg-[#D9A090] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </article>

      {/* Lightbox */}
      <Lightbox
        images={images.map(m => m.url)}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  )
}
