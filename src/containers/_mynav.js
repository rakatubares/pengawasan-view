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
				name: 'BA Tanda Pengaman',
				to: '/pengaman',
				icon: 'cil-file'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'BA Pembukaan TP',
				to: '/bukapengaman',
				icon: 'cil-file'
			},
		]
	}
]