import { Post, User } from '@/types'

export const defaultUser: User = {
  id: 'user-1',
  name: '生活记录者',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
  bio: '用镜头和文字记录生活的每一个美好瞬间'
}

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    type: 'blog',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    title: '周末的一场说走就走的旅行',
    content: '清晨五点，窗外还笼罩着一层薄雾。我收拾好背包，踏上前往海边的旅程。车子沿着蜿蜒的山路前行，窗外的景色从城市的钢筋水泥渐渐变成了郁郁葱葱的山林。三个小时后，当我站在海边的那一刻，所有的疲惫都烟消云散。',
    media: [
      {
        id: 'img-1',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400'
      }
    ],
    tags: ['旅行', '周末', '海边'],
    likes: 128,
    liked: false,
    comments: [
      {
        id: 'c-1',
        userId: 'user-2',
        userName: '小美',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        content: '太美了！下次带上我呀~',
        createdAt: '2026-04-14T10:30:00'
      }
    ],
    createdAt: '2026-04-14T08:00:00'
  },
  {
    id: 'post-2',
    type: 'photo',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    content: '今天的天空像打翻了调色盘',
    media: [
      {
        id: 'img-2',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'
      },
      {
        id: 'img-3',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1490730141103-6cac27abb37f?w=400'
      },
      {
        id: 'img-4',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?w=400'
      }
    ],
    tags: ['天空', '摄影', '日常'],
    likes: 256,
    liked: true,
    comments: [],
    createdAt: '2026-04-13T18:30:00'
  },
  {
    id: 'post-3',
    type: 'diary',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    content: '今天尝试做了提拉米苏，虽然过程曲折，但成品意外地成功！咖啡和可可的香气弥漫整个厨房，这就是幸福的味道吧。',
    media: [
      {
        id: 'img-5',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400'
      }
    ],
    tags: ['烘焙', '日记', '美食'],
    likes: 89,
    liked: false,
    comments: [
      {
        id: 'c-2',
        userId: 'user-3',
        userName: '美食家小王',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        content: '求食谱！',
        createdAt: '2026-04-12T20:00:00'
      }
    ],
    createdAt: '2026-04-12T19:00:00'
  },
  {
    id: 'post-4',
    type: 'idea',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    content: '突然有一个想法：为什么不把每天早晨的第一缕阳光拍下来，做成一个「365天日出计划」呢？记录城市苏醒的样子，应该会很有意义。',
    media: [],
    tags: ['灵感', '摄影计划'],
    likes: 45,
    liked: false,
    comments: [],
    createdAt: '2026-04-11T07:00:00'
  },
  {
    id: 'post-5',
    type: 'video',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    title: '城市漫步 | 捕捉街头的温柔瞬间',
    content: '用镜头记录下这座城市里那些容易被忽略的美好——转角的花店、咖啡馆窗边的阅读者、地铁里疲惫却坚定的眼神。',
    media: [
      {
        id: 'vid-1',
        type: 'video',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600',
        duration: 15
      }
    ],
    tags: ['视频', '城市', '纪录'],
    likes: 178,
    liked: false,
    comments: [],
    createdAt: '2026-04-10T15:00:00'
  },
  {
    id: 'post-6',
    type: 'blog',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    title: '阅读笔记 | 《小森林》的治愈力量',
    content: '重温了一遍《小森林》，依然被那种简单纯粹的生活方式打动。城市里的我们，总是在追逐更快、更多、更高效。但这部电影提醒我们，有时候慢下来，才能真正感受生活的滋味。',
    media: [
      {
        id: 'img-6',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
      }
    ],
    tags: ['影评', '阅读', '生活哲学'],
    likes: 203,
    liked: true,
    comments: [
      {
        id: 'c-3',
        userId: 'user-4',
        userName: '文艺青年',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        content: '同感！每次看都很治愈',
        createdAt: '2026-04-09T22:00:00'
      }
    ],
    createdAt: '2026-04-09T20:00:00'
  },
  {
    id: 'post-7',
    type: 'photo',
    authorId: 'user-1',
    authorName: '生活记录者',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    content: '老巷子里的春天',
    media: [
      {
        id: 'img-7',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=400'
      },
      {
        id: 'img-8',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400'
      },
      {
        id: 'img-9',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400'
      },
      {
        id: 'img-10',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1200',
        thumbnail: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400'
      }
    ],
    tags: ['街头', '春天', '摄影'],
    likes: 312,
    liked: false,
    comments: [],
    createdAt: '2026-04-08T12:00:00'
  }
]
