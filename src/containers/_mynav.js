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
						name: 'SBP',
						icon: 'cil-list',
						_children: [
							{
								_name: 'CSidebarNavItem',
								name: 'Input SBP',
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
						]
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
			},
		]
	}
]