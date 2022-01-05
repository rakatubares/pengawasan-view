<template>
	<div class="wrapper">
		<!-- Display table data for SBP list -->
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
						<CIcon name="cil-grid"/>Daftar BAST
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								class="mr-1"
								@click="createNewDoc()"
							>
								+ Buat Baru
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal data -->
		<!-- <MyModalTabs
			ref="modal_tabs"
			title="Input Data BAST"
			v-if="modal_props.show"
			:tabs_list.sync="modal_props.tabs.list"
			:current_tab.sync="modal_props.tabs.current"
			@close-modal="closeModalInput"
		>
			<template #tab-header>
				<CTab :title="modal_props.tabs.list[0]['title']">
					<MyFormBast
						ref="form_bast"
						v-if="modal_props.header_form"
						:id.sync="modal_props.doc_id"
						:state.sync="modal_props.state"
						@save-data="saveDoc"
					>
					</MyFormBast>
					<MyDisplayBast
						v-if="modal_props.header_display"
						:id.sync="modal_props.doc_id"
					>
					</MyDisplayBast>
				</CTab>
			</template>

			<template #tab-detail>
				<CTab 
					v-if="modal_props.tabs.list[1]['visibility']"
					:title="modal_props.tabs.list[1]['title']" 
				>
					<MyDisplayDetail 
						:state="modal_props.state"
						:doc_type="doc_type"
						:doc_id.sync="modal_props.doc_id"
						@edit-data="refreshPdf"
					>
					</MyDisplayDetail>
				</CTab>
			</template>
		</MyModalTabs> -->
		<MyModalBast
			v-if="modal_props.show"
			:state="modal_props.state"
			:id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		>
		</MyModalBast>

		<!-- Modal konfirmasi delete SBP -->
		<!-- <MyModalDelete
			v-if="modal_delete_props.show"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete(); getData()"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete> -->
	</div>
</template>

<script>
// import axios from "axios"

import api from '../../../router/api2.js'
// import MyDisplayBast from '../bast/DisplayBast.vue'
// import MyDisplayDetail from '../../details/DisplayDetail.vue'
// import MyFormBast from '../bast/FormBast.vue'
// import MyModalDelete from '../../components/ModalDelete.vue'
// import MyModalTabs from '../../components/ModalTabs.vue'
import MyModalBast from './ModalBast.vue'
import MyTableData from '../../components/TableData.vue'

const API = process.env.VUE_APP_BASEAPI

const tabs_default = {
	current: 0,
	list: [
		{
			title: 'Uraian',
			visibility: true
		}, 
		{
			title: 'Objek',
			visibility: true
		}, 
		{
			title: 'Print',
			visibility: false
		}
	]
}

export default {
	name: 'PageBast',
	components: {
		// MyDisplayBast,
		// MyDisplayDetail,
		// MyFormBast,
		// MyModalDelete,
		// MyModalTabs,
		MyModalBast,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BAST' },
				{ key: 'tanggal_dokumen', label: 'Tgl BAST' },
				{ key: 'yang_menerima', label: 'Penerima' },
				{ key: 'yang_menyerahkan', label: 'Yang Menyerahkan' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'bast',
			modal_props: {
				show: false,
				state: null,
				doc_id: null
			},
			// modal_props: {
			// 	show: false,
			// 	state: 'insert',
			// 	tabs: JSON.parse(JSON.stringify(tabs_default)),
			// 	doc_id: null,
			// 	header_form: false,
			// 	header_display: false
			// },
			// modal_delete_props: {
			// 	show: false,
			// 	url: null,
			// 	text: null
			// }
		}
	},
	methods: {
		// getData() {
		// 	axios
		// 		.get(API + '/bast')
		// 		.then(
		// 			(response) => {
		// 				this.list_doc = response.data.data
		// 			}
		// 		)
		// },
		async getDataTable() {
			this.list_table = await api.getListDocuments('bast')
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
		publishDoc(id) {
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