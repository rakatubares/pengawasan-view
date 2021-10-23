<template>
	<div class="wrapper">
		<!-- Display table data for BA Segel list -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="fields"
					:items="list_segel"
					:showData="showSegel"
				>
					<template #header>
						<CIcon name="cil-grid"/>Data BA Penyegelan
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="createNewSegel()"
								class="mr-1"
							>
								+ Tambah BA Segel
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input BA segel -->
		<MyModalTabs
			ref="modal_tabs"
			title="Input Data BA Segel"
			v-if="modal_props.show"
			:tabs_list.sync="modal_props.tabs.list"
			:current_tab.sync="modal_props.tabs.current"
			@close-modal="closeModalInput"
		>
			<template #tab-header>
				<CTab :title="modal_props.tabs.list[0]['title']">
					<MyFormSegel
						ref="form_segel"
						v-if="modal_props.header_form"
						:id.sync="modal_props.doc_id"
						:state.sync="modal_props.state"
						@save-data="saveData"
					>
					</MyFormSegel>
					<MyDisplaySegel
						v-if="modal_props.header_display"
						:id.sync="modal_props.doc_id"
					>
					</MyDisplaySegel>
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
					<MyPdfSegel
						ref="pdf_segel"
						:id.sync="modal_props.doc_id"
						@publish-sbp="showSegel"
					></MyPdfSegel>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import axios from 'axios'

import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplaySegel from '../segel/DisplaySegel.vue'
import MyFormSegel from '../segel/FormSegel.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import MyPdfSegel from '../segel/PdfSegel.vue'
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
			visibility: false
		}, 
		{
			title: 'Form BA Segel',
			visibility: false
		}
	]
}

export default {
	name: 'PageSegel',
	components: {
		MyDisplayDetail,
		MyDisplaySegel,
		MyFormSegel,
		MyModalTabs,
		MyPdfSegel,
		MyTableData
	},
	data() {
		return {
			fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Segel' },
				{ key: 'tgl_dok', label: 'Tgl BA' },
				{ key: 'nama_pemilik', label: 'Pemilik/Saksi' },
				{ key: 'pejabat1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_segel: [],
			doc_type: 'segel',
			available_details: ['sarkut', 'barang', 'bangunan'],
			modal_props: {
				show: false,
				state: 'insert',
				tabs: JSON.parse(JSON.stringify(tabs_default)),
				doc_id: null,
				header_form: false,
				header_display: false
			}
		}
	},
	methods: {
		getDataSegel() {
			axios
				.get(API + '/segel')
				.then(
					(response) => {
						this.list_segel = response.data.data
					}
				)
		},
		createNewSegel() {
			this.modal_props.state = 'insert'
			this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
			this.modal_props.doc_id = null
			this.modal_props.header_form = true
			this.modal_props.header_display = false
			this.modal_props.show = true
		},
		showSegel(id) {
			this.modal_props.state = 'display'
			this.modal_props.tabs.list[1]['visibility'] = true
			this.modal_props.tabs.list[2]['visibility'] = true
			this.modal_props.doc_id = id
			this.modal_props.header_form = false
			this.modal_props.header_display = true
			this.modal_props.show = true
		},
		closeModalInput() {
			this.getDataSegel()
			this.modal_props.show = false
			this.modal_props.tabs = JSON.parse(JSON.stringify(tabs_default))
			this.modal_props.doc_id = null
			this.modal_props.header_form = false
			this.modal_props.header_display = false
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
		displayTab(tab_index) {
			this.modal_props.tabs.list[tab_index]['visibility'] = true
		},
		refreshPdf() {
			this.$refs.pdf_segel.showPdf()
		}
	},
	created() {
		this.getDataSegel()
	}
}
</script>

<style>

</style>