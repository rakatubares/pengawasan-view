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
				name: 'PENINDAKAN',
				icon: 'cil-clone',
				_children: [
					{
						_name: 'CSidebarNavItem',
						name: 'LI-1',
						to: '/li',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LAP',
						to: '/lap',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavDropdown',
						name: 'Berita Acara',
						icon: 'cil-list',
						_children: [
							{
								_name: 'CSidebarNavItem',
								name: 'BA Periksa',
								to: '/riksa',
								icon: 'cil-file'
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Periksa Badan',
								to: '/riksabadan',
								icon: 'cil-file'
							},
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
							{
								_name: 'CSidebarNavItem',
								name: 'BA Contoh Barang',
								to: '/contoh',
								icon: 'cil-file'
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Reekspor',
								to: '/reekspor',
								icon: 'cil-file'
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BAST',
								to: '/bast',
								icon: 'cil-file'
							}
						]
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
							}
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
					{
						_name: 'CSidebarNavDropdown',
						name: 'SBP-N',
						icon: 'cil-list',
						_children: [
							{
								_name: 'CSidebarNavItem',
								name: 'Input SBP-N',
								to: '/sbpn',
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
						name: 'LPHP-N',
						to: '/lphpn',
						icon: 'cil-file'
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LP-N',
						to: '/lpn',
						icon: 'cil-file'
					},
				]
			},
			{
				_name: 'CSidebarNavTitle',
				_children: ['Monitoring']
			},
			{
				_name: 'CSidebarNavItem',
				name: 'Penarikan BHP',
				to: '/bhp',
				icon: 'cil-clipboard'
			},
		]
	}
]