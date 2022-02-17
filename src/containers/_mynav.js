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
						_name: 'CSidebarNavDropdown',
						name: 'Berita Acara',
						icon: 'cil-list',
						_children: [
							{
								_name: 'CSidebarNavItem',
								name: 'BA Segel',
								to: '/segel',
								icon: 'cil-file'
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Buka Segel',
								to: '/bukasegel',
								icon: 'cil-file'
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penitipan',
								to: '/titip',
								icon: 'cil-file'
							},
						]
					}
				]
			}
		]
	}
]