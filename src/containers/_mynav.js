export default [
	{
		_name: 'CSidebarNav',
		_children: [
			{
				_name: 'CSidebarNavTitle',
				_children: ['Form'],
				permissions: [
					'view-lppi', 
					'view-lkai', 
					'view-nhi', 
					'view-ni',
					'view-li', 
					'view-lap', 
					'view-riksa', 
					'view-riksa-badan', 
					'view-segel', 
					'view-buka-segel', 
					'view-titip', 
					'view-pengaman', 
					'view-buka-pengaman',
					'view-contoh',
					'view-reekspor',
					'view-bast',
					'view-sbp',
					'view-tolak1',
					'view-tolak2',
					'view-lphp',
					'view-lp',
					'view-lppin', 
					'view-lkain', 
					'view-nhin', 
					'view-nin',
					'view-sbpn',
					'view-tolak1n',
					'view-tolak2n',
					'view-lphpn',
					'view-lpn',
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
						icon: 'cil-file',
						permissions: 'view-li',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LAP',
						to: '/lap',
						icon: 'cil-file',
						permissions: 'view-lap',
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
								icon: 'cil-file',
								permissions: 'view-riksa',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Periksa Badan',
								to: '/riksabadan',
								icon: 'cil-file',
								permissions: 'view-riksa-badan',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Segel',
								to: '/segel',
								icon: 'cil-file',
								permissions: 'view-segel',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Buka Segel',
								to: '/bukasegel',
								icon: 'cil-file',
								permissions: 'view-buka-segel',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penitipan',
								to: '/titip',
								icon: 'cil-file',
								permissions: 'view-titip',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Tanda Pengaman',
								to: '/pengaman',
								icon: 'cil-file',
								permissions: 'view-pengaman',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Pembukaan TP',
								to: '/bukapengaman',
								icon: 'cil-file',
								permissions: 'view-buka-pengaman',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Contoh Barang',
								to: '/contoh',
								icon: 'cil-file',
								permissions: 'view-contoh',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Reekspor',
								to: '/reekspor',
								icon: 'cil-file',
								permissions: 'view-reekspor',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BAST',
								to: '/bast',
								icon: 'cil-file',
								permissions: 'view-bast',
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
								icon: 'cil-file',
								permissions: 'view-sbp',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penolakan SBP 1',
								to: '/tolak1',
								icon: 'cil-file',
								permissions: 'view-tolak1',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penolakan SBP 2',
								to: '/tolak2',
								icon: 'cil-file',
								permissions: 'view-tolak2',
							}
						]
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
								icon: 'cil-file',
								permissions: 'view-sbpn',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penolakan SBP 1',
								to: '/tolak1',
								icon: 'cil-file',
								permissions: 'view-tolak1n',
							},
							{
								_name: 'CSidebarNavItem',
								name: 'BA Penolakan SBP 2',
								to: '/tolak2',
								icon: 'cil-file',
								permissions: 'view-tolak2n',
							},
						]
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LPHP-N',
						to: '/lphpn',
						icon: 'cil-file',
						permissions: 'view-lphpn',
					},
					{
						_name: 'CSidebarNavItem',
						name: 'LP-N',
						to: '/lpn',
						icon: 'cil-file',
						permissions: 'view-lpn',
					},
				]
			},
			{
				_name: 'CSidebarNavTitle',
				_children: ['Monitoring'],
				permissions: 'view-bhp'
			},
			{
				_name: 'CSidebarNavItem',
				name: 'Penarikan BHP',
				to: '/bhp',
				icon: 'cil-clipboard',
				permissions: 'view-bhp',
			},
		]
	}
]