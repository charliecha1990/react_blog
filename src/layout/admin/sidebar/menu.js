const menu = [
  {
    path: '/admin',
    icon: 'home',
    name: 'home'
  },
  {
    path: '/admin/article',
    icon: 'switcher',
    name: 'artilce',
    children: [
      {
        path: '/admin/article/manager',
        icon: 'folder',
        name: 'manager'
      },
      {
        path: '/admin/article/add',
        icon: 'edit',
        name: 'add'
      }
    ]
  },
  {
    path: '/admin/user',
    icon: 'user',
    name: 'user management'
  }
]

export default menu
