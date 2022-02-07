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
				<template v-for="field in custom_fields" v-slot:[field]="slotProps">
					<slot :name="field">
						<td :key="`${field} ${slotProps.item.id}`" v-html="slotProps.item[field]">
						</td>
					</slot>
				</template>

				<template #status="{item}">
					<td>
						<CBadge :color="item.status.color">{{item.status.short_status}}</CBadge>
					</td>
				</template>
				
				<template #actions="{item}">
					<slot name="buttons">
						<td>
							<CButton 
								v-if="getButton('edit', item)"
								class="m-1"
								size="sm" 
								color="success"
								@click="editData(item.id)"
							>
							<!-- v-if="[100, 101].includes(item.status.kode_status)" -->
								Edit
							</CButton>
							<CButton 
								v-if="getButton('delete', item)"
								class="m-1"
								size="sm" 
								color="danger"
								@click="deleteData(item)"
							>
								Hapus
							</CButton>
							<CButton 
								v-if="getButton('show', item)"
								class="m-1"
								size="sm" 
								color="primary"
								@click="showData(item.id)"
							>
								Lihat
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
		state: {
			type: String,
			default: 'edit'
		},
		items: Array,
		fields: {
			type: Array,
			default () {
				return ['username', 'registered', 'role', 'status', 'actions']
			}
		},
		custom_fields: Array,
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
		deleteData: Function,
		showData: Function
	},
	methods: {
		getBadge(status) {
			return status === 100 ? 'warning'
				: status === 101 ? 'warning'
				: status === 200 ? 'success'
				: status === 210 ? 'warning'
				: status === 211 ? 'success'
				: status === 300 ? 'danger' 
				: 'primary'
		},
		getButton(type, item) {
			let btn = false

			if (this.state == 'edit') {
				if ((type == 'edit') || (type == 'delete')) {
					btn = true
				} else {
					btn = false
				}
			} else if (this.state == 'list') {
				if ((type == 'edit') || (type == 'delete')) {
					btn = [100].includes(item.status.kode_status)
				} else if (type == 'show') {
					btn = [101, 102, 200, 201, 202].includes(item.status.kode_status)
				} else {
					btn = false
				}
			} else {
				btn = false
			}

			return btn
		}
	}
}
</script>
