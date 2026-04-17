import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Video, FileText, Lightbulb, BookOpen, Plus } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tag } from '@/components/ui/tag'
import { PostType, MediaItem } from '@/types'
import { cn } from '@/lib/utils'

const typeOptions: { type: PostType; label: string; icon: React.ElementType; description: string }[] = [
  { type: 'blog', label: '博客', icon: BookOpen, description: '分享你的故事和见解' },
  { type: 'diary', label: '日记', icon: FileText, description: '记录日常的心情' },
  { type: 'idea', label: '想法', icon: Lightbulb, description: '记录一闪而过的灵感' },
  { type: 'photo', label: '相册', icon: ImageIcon, description: '分享照片' },
  { type: 'video', label: '视频', icon: Video, description: '分享视频' },
]

export default function Create() {
  const navigate = useNavigate()
  const { user, addPost } = useApp()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const [step, setStep] = useState(1)
  const [postType, setPostType] = useState<PostType | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [media, setMedia] = useState<MediaItem[]>([])
  const [uploading, setUploading] = useState(false)

  const handleTypeSelect = (type: PostType) => {
    setPostType(type)
    setStep(2)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setUploading(true)
    const newMedia: MediaItem[] = []

    for (let i = 0; i < Math.min(files.length, 9 - media.length); i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        newMedia.push({
          id: `img-${Date.now()}-${i}`,
          type: 'image',
          url,
          thumbnail: url
        })
      }
    }

    setMedia(prev => [...prev, ...newMedia])
    setUploading(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || !files[0]) return

    setUploading(true)
    const file = files[0]
    const url = URL.createObjectURL(file)

    // Get video duration
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.src = url
    video.onloadedmetadata = () => {
      setMedia([{
        id: `vid-${Date.now()}`,
        type: 'video',
        url,
        thumbnail: '',
        duration: Math.floor(video.duration)
      }])
      setUploading(false)
    }

    if (videoInputRef.current) videoInputRef.current.value = ''
  }

  const removeMedia = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id))
  }

  const addTag = () => {
    const tag = tagInput.trim()
    if (tag && !tags.includes(tag) && tags.length < 5) {
      setTags(prev => [...prev, tag])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag))
  }

  const handleSubmit = () => {
    if (!postType || !content.trim()) return

    addPost({
      type: postType,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      title: title.trim() || undefined,
      content: content.trim(),
      media,
      tags
    })

    navigate('/')
  }

  const canProceed = () => {
    if (step === 2 && !postType) return false
    if (step === 3 && !content.trim()) return false
    if (step === 4 && postType !== 'idea' && media.length === 0) return false
    return true
  }

  const handleNext = () => {
    const needsMediaStep = postType === 'photo' || postType === 'video'
    const maxStep = needsMediaStep ? 4 : 3
    if (step < maxStep) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const needsMediaStep = postType === 'photo' || postType === 'video'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 max-w-2xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
          写点什么
        </h1>
        <p className="text-muted">
          记录生活的每一个瞬间
        </p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3, needsMediaStep ? 4 : 3].map(s => (
          <div
            key={s}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              s <= step ? "bg-primary" : "bg-secondary"
            )}
          />
        ))}
      </div>

      {/* Step 1: Select Type */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {typeOptions.map(option => {
            const Icon = option.icon
            return (
              <button
                key={option.type}
                onClick={() => handleTypeSelect(option.type)}
                className={cn(
                  "p-6 rounded-xl border-2 text-left transition-all card-hover",
                  "border-border bg-card hover:border-primary hover:bg-primary/5"
                )}
              >
                <Icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  {option.label}
                </h3>
                <p className="text-sm text-muted">{option.description}</p>
              </button>
            )
          })}
        </div>
      )}

      {/* Step 2: Write Content */}
      {step === 2 && postType && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {postType === 'idea' ? '想法' : postType === 'photo' ? '照片描述' : '标题'}
            </label>
            <Input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={postType === 'idea' ? '记录你的灵感' : '给内容起个标题'}
              className="text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {postType === 'idea' ? '详细内容' : '内容'}
            </label>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={
                postType === 'idea' 
                  ? '写下你的想法...' 
                  : postType === 'diary'
                  ? '今天发生了什么...'
                  : '分享你的故事...'
              }
              className="min-h-[200px] text-base"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              标签（可选，最多5个）
            </label>
            <div className="flex gap-2 mb-2 flex-wrap">
              {tags.map(tag => (
                <Tag key={tag} variant="primary" className="pr-1.5">
                  #{tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Tag>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="添加标签后回车"
                disabled={tags.length >= 5}
              />
              <Button onClick={addTag} disabled={tags.length >= 5 || !tagInput.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(1)}>
              上一步
            </Button>
            <Button onClick={handleNext} disabled={!content.trim()}>
              {needsMediaStep ? '下一步' : '发布'}
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Add Media (for photo/video) */}
      {step === 3 && needsMediaStep && postType && (
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-foreground mb-4">
              {postType === 'photo' ? '上传照片' : '上传视频'}
            </h3>
            
            {postType === 'photo' && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading || media.length >= 9}
                  className={cn(
                    "w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors",
                    "border-border hover:border-primary hover:bg-primary/5",
                    (uploading || media.length >= 9) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Upload className="w-10 h-10 text-muted" />
                  <span className="text-muted">
                    {uploading ? '上传中...' : `点击上传照片（${media.length}/9）`}
                  </span>
                </button>

                {media.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 mt-4">
                    {media.map(m => (
                      <div key={m.id} className="relative aspect-square">
                        <img src={m.thumbnail || m.url} alt="" className="w-full h-full object-cover rounded-lg" />
                        <button
                          onClick={() => removeMedia(m.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {postType === 'video' && (
              <>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
                {media.length === 0 ? (
                  <button
                    onClick={() => videoInputRef.current?.click()}
                    disabled={uploading}
                    className={cn(
                      "w-full h-48 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition-colors",
                      "border-border hover:border-primary hover:bg-primary/5",
                      uploading && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Video className="w-10 h-10 text-muted" />
                    <span className="text-muted">{uploading ? '上传中...' : '点击上传视频'}</span>
                  </button>
                ) : (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                    <video
                      src={media[0].url}
                      controls
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={() => removeMedia(media[0].id)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)}>
              上一步
            </Button>
            <Button onClick={handleNext}>
              发布
            </Button>
          </div>
        </div>
      )}

      {/* Step 3/4: Preview for non-media types */}
      {step === 3 && !needsMediaStep && (
        <div className="space-y-6">
          <div className="bg-card rounded-xl p-6 border border-border">
            {title && <h2 className="font-serif text-xl font-semibold mb-3">{title}</h2>}
            <p className="text-foreground whitespace-pre-wrap">{content}</p>
            {tags.length > 0 && (
              <div className="flex gap-2 mt-4">
                {tags.map(tag => (
                  <Tag key={tag} variant="default">#{tag}</Tag>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setStep(2)}>
              修改
            </Button>
            <Button onClick={handleSubmit}>
              发布
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  )
}
