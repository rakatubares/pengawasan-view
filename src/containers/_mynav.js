export default [
	{
		_name: 'CSidebarNav',
		_children: [
			{
				_name: 'CSidebarNavItem',
				name: 'Dashboard',
				to: '/dashboard',
				icon: 'chart'
			},
			{
				_name: 'CSidebarNavTitle',
				_children: ['Form']
			},
			{
				_name: 'CSidebarNavDropdown',
				name: 'INTELIJEN',
				icon: 'cil-zoom',
				_children: [
					{
						_name: 'CSidebarNavItem',
						name: 'LPPI',
						to: '/lppi',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LKAI',
						to: '/lkai',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NHI',
						to: '/nhi',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NI',
						to: '/ni',
						icon: 'cil-file'
					},
				]
			},
			{
				_name: 'CSidebarNavDropdown',
				name: 'NPP',
				icon: 'cil-blur',
				_children: [
					{
						_name: 'CSidebarNavItem',
						name: 'LPPI-N',
						to: '/lppin',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LKAI-N',
						to: '/lkain',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NHI-N',
						to: '/nhin',
						icon: 'cil-file'
					},
				]
			}
		]
	}
]