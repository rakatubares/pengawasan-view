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
				:items="filteredItems"
				:fields.sync="fields"
				:items-per-page="small ? 10 : 5"
				:dark="dark"
				columnFilter
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

				<template #status-filter>
					<CSelect
						class="mb-0"
						:options="mutable_status_options"
						:value.sync="filtered_status"
					/>
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
		fields: Array,
		custom_fields: Array,
		caption: {
			type: String,
			default: 'Table'
		},
		status_filter_options: Array,
		hover: Boolean,
		striped: Boolean,
		border: Boolean,
		small: Boolean,
		fixed: Boolean,
		dark: Boolean,
		editData: Function,
		deleteData: Function,
		showData: Function,
	},
	computed: {
		filteredItems() {
			return this.items.filter(item => {
				if (this.filtered_status != null) {
					const status = item.status.short_status
					return status == this.filtered_status
				} else {
					return true
				}
			})
		}
	},
	data() {
		return {
			filtered_status: null,
			mutable_status_options: []
		}
	},
	methods: {
		constructFields() {
			let field_keys = this.fields.map(function(field) {return field.key})
			
			if (!field_keys.includes('status')) {
				this.fields.push({ key: 'status', label: 'Status' })
			}
			if (!field_keys.includes('actions')) {
				this.fields.push({ key: 'actions', label: '' , filter: false})
			}
		},
		constructStatusFilter() {
			if (this.status_filter_options != undefined) {
				this.mutable_status_options = this.status_filter_options
				let filter_values = this.mutable_status_options.map(function(filter) {return filter.value})

				if (!filter_values.includes('terbit')) {
					this.mutable_status_options.unshift({ value: 'terbit', label: 'Terbit' })
				}
				if (!filter_values.includes('draft')) {
					this.mutable_status_options.unshift({ value: 'draft', label: 'Draft' })
				}
				if (!filter_values.includes(null)) {
					this.mutable_status_options.unshift({ value: null, label: 'Semua' })
				}	
			} else {
				this.mutable_status_options = [
					{ value: null, label: 'Semua' },
					{ value: 'draft', label: 'Draft' },
					{ value: 'terbit', label: 'Terbit' }
				]
			}
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
					btn = [101, 102, 103, 131, 200, 201, 202, 203, 231].includes(item.status.kode_status)
				} else {
					btn = false
				}
			} else {
				btn = false
			}

			return btn
		}
	},
	mounted() {
		this.constructFields()
		this.constructStatusFilter()
	}
}
</script>

<style>
.table-sm select {
	height: calc(1.5em + 0.5rem)
}
</style>