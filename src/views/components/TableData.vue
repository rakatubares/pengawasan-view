<template>
	<CCard>
		<CCardHeader>
			<slot name="header">
				<CIcon name="cil-grid"/> {{caption}}
			</slot>
		</CCardHeader>
		<CCardBody>
			<CDataTable
				:hover="hover"
				:striped="striped"
				:border="border"
				:small="small"
				:fixed="fixed"
				:items="items"
				:fields="fields"
				:items-per-page="small ? 10 : 5"
				:dark="dark"
				pagination
			>
				<template #status="{item}">
					<td>
						<CBadge :color="getBadge(item.status)">{{item.status}}</CBadge>
					</td>
				</template>
				
				<template #actions="{item}">
					<slot name="buttons">
						<td>
							<CButton 
								class="m-1"
								size="sm" 
								color="success"
								@click="editData(item.id)"
							>
								Edit
							</CButton>
							<CButton 
								class="m-1"
								size="sm" 
								color="danger"
								@click="deleteData(item.id)"
							>
								Hapus
							</CButton>
						</td>
					</slot>
				</template>
				
			</CDataTable>
		</CCardBody>
	</CCard>
</template>

<script>
export default {
	name: 'Table',
	props: {
		items: Array,
		fields: {
			type: Array,
			default () {
				return ['username', 'registered', 'role', 'status', 'actions']
			}
		},
		caption: {
			type: String,
			default: 'Table'
		},
		hover: Boolean,
		striped: Boolean,
		border: Boolean,
		small: Boolean,
		fixed: Boolean,
		dark: Boolean,
		editData: Function,
		deleteData: Function
	},
	methods: {
		getBadge (status) {
			return status === 'Active' ? 'success'
			: status === 'Inactive' ? 'secondary'
				: status === 'Pending' ? 'warning'
				: status === 'Banned' ? 'danger' : 'primary'
		}
	}
}
</script>
