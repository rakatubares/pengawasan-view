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
				name: 'Periksa',
				to: '/riksa',
				icon: 'cil-file'
			},
		]
	}
]