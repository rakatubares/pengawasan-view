<template>
	<div class="wrapper" data-app>
		<CRow>
			<CCol>
				<CCard>
					<CCardHeader>
						<slot name="header">
							<CIcon name="cil-grid"/> Data Penarikan BHP
						</slot>
					</CCardHeader>
					<CCardBody>
						<CDataTable
							:items="filteredItems"
							:fields="table_fields"
							:items-per-page="5"
							columnFilter
							pagination
						>
							<template #status_penarikan="{item}">
								<td style="padding-left:30px;">
									<CBadge :color="getBadgeStatus(item.status_penarikan, 'color')">
										<CIcon :name="getBadgeStatus(item.status_penarikan, 'name')"/>
									</CBadge>
								</td>
							</template>

							<template #actions="{item}">
								<slot name="buttons">
									<td>
										<CButton 
											class="m-1"
											size="sm" 
											color="primary"
											@click="showData(item)"
										>
											Lihat
										</CButton>
									</td>
								</slot>
							</template>

							<template #status_penarikan-filter>
								<CSelect
									class="mb-0"
									:options="[
										{ value: null, label: 'Semua' },
										{ value: true, label: 'Sudah' },
										{ value: false, label: 'Belum' }
									]"
									:value.sync="filtered_status"
								/>
							</template>
						</CDataTable>
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>

		<!-- Modal Monitoring BHP -->
		<MyModalBhp
			v-if="modal_data_props.show"
			:state="modal_data_props.state"
			:id.sync="modal_data_props.doc_id"
			@close-modal="closeModal"
		/>
	</div>
</template>

<script>
import api2 from '../../../router/api2.js'
import MyModalBhp from './ModalBhp.vue'
import MyTableData from '../../components/TableData.vue'

export default {
	name: 'PageBhp',
	components: {
		MyModalBhp,
		MyTableData
	},
	props: {
		doc_type: {
			type: String,
			default: 'sbp/tarik'
		},
	},
	computed: {
		filteredItems() {
			return this.table_data.filter(item => {
				if (this.filtered_status != null) {
					const status = item.status_penarikan
					if (this.filtered_status == true) {
						return status == 1	
					} else {
						return status == null
					}
				} else {
					return true
				}
			})
		}
	},
	data() {
		return {
			table_data: [],
			table_title: `Monitoring Penarikan BHP`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No SBP` },
				{ key: 'tanggal_dokumen', label: `Tgl SBP` },
				{ key: 'lokasi_penindakan', label: 'Lokasi Penindakan' },
				{ key: 'status_penarikan', label: 'Status Penarikan' },
				{ key: 'tanggal_penarikan', label: 'Tanggal Penarikan' },
				{ key: 'petugas_penarikan', label: 'Petugas' },
				{ key: 'actions', label: '', filter: false },
			],
			filtered_status: null,
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
		}
	},
	methods: {
		async getDataTable() {
			this.table_data = await api2.getListDocuments(this.doc_type)
			for (let index = 0; index < this.table_data.length; index++) {
				this.table_data[index]['tanggal_penarikan'] = this.table_data[index]['tanggal_penarikan'] 
					? this.table_data[index]['tanggal_penarikan'] 
					: ''
				this.table_data[index]['petugas_penarikan'] = this.table_data[index]['petugas_penarikan'] 
					? this.table_data[index]['petugas_penarikan']['name']
					: ''
			}
		},
		getBadgeStatus(status, type) {
			let icon = {name: null, color: null}
			if (status == 1) {
				icon = {name: 'cil-check-circle', color: 'success'}
			} else {
				icon = {name: 'cil-x-circle', color: 'danger'}
			}
			return icon[type]
		},
		showData(item) {
			let state = item.status_penarikan == 1 ? 'show' : 'store'

			this.modal_data_props = {
				show: true,
				state: state,
				doc_id: item.id,
			}
		},
		closeModal() {
			this.getDataTable()
			this.modal_data_props.state = null
			this.modal_data_props.doc_id = null
			this.modal_data_props.show = false
		},
	},
	mounted() {
		this.getDataTable()
	}
}
</script>

<style>

</style>