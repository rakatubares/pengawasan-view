export default [
	{
		_name: 'CSidebarNav',
		_children: [
			{
				_name: 'CSidebarNavTitle',
				_children: ['Form'],
				permissions: [
					'view-segel', 
					'view-sbp',
					'view-lphp',
					'view-lp',
				],
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
								icon: 'cil-file',
								permissions: 'view-segel',
							},
						],
					},
					{
						_name: 'CSidebarNavDropdown',
						name: 'SBP',
						icon: 'cil-list',
						_children: [
							{
								_name: 'CSidebarNavItem',
								name: 'Input SBP',
								to: '/sbp',
								icon: 'cil-file',
								permissions: 'view-sbp',
							},
						],
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LPHP',
						to: '/lphp',
						icon: 'cil-file',
						permissions: 'view-lphp',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LP',
						to: '/lp',
						icon: 'cil-file',
						permissions: 'view-lp',
					},
				],
			},
			{
				_name: 'CSidebarNavDropdown',
				name: 'PENYIDIKAN',
				icon: 'cil-contact',
				_children: [
					{
						_name: 'CSidebarNavItem',
						name: 'Input LPP',
						to: '/lpp',
						icon: 'cil-file',
						permissions: 'view-lpp',
					},
				],
			},
		],
	}
]