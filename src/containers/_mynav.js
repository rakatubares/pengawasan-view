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
				]
			}
		]
	}
]