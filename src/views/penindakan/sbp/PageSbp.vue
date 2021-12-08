<template>
	<div class="wrapper" data-app>
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
						<CIcon name="cil-grid"/>Daftar SBP
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="createDoc"
								class="mr-1"
							>
								+ Buat SBP
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input SBP -->
		<!-- <MyModalTabs
			ref="modal_tabs"
			title="Input Data SBP"
			v-if="modal_props.show"
			:tabs_list.sync="modal_props.tabs.list"
			:current_tab.sync="modal_props.tabs.current"
			@close-modal="closeModalInput"
		>
			<template #tab-header>
				<CTab :title="modal_props.tabs.list[0]['title']">
					<MyFormSbp
						ref="form_sbp"
						v-if="modal_props.header_form"
						:id.sync="modal_props.doc_id"
						:state.sync="modal_props.state"
						@save-data="saveData"
					>
					</MyFormSbp>
					<MyDisplaySbp
						v-if="modal_props.header_display"
						:id.sync="modal_props.doc_id"
					>
					</MyDisplaySbp>
				</CTab>
			</template>

			<template #tab-detail>
				<CTab 
					v-if="modal_props.tabs.list[1]['visibility']"
					:title="modal_props.tabs.list[1]['title']" 
				>
					<MyDisplayDetail
						v-if="modal_props.detail_display"
						:doc_type="doc_type"
						:doc_id.sync="modal_props.doc_id"
					>
					</MyDisplayDetail>
					<MyFormDetail 
						v-if="modal_props.detail_form"
						:state="modal_props.state"
						:doc_type="doc_type"
						:doc_id.sync="modal_props.doc_id"
						@edit-data="refreshPdf"
					>
					</MyFormDetail>
				</CTab>
			</template>

			<template #tab-form>
				<CTab 
					v-if="modal_props.tabs.list[2]['visibility']"
					:title="modal_props.tabs.list[2]['title']" 
				>
					<MyDisplayPdf
						:doc_type="doc_type"
						:doc_id="modal_props.doc_id"
					></MyDisplayPdf>
				</CTab>
			</template>
		</MyModalTabs> -->
		<MyModalSbp
			v-if="modal_props.show"
			:state="modal_props.state"
			:doc_id.sync="modal_props.doc_id"
			@close-modal="closeModal"
		>
		</MyModalSbp>

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
import axios from "axios"

import api from '../../../router/api.js'
import api2 from '../../../router/api2.js'
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplaySbp from '../sbp/DisplaySbp.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormSbp from '../sbp/FormSbp.vue'
import MyPdfSbp from '../sbp/PdfSbp.vue'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyModalSbp from './ModalSbp.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
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
	name: 'PageSbp',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplaySbp,
		MyFormDetail,
		MyFormSbp,
		MyModalDelete,
		MyModalSbp,
		MyModalTabs,
		MyPdfSbp,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No SBP' },
				{ key: 'tanggal_dokumen', label: 'Tgl SBP' },
				{ key: 'nama_saksi', label: 'Saksi/Pemilik' },
				{ key: 'petugas1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_table: [],
			doc_type: 'sbp',
			// modal_props: {
			// 	show: false,
			// 	state: 'insert',
			// 	tabs: JSON.parse(JSON.stringify(tabs_default)),
			// 	doc_id: null,
			// 	header_form: false,
			// 	header_display: false,
			// 	detail_form: false,
			// 	detail_display:false
			// },
			modal_props: {
				show: false,
				state: null,
				doc_id: null
			},
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			},
		}
	},
	methods: {
		async getDataTable() {
			this.list_table = await api2.getListDocuments('sbp')
		},
		// createNewSbp() {
		// 	this.modal_props.state = 'insert'
		// 	this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
		// 	this.modal_props.doc_id = null
		// 	this.modal_props.header_form = true
		// 	this.modal_props.header_display = false
		// 	this.modal_props.detail_form = true
		// 	this.modal_props.detail_display = false
		// 	this.modal_props.show = true
		// },
		// showSbp(id) {
		// 	console.log('page sbp - show data', id)
		// 	this.modal_props.state = 'display'
		// 	this.modal_props.tabs.list[1]['visibility'] = true
		// 	this.modal_props.tabs.list[2]['visibility'] = true
		// 	this.modal_props.doc_id = id
		// 	this.modal_props.header_form = false
		// 	this.modal_props.header_display = true
		// 	this.modal_props.detail_form = false
		// 	this.modal_props.detail_display = true
		// 	this.modal_props.show = true
		// },
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
			this.modal_props.state = null
			this.modal_props.doc_id = null
			this.modal_props.show = false
		},
		// editSbp(id) {
		// 	this.modal_props.state = 'edit'
		// 	this.modal_props.tabs.list[1]['visibility'] = true
		// 	this.modal_props.tabs.list[2]['visibility'] = true
		// 	this.modal_props.doc_id = id
		// 	this.modal_props.header_form = true
		// 	this.modal_props.header_display = false
		// 	this.modal_props.detail_form = true
		// 	this.modal_props.detail_display = false
		// 	this.modal_props.show = true
		// },
		// closeModalInput() {
		// 	this.getDataTable()
		// 	this.modal_props.show = false
		// 	this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
		// 	this.modal_props.doc_id = null
		// 	this.modal_props.header_form = false
		// 	this.modal_props.header_display = false
		// 	this.modal_props.detail_form = false
		// 	this.modal_props.detail_display = false
		// },
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
				+ item.nama_pemilik.bold() 
				+ "?"
			
			this.modal_delete_props.url = api.sbpId(item.id)
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.url = null
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