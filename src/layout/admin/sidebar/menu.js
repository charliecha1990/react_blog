const menu = [
  {
    path: '/admin',
    icon: 'home',
    name: 'Home'
  },
  {
    path: '/admin/article',
    icon: 'switcher',
    name: 'Artilce',
    children: [
      {
        path: '/admin/article/manager',
        icon: 'folder',
        name: 'Manager'
      },
      {
        path: '/admin/article/add',
        icon: 'edit',
        name: 'Add'
      }
    ]
  },
  {
    path: '/admin/user',
    icon: 'user',
    name: 'User Management'
  }
]

export default menu
