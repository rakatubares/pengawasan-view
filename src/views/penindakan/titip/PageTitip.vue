<template>
	<div class="wrapper" data-app>
		<!-- Display table data for BA Penitipan -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="list_table"
					:showData="showDoc"
					:editData="editDoc"
					:deleteData="deleteDoc"
				>
					<template #header>
						<CIcon name="cil-grid"/>Daftar BA Penitipan
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

		<!-- Modal input BA Penitipan -->
		<MyModalTitip
			v-if="modal_props.show"
			:state="modal_props.state"
			:id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		/>
		<!-- <MyModalTabs
			ref="modal_tabs"
			title="Data BA Penitipan"
			v-if="modal_props.show"
			:tabs_list.sync="modal_props.tabs.list"
			:current_tab.sync="modal_props.tabs.current"
			@close-modal="closeModalInput"
		>
			<template #tab-header>
				<CTab :title="modal_props.tabs.list[0]['title']">
					<MyFormTitip
						ref="form_segel"
						v-if="modal_props.header_form"
						:id.sync="modal_props.doc_id"
						:state.sync="modal_props.state"
						@save-data="saveData"
					>
					</MyFormTitip>
					<MyDisplayTitip
						v-if="modal_props.header_display"
						:id.sync="modal_props.doc_id"
					>
					</MyDisplayTitip>
				</CTab>
			</template>

			<template #tab-detail>
				<CTab
					v-if="modal_props.tabs.list[1]['visibility']"
					:title="modal_props.tabs.list[1]['title']" 
				>
					<MyDisplayDetail
						:available_details="available_details"
						:state="modal_props.state"
						:doc_type="doc_type"
						:doc_id.sync="modal_props.doc_id"
						@edit-data="refreshPdf"
					>
					</MyDisplayDetail>
				</CTab>
			</template>

			<template #tab-form>
				<CTab 
					v-if="modal_props.tabs.list[2]['visibility']"
					:title="modal_props.tabs.list[2]['title']" 
				>
					<MyPdfTitip
						ref="pdf_doc"
						:id.sync="modal_props.doc_id"
						@publish-doc="showDoc"
					></MyPdfTitip>
				</CTab>
			</template>
		</MyModalTabs> -->

		<!-- Modal konfirmasi delete BA Penitipan -->
		<!-- <MyModalDelete
			v-if="modal_delete_props.show"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete> -->
	</div>
</template>

<script>
// import axios from 'axios'

// import api from '../../../router/api.js'
import api from '../../../router/api2.js'
// import MyDisplayDetail from '../../details/DisplayDetail.vue'
// import MyDisplayTitip from '../titip/DisplayTitip.vue'
// import MyFormTitip from '../titip/FormTitip.vue'
// import MyModalDelete from '../../components/ModalDelete.vue'
// import MyModalTabs from '../../components/ModalTabs.vue'
// import MyPdfTitip from '../titip/PdfTitip.vue'
// import MyTableData from '../../components/TableData.vue'

// import MyModalDelete from '../../components/ModalDelete.vue'
import MyModalTitip from './ModalTitip.vue'
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
	name: 'PageTitip',
	components: {
		// MyDisplayDetail,
		// MyDisplayTitip,
		// MyFormTitip,
		// MyModalDelete,
		// MyModalTabs,
		MyModalTitip,
		MyTableData
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Penitipan' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'nama_penerima', label: 'Pemilik/Penerima' },
				{ key: 'petugas1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'titip',
			modal_props: {
				show: false,
				state: null,
				doc_id: null
			},
			// modal_delete_props: {
			// 	show: false,
			// 	url: null,
			// 	text: null
			// }
		}
	},
	methods: {
		async getDataTable() {
			this.list_table = await api.getListDocuments('titip')
		},
		// showDoc(id) {
		// 	this.modal_props.state = 'display'
		// 	this.modal_props.tabs.list[1]['visibility'] = true
		// 	this.modal_props.tabs.list[2]['visibility'] = true
		// 	this.modal_props.doc_id = id
		// 	this.modal_props.header_form = false
		// 	this.modal_props.header_display = true
		// 	this.modal_props.show = true
		// },
		// createNewDoc() {
		// 	this.modal_props.state = 'insert'
		// 	this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
		// 	this.modal_props.doc_id = null
		// 	this.modal_props.header_form = true
		// 	this.modal_props.header_display = false
		// 	this.modal_props.show = true
		// },
		// editDoc(id) {
		// 	this.modal_props.state = 'edit'
		// 	this.modal_props.tabs.list[1]['visibility'] = true
		// 	this.modal_props.tabs.list[2]['visibility'] = true
		// 	this.modal_props.doc_id = id
		// 	this.modal_props.header_form = true
		// 	this.modal_props.header_display = false
		// 	this.modal_props.show = true
		// },
		// closeModalInput() {
		// 	this.getDataTable()
		// 	this.modal_props.show = false
		// 	this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
		// 	this.modal_props.doc_id = null
		// 	this.modal_props.header_form = false
		// 	this.modal_props.header_display = false
		// },
		// saveData(state) {
		// 	if (state == 'insert') {
		// 		this.displayTab(1)
		// 		this.displayTab(2)
		// 		this.$refs.modal_tabs.getNavs(0)
		// 	} else {
		// 		this.refreshPdf()
		// 	}
		// },
		// deleteDoc(item) {
		// 	let text = "Apakah Anda yakin untuk menghapus data " 
		// 		+ item.no_dok_lengkap.bold() 
		// 		+ " a.n. " 
		// 		+ item.nama_penerima.bold() 
		// 		+ "?"
			
		// 	this.modal_delete_props.url = api.getPenitipanById(item.id)
		// 	this.modal_delete_props.text = text
		// 	this.modal_delete_props.show = true
		// },
		// closeModalDelete() {
		// 	this.modal_delete_props.url = null
		// 	this.modal_delete_props.text = null
		// 	this.modal_delete_props.show = false
		// },
		// displayTab(tab_index) {
		// 	this.modal_props.tabs.list[tab_index]['visibility'] = true
		// },
		// refreshPdf() {
		// 	this.$refs.pdf_doc.showPdf()
		// }
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
			
			this.modal_delete_props.doc_type = this.doc_type
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
	},
	created() {
		this.getDataTable()
	}
}
</script>

<style>

</style>