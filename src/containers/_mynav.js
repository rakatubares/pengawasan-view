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
			{
				_name: 'CSidebarNavItem',
				name: 'BA Periksa',
				to: '/riksa',
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
				name: 'BAST',
				to: '/bast',
				icon: 'cil-file'
			},
			// {
			// 	_name: 'CSidebarNavItem',
			// 	name: 'Penegahan',
			// 	to: '/tegah',
			// 	icon: 'cil-file'
			// },
		]
	}
]