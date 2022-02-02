<template>
	<div class="wrapper" data-app>
		<!-- Display table data for BA Reekspor list -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="computedItems"
					:editData="editDoc"
					:deleteData="deleteDoc"
					:showData="showDoc"
					:custom_fields="['dok_asal', 'dok_ekspor', 'petugas']"
				>
					<template #header>
						<CIcon name="cil-grid"/>Daftar BA Pengawasan Reekspor
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="createDoc"
								class="mr-1"
							>
								+ Buat Baru
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input reekspor -->
		<MyModalReekspor
			v-if="modal_props.show"
			:state="modal_props.state"
			:id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		/>

		<!-- Modal konfirmasi delete reekspor -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:doc_type="modal_delete_props.doc_type"
			:doc_id="modal_delete_props.doc_id"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyModalReekspor from './ModalReekspor.vue'
import MyTableData from '../../components/TableData.vue'

const tabs_default = {
	current: 0,
	list: [
		{
			title: 'Uraian',
			visibility: true
		}, 
		{
			title: 'Objek',
			visibility: false
		}, 
		{
			title: 'Print',
			visibility: false
		}
	]
}

export default {
	name: 'PageReekspor',
	components: {
		MyModalDelete,
		MyModalReekspor,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Pengawasan Reekspor' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'dok_asal', label: 'Dok. Asal' },
				{ key: 'dok_ekspor', label: 'Dok. Ekspor' },
				{ key: 'petugas', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'reekspor',
			modal_props: {
				show: false,
				state: null,
				doc_id: null
			},
			modal_delete_props: {
				show: false,
				doc_type: null,
				doc_id: null,
				text: null
			},
		}
	},
	computed: {
		computedItems() {
			return this.list_table.map(item => {
				return {
					...item,
					dok_asal: item.jenis_dok_asal + ' ' + item.nomor_dok_asal + '</br>' + item.tanggal_dok_asal,
					dok_ekspor: item.jenis_dok_ekspor + ' ' + item.nomor_dok_ekspor + '</br>' + item.tanggal_dok_ekspor,
					petugas: item.petugas1 + '</br>' + item.petugas2,
				}
			})
		}
	},
	methods: {
		async getDataTable() {
			this.list_table = await api.getListDocuments(this.doc_type)
			
		},
		createDoc() {
			this.modal_props.state = 'insert'
			this.modal_props.doc_id = null
			this.modal_props.show = true
		},
		editDoc(id) {
			this.modal_props.state = 'edit'
			this.modal_props.doc_id = id
			this.modal_props.show = true
		},
		showDoc(id) {
			this.modal_props.state = 'show'
			this.modal_props.doc_id = id
			this.modal_props.show = true
		},
		closeModal() {
			this.getDataTable()
			this.modal_props.state = null
			this.modal_props.doc_id = null
			this.modal_props.show = false
		},
		saveData(state) {
			if (state == 'insert') {
				this.displayTab(1)
				this.displayTab(2)
				this.$refs.modal_tabs.getNavs(0)
			} else {
				this.refreshPdf()
			}
		},
		deleteDoc(item) {
			let text = "Apakah Anda yakin untuk menghapus data BA Reekspor atas " 
				+ item.dok_asal.bold() 
				+ " tanggal "
				+ item.tanggal_dok_asal.bold() 
				+ "?"
			
			this.modal_delete_props.doc_type = this.doc_type,
			this.modal_delete_props.doc_id = item.id
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.getDataTable()
			this.modal_delete_props.doc_type = null
			this.modal_delete_props.doc_id = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		publishSbp(id) {
			this.showSbp(id)
		},
		displayTab(tab_index) {
			this.modal_props.tabs.list[tab_index]['visibility'] = true
		},
		refreshPdf() {
			this.$refs.pdf_sbp.showPdf()
		}
	},
	created() {
		this.getDataTable()
	}
}
</script>

<style>
</style>