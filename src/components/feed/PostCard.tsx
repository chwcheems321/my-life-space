import { Heart, MessageCircle, Share2, Play, Send } from 'lucide-react'
import { Post, PostType } from '@/types'
import { formatDate, cn } from '@/lib/utils'
import { useApp } from '@/context/AppContext'
import { useState, useRef } from 'react'
import Lightbox from '@/components/common/Lightbox'

const typeEmojis: Record<PostType, string> = {
  blog: '📝',
  diary: '📔',
  idea: '💭',
  photo: '📷',
  video: '🎬'
}

const typeLabels: Record<PostType, string> = {
  blog: '博客',
  diary: '日记',
  idea: '想法',
  photo: '图文',
  video: '视频'
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
      await navigator.clipboard.writeText(window.location.href + '#' + post.id)
      alert('链接已复制 ✨')
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
      userAvatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=visitor',
      content: text,
    })
    setCommentText('')
    setShowComments(true)
  }

  return (
    <>
      <article className="cute-card overflow-hidden">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <img
            src={post.authorAvatar}
            alt={post.authorName}
            className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-soft"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-foreground">{post.authorName}</span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-secondary to-accent text-xs text-primary-dark font-medium">
                <span>{typeEmojis[post.type]}</span>
                {typeLabels[post.type]}
              </span>
            </div>
            <span className="text-xs text-muted">{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-3">
          {post.title && (
            <h3 className="text-lg font-bold text-foreground mb-2">
              {post.title}
            </h3>
          )}
          <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
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
                      "relative overflow-hidden rounded-xl aspect-square",
                      images.length === 1 && "aspect-video",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
                className="relative mt-2 rounded-xl overflow-hidden aspect-video bg-gradient-to-br from-secondary to-accent"
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
                    className="absolute inset-0 group w-full h-full"
                  >
                    {video.thumbnail ? (
                      <img
                        src={video.thumbnail}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-5xl opacity-60">🎬</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-primary-dark ml-1" />
                      </div>
                    </div>
                    {video.duration && (
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/70 rounded-full text-white text-xs font-medium">
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
              <span key={tag} className="cute-tag text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-3 border-t border-primary/10 flex items-center gap-5">
          <button
            onClick={() => likePost(post.id)}
            className={cn(
              "flex items-center gap-1.5 text-sm transition-all hover:scale-105",
              post.liked ? "text-red-400" : "text-muted hover:text-red-400"
            )}
          >
            <Heart className={cn("w-5 h-5 transition-transform", post.liked && "fill-current scale-110")} />
            {post.likes ? <span className="ml-0.5">{post.likes}</span> : null}
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            {post.comments.length ? <span className="ml-0.5">{post.comments.length}</span> : null}
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
          <div className="px-5 pb-4 space-y-3 border-t border-primary/10 pt-3 bg-gradient-to-b from-transparent to-secondary/20">
            {post.comments.length > 0 ? (
              post.comments.map(comment => (
                <div key={comment.id} className="flex gap-2.5">
                  <img
                    src={comment.userAvatar}
                    alt={comment.userName}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-primary/20"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-bold">{comment.userName}</span>
                      <span className="text-xs text-muted">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-sm text-foreground/80">{comment.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted text-center py-3">还没有评论，来留下第一条吧 ✨</p>
            )}
            {/* Comment Input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmitComment()}
                placeholder="写下你的想法..."
                className="cute-input flex-1 text-sm"
              />
              <button
                onClick={handleSubmitComment}
                disabled={!commentText.trim()}
                className="cute-btn py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
