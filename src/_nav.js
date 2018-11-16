export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Anggota',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Daftar Anggota',
      url: 'members',
      icon: 'icon-user'
    },
    {
      title: true,
      name: 'Berita',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Daftar Berita',
      url: '/news',
      icon: 'cui-file'
    },
    {
      title: true,
      name: 'Pendanaan',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Daftar Pendanaan',
      url: '/funding',
      icon: 'icon-star'
    },
    {
      name: 'Daftar Pembayaran',
      url: '/payment',
      icon: 'fa fa-money'
    },
    {
      title: true,
      name: 'Adik Asuh',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Daftar Adik Asuh',
      url: '/student',
      icon: 'icon-heart'
    },
    {
      divider: true
    }
  ]
}
