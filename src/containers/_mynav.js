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
				_name: 'CSidebarNavDropdown',
				name: 'PENINDAKAN',
				icon: 'cil-clone',
				_children: [
					{
						_name: 'CSidebarNavItem',
						name: 'LAP',
						to: '/lap',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LI-1',
						to: '/li',
						icon: 'cil-file'
					},
				]
			}
		]
	}
]