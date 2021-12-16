<template>
  <div class="wrapper" data-app>
		<!-- Display table data for BA Buka Segel list -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="list_table"
					:editData="editDoc"
					:showData="showDoc"
					:deleteData="deleteDoc"
				>
					<template #header>
						<CIcon name="cil-grid"/>Daftar BA Pembukaan Segel
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="createDoc"
								class="mr-1"
							>
								+ Buat BA Buka Segel
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input BA Buka segel -->
		<MyModalBukaSegel
			v-if="modal_props.show"
			:state="modal_props.state"
			:id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		>
		</MyModalBukaSegel>

		<!-- Modal konfirmasi delete SBP -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete(); getDataTable()"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
  </div>
</template>

<script>
import axios from 'axios'

import api from '../../../router/api.js'
import api2 from '../../../router/api2.js'
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplayBukaSegel from '../bukasegel/DisplayBukaSegel.vue'
import MyFormBukaSegel from '../bukasegel/FormBukaSegel.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import MyModalBukaSegel from './ModalBukaSegel.vue'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyPdfBukaSegel from '../bukasegel/PdfBukaSegel.vue'
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
	name: 'PageBukaSegel',
	components: {
		MyDisplayDetail,
		MyDisplayBukaSegel,
		MyFormBukaSegel,
		MyModalBukaSegel,
		MyModalDelete,
		MyModalTabs,
		MyPdfBukaSegel,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Buka Segel' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'bukasegel',
			modal_props: {
				show: false,
				state: null,
				doc_id: null
			},
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			}
		}
	},
	methods: {
		async getDataTable() {
			this.list_table = await api2.getListDocuments('bukasegel')
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
		deleteDoc(item) {
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ " a.n. " 
				+ item.nama_saksi.bold() 
				+ "?"
			
			this.modal_delete_props.url = api.bukaSegelId(item.id)
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.url = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		displayTab(tab_index) {
			this.modal_props.tabs.list[tab_index]['visibility'] = true
		},
		refreshPdf() {
			this.$refs.pdf_doc.showPdf()
		}
	},
	created() {
		this.getDataTable()
	}
}
</script>

<style>

</style>