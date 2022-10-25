export default [
	{
		_name: 'CSidebarNav',
		_children: [
			{
				_name: 'CSidebarNavTitle',
				_children: ['Form'],
				permissions: [
					'view-lppi', 'view-lkai', 'view-nhi', 'view-ni',
					'view-lppin', 'view-lkain', 'view-nhin', 'view-nin',
				]
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
						icon: 'cil-file',
						permissions: 'view-lppi',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LKAI',
						to: '/lkai',
						icon: 'cil-file',
						permissions: 'view-lkai',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NHI',
						to: '/nhi',
						icon: 'cil-file',
						permissions: 'view-nhi',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NI',
						to: '/ni',
						icon: 'cil-file',
						permissions: 'view-ni',
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
						icon: 'cil-file',
						permissions: 'view-lppin',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LKAI-N',
						to: '/lkain',
						icon: 'cil-file',
						permissions: 'view-lkain',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NHI-N',
						to: '/nhin',
						icon: 'cil-file',
						permissions: 'view-nhin',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'NI-N',
						to: '/nin',
						icon: 'cil-file',
						permissions: 'view-nin',
					},
				]
			},
		]
	}
]