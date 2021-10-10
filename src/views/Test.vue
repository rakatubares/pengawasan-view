<template>
	<div>
		<CTable>
		</CTable>
		<CTableWrapper
			:fields="fields"
			:items="items"
			:editData="editChildData"
		>
		<template v-slot:actions>
			<td>
				<CButton 
					size="sm" 
					color="success"
				>
					Edit Barang
				</CButton>
				<CButton 
					size="sm" 
					color="danger"
				>
					Hapus Barang
				</CButton>
			</td>
		</template>
		</CTableWrapper>
	</div>
</template>

<script>
import CTable from './components/Table.vue'
import CTableWrapper from './components/TableData.vue'

const items = [
	{
		id: 1,
		username: 'aaa',
		status: 'active'
	},
	{
		id: 2,
		username: 'bbb',
		status: 'inactive'
	}
]

const fields = [
	{ key: 'username' },
	{ key: 'status' },
	{ key: 'actions' },
]
export default {
	name: 'Test',
	components: {
		CTable,
		CTableWrapper
	},
	// props: ['items'],
	data() {
		return {
			// items: [
			// 	{
			// 		username: 'aaa',
			// 		status: 'active'
			// 	},
			// 	{
			// 		username: 'bbb',
			// 		status: 'inactive'
			// 	}
			// ]
			items: items.map((item, id) => { return {...item, id}}),
			fields,
			console
		}
	},
	methods: {
		editChildData(id) {
			console.log('edit child', id)
		}
	}
}
</script>

<style>

</style>