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
				_children: ['Penindakan']
			},
			{
				_name: 'CSidebarNavItem',
				name: 'SBP',
				to: '/sbp',
				icon: 'cil-file'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'LPHP',
				to: '/lphp',
				icon: 'cil-file'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'LP',
				to: '/lp',
				icon: 'cil-file'
			},
		]
	}
]