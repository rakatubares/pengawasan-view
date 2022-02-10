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
				name: 'BA Penolakan SBP 1',
				to: '/tolak1',
				icon: 'cil-file'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'BA Penolakan SBP 2',
				to: '/tolak2',
				icon: 'cil-file'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'LPHP',
				to: '/lphp',
				icon: 'cil-file'
			},
		]
	}
]