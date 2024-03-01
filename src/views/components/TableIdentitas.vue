<template>
	<div class="wrapper">
		<CRow>
			<CCol>
				<CCard>
					<CCardHeader>
						<b>Daftar Identitas</b>
						<div class="card-header-actions">
							<CButton
								v-if="(state==='insert') || (state==='update')"
								color="primary"
								size="sm"
								@click="insertData"
							>
								+ Identitas
							</CButton>
						</div>
					</CCardHeader>
					<CCardBody>
						<CDataTable
							v-if="show_table"
							:items.sync="list_identitas"
							:fields="fields"
							:items-per-page="5"
							pagination
						>
							<template #actions="{item, index}">
								<slot name="buttons">
									<td>
										<CButton 
											v-if="getButton('update')"
											class="m-1"
											size="sm" 
											color="success"
											@click="updateData(item, index)"
										>
											Edit
										</CButton>
										<CButton 
											v-if="getButton('delete')"
											class="m-1"
											size="sm" 
											color="danger"
											@click="deleteData(item, index)"
										>
											Hapus
										</CButton>
										<CButton 
											v-if="getButton('show')"
											class="m-1"
											size="sm" 
											color="primary"
											@click="showData(item, index)"
										>
											Detail
										</CButton>
									</td>
								</slot>
							</template>
						</CDataTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>

		<!-- Modal for input identitas -->
		<MyModalIdentitas
			ref="modal_identitas"
			:identity_types="identity_types"
			@save="saveIdentitas"
		/>

		<!-- Modal for delete identitas -->
		<MyModalDeleteItem
			ref="modal_delete"
			title="Hapus Identitas"
			label="identitas"
			@delete="deleteIdentitas"
		/>
	</div>
</template>

<script>
import MyModalDeleteItem from './ModalDeleteItem.vue'
import MyModalIdentitas from './ModalIdentitas.vue'

export default {
	name: "TableIdentitas",
	components: {
		MyModalDeleteItem,
		MyModalIdentitas,
	},
	props: {
		state: String,
		data: Array,
		identity_types: Array,
	},
	data() {
		return {
			fields: [
				{ key: 'jenis', label: 'Jenis' },
				{ key: 'nomor', label: 'Nomor' },
				{ key: 'actions', _style: 'min-width:20%' },
			],
			list_identitas: [],
			show_table: true,
		}
	},
	watch: {
		data(val) {
			this.list_identitas = val
		},
		list_identitas(val) {
			this.$emit('update:data', val)
		},
	},
	methods: {
		refreshTable() {
			// Refresh table (workaround for update data display)
			this.show_table = false
			this.$nextTick(function() {
				this.show_table = true
			})
		}, 
		insertData() {
			this.$refs.modal_identitas.showModal('insert')
		},
		updateData(item, index) {
			this.$refs.modal_identitas.showModal('update', index, item)
		},
		saveIdentitas(state, value, index) {
			if (state=='insert') {
				this.list_identitas.push(value)
			} else if (state=='update') {
				this.list_identitas[index] = JSON.parse(JSON.stringify(value))
			}

			this.refreshTable()
		},
		deleteData(item, index) {
			this.$refs.modal_delete.showModal(`${item.jenis} ${item.nomor}`, index)
		},
		deleteIdentitas(index) {
			this.list_identitas.splice(index, 1)
			this.refreshTable()
		},
		showData(item) {
			console.log('TABLR IDENTITAS - SHOW', item)
		},
		getButton(type) {
			let btn = false

			if (['insert', 'update'].includes(this.state)) {
				if (['update', 'delete'].includes(type)) {
					btn = true
				}
			} else {
				if (['show'].includes(type)) {
					btn = true
				}
			}

			return btn
		}
	}
}
</script>

<style>

</style>