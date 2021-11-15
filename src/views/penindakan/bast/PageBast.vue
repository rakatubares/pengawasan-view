<template>
	<div class="wrapper">
		<!-- Display table data for SBP list -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="list_doc"
					:editData="editDoc"
					:deleteData="deleteDoc"
					:showData="showDoc"
				>
					<template #header>
						<CIcon name="cil-grid"/>Data BAST
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								class="mr-1"
								@click="createNewDoc()"
							>
								+ Tambah BAST
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal data -->
		<MyModalTabs
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
		</MyModalTabs>

		<!-- Modal konfirmasi delete SBP -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:url.sync="modal_delete_props.url"
			@close-modal="closeModalDelete"
			@delete-data="closeModalDelete(); getData()"
		>
			<template #text>
				<span v-html="modal_delete_props.text"></span>
			</template>
		</MyModalDelete>
	</div>
</template>

<script>
import axios from "axios"

import MyDisplayBast from '../bast/DisplayBast.vue'
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyFormBast from '../bast/FormBast.vue'
import MyModalDelete from '../../components/ModalDelete.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import MyTableData from '../../components/TableData.vue'

const API = process.env.VUE_APP_BASEAPI

const tabs_default = {
	current: 0,
	list: [
		{
			title: 'Header',
			visibility: true
		}, 
		{
			title: 'Detail',
			visibility: true
		}, 
		{
			title: 'Form BAST',
			visibility: false
		}
	]
}

export default {
	name: 'PageBast',
	components: {
		MyDisplayBast,
		MyDisplayDetail,
		MyFormBast,
		MyModalDelete,
		MyModalTabs,
		MyTableData,
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BAST' },
				{ key: 'tgl_dok', label: 'Tgl BAST' },
				{ key: 'nama_penerima', label: 'Penerima' },
				{ key: 'pejabat', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_doc: [],
			doc_type: 'bast',
			modal_props: {
				show: false,
				state: 'insert',
				tabs: JSON.parse(JSON.stringify(tabs_default)),
				doc_id: null,
				header_form: false,
				header_display: false
			},
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			}
		}
	},
	methods: {
		getData() {
			axios
				.get(API + '/bast')
				.then(
					(response) => {
						this.list_doc = response.data.data
					}
				)
		},
		createNewDoc() {
			this.modal_props.state = 'insert'
			this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
			this.modal_props.doc_id = null
			this.modal_props.header_form = true
			this.modal_props.header_display = false
			this.modal_props.show = true
		},
		showDoc(id) {
			this.modal_props.state = 'display'
			this.modal_props.tabs.list[1]['visibility'] = true
			this.modal_props.tabs.list[2]['visibility'] = true
			this.modal_props.doc_id = id
			this.modal_props.header_form = false
			this.modal_props.header_display = true
			this.modal_props.show = true
		},
		editDoc(id) {
			this.modal_props.state = 'edit'
			this.modal_props.tabs.list[1]['visibility'] = true
			this.modal_props.tabs.list[2]['visibility'] = true
			this.modal_props.doc_id = id
			this.modal_props.header_form = true
			this.modal_props.header_display = false
			this.modal_props.show = true
		},
		closeModalInput() {
			this.getData()
			this.modal_props.show = false
			this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
			this.modal_props.doc_id = null
			this.modal_props.header_form = false
			this.modal_props.header_display = false
		},
		saveDoc(state) {
			if (state == 'insert') {
				this.displayTab(1)
				this.displayTab(2)
				this.$refs.modal_tabs.getNavs(0)
			} else {
				this.refreshPdf()
			}
		},
		deleteDoc(item) {
			let API_BAST_ID = API + '/bast/' + item.id
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ " a.n. " 
				+ item.nama_penerima.bold() 
				+ "?"
			
			this.modal_delete_props.url = API_BAST_ID
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		closeModalDelete() {
			this.modal_delete_props.url = null
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
		this.getData()
	}
}
</script>

<style>

</style>