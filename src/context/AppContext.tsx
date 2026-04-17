import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Post, User, AppState, Comment } from '@/types'
import { defaultUser, mockPosts } from '@/data/mock'

const STORAGE_KEY = 'my-life-space-posts'

const AppContext = createContext<AppState | undefined>(undefined)

function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(defaultUser)
  const [posts, setPosts] = useState<Post[]>([])

  // Load posts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setPosts(JSON.parse(stored))
      } catch {
        setPosts(mockPosts)
      }
    } else {
      setPosts(mockPosts)
    }
  }, [])

  // Save posts to localStorage when changed
  useEffect(() => {
    if (posts.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    }
  }, [posts])

  const addPost = (postData: Omit<Post, 'id' | 'createdAt' | 'likes' | 'liked' | 'comments'>) => {
    const newPost: Post = {
      ...postData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: []
    }
    setPosts(prev => [newPost, ...prev])
  }

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const addComment = (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => {
    const newComment = {
      ...comment,
      id: `comment-${Date.now()}`,
      createdAt: new Date().toISOString()
    }
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        }
      }
      return post
    }))
  }

  return (
    <AppContext.Provider value={{ user, posts, addPost, likePost, addComment }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
