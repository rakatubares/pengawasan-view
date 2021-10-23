<template>
	<div class="wrapper">
		<!-- Display table data for SBP list -->
		<CRow>
			<CCol>
				<MyTableData
					:fields="fields"
					:items="list_sbp"
					:editData="editSbp"
					:deleteData="deleteSbp"
				>
					<template #header>
						<CIcon name="cil-grid"/>Data SBP
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="
									show_sbp_modal = true
								"
								class="mr-1"
							>
								+ Tambah SBP
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal input SBP -->
		<MyModalTabs
			ref="modal_tabs"
			title="Input Data SBP"
			v-if="show_sbp_modal"
			:show.sync="show_sbp_modal"
			:tabs_list.sync="tabs.list"
			:current_tab.sync="tabs.current"
			@update:show="show_sbp_modal == false && closeModalInput()"
		>
			<template #tab-header>
				<CTab :title="tabs.list[0]['title']">
					<SbpForm
						ref="sbp_form"
						v-if="show_sbp_modal"
						:id.sync="sbp_id"
						:state.sync="sbp_state"
						@update:state="displayTab(1)"
					>
					</SbpForm>
				</CTab>
			</template>

			<template #tab-detail>
				<CTab 
					v-if="tabs.list[1]['visibility']"
					:title="tabs.list[1]['title']" 
				>
					<DisplayDetail 
						:sbp_id.sync="sbp_id"
					>
					</DisplayDetail>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import axios from "axios"
import MyModalTabs from '../components/ModalTabs.vue'
import MyTableData from '../components/TableData.vue'
import DisplayDetail from '../details/DisplayDetail.vue'
import SbpForm from '../penindakan/SbpForm.vue'

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
		}
	]
}

export default {
	name: 'SbpInput',
	components: {
		MyModalTabs,
		MyTableData,
		DisplayDetail,
		SbpForm
	},
	data() {
		return {
			console,
			fields: [
				{ key: 'no_sbp_lengkap', label: 'No SBP' },
				{ key: 'tgl_sbp', label: 'Tgl SBP' },
				{ key: 'nama_pemilik', label: 'Pemilik' },
				{ key: 'pejabat1', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			list_sbp: [],
			show_sbp_modal: false,
			tabs: JSON.parse(JSON.stringify(tabs_default)),
			sbp_state: 'insert',
			sbp_id: null
		}
	},
	methods: {
		getDataSbp() {
			axios
				.get(API + '/sbp')
				.then((response) => {
					this.list_sbp = response.data.data
				})
				.catch((error) => (console.error(error)))
		},
		closeModalInput() {
			this.$refs.sbp_form.reset()
			this.tabs = JSON.parse(JSON.stringify(tabs_default))
		},
		displayTab(tab_index) {
			this.tabs.list[tab_index]['visibility'] = true
			this.$refs.modal_tabs.getNavs()
		},
		editSbp(id) {
			this.show_sbp_modal = true
			this.sbp_id = id
			this.sbp_state = 'edit'
			this.tabs.list[1]['visibility'] = true
		},
		deleteSbp(id) {
			console.log('sbp input - delete sbp', id)
			let API_SBP_ID = API + '/sbp/' + id
			axios
				.delete(API_SBP_ID)
				.then(
					(response) => {
						console.log('delete sbp')
						this.getDataSbp()
					}
				)
		}
	},
	created() {
		this.getDataSbp()
	}
}
</script>

<style>

</style>