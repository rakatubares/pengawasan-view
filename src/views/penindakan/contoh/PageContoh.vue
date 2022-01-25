<template>
	<div class="wrapper" data-app>
		<!-- Display table data for BA Contoh Barang list -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="list_table"
					:editData="editDoc"
					:deleteData="deleteDoc"
					:showData="showDoc"
				>
					<template #header>
						<CIcon name="cil-grid"/>Daftar BA Contoh Barang
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

		<!-- Modal input SBP -->
		<MyModalContoh
			v-if="modal_props.show"
			:state="modal_props.state"
			:id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		/>

		<!-- Modal konfirmasi delete SBP -->
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
import MyModalContoh from './ModalContoh.vue'
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
	name: 'PageContoh',
	components: {
		MyModalDelete,
		MyModalContoh,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Contoh Barang' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'nama_saksi', label: 'Saksi/Pemilik' },
				{ key: 'petugas1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'contoh',
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
	methods: {
		async getDataTable() {
			this.list_table = await api.getListDocuments('contoh')
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
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ " a.n. " 
				+ item.nama_saksi.bold() 
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