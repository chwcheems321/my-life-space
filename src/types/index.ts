export type PostType = 'blog' | 'diary' | 'idea' | 'photo' | 'video'

export interface User {
  id: string
  name: string
  avatar: string
  bio: string
}

export interface MediaItem {
  id: string
  type: 'image' | 'video'
  url: string
  thumbnail?: string
  duration?: number // for videos, in seconds
}

export interface Comment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface Post {
  id: string
  type: PostType
  authorId: string
  authorName: string
  authorAvatar: string
  title?: string
  content: string
  media: MediaItem[]
  tags: string[]
  likes: number
  liked: boolean
  comments: Comment[]
  createdAt: string
}

export interface AppState {
  user: User
  posts: Post[]
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>) => void
  likePost: (postId: string) => void
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void
}
