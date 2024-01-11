<template>
	<div class="wrapper" data-app>
		<!-- Display table data -->
		<CRow>
			<CCol>
				<MyTableData
					state="list"
					:fields="table_fields"
					:custom_fields="custom_fields"
					:status_filter_options="status_filter_options"
					:items="list_table"
					:editData="editDoc"
					:deleteData="deleteDoc"
					:showData="showDoc"
				>
					<template #header>
						<CIcon name="cil-grid"/>{{ table_title }}
						<div class="card-header-actions">
							<CButton 
								color="primary" 
								@click="createDoc"
								class="mr-1"
								v-if="checkCreatePermission"
							>
								+ Buat Baru
							</CButton>
						</div>
					</template>
				</MyTableData>
			</CCol>
		</CRow>

		<!-- Modal data -->
		<slot name='modal-data' />

		<!-- Modal konfirmasi delete -->
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
import permission from '../../helpers/permission'
import api2 from '../../router/api2.js'
import MyModalDelete from './ModalDelete.vue'
import MyTableData from './TableData.vue'

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
	name: 'PageDoc',
	components: {
		MyModalDelete,
		MyTableData,
		permission,
	},
	props: {
		doc_type: String,
		modal_state: String,
		table_title: String,
		table_fields: Array,
		custom_fields: Array,
		compute_list: Function,
		status_filter_options: Array,
		modal_data_props: Object,
		construct_delete_text: Function,
		permission_to_create: String,
	},
	data() {
		return {
			list_table: [],
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
			this.list_table = await api2.getListDocuments(this.doc_type)
			if (this.compute_list != null) {
				this.list_table = this.compute_list(this.list_table)
			}
		},
		createDoc() {
			let modal_data_props = {
				state: 'insert',
				doc_id: null,
				show: true
			}
			this.$emit('update:modal_data_props', modal_data_props)
		},
		editDoc(id) {
			let modal_data_props = {
				state: 'edit',
				doc_id: id,
				show: true
			}
			this.$emit('update:modal_data_props', modal_data_props)
		},
		showDoc(id) {
			let modal_data_props = {
				state: 'show',
				doc_id: id,
				show: true
			}
			this.$emit('update:modal_data_props', modal_data_props)
		},
		deleteDoc(item) {
			let text = this.constructDeleteText(item)
			this.modal_delete_props.doc_type = this.doc_type,
			this.modal_delete_props.doc_id = item.id
			this.modal_delete_props.text = text
			this.modal_delete_props.show = true
		},
		constructDeleteText(item) {
			if (this.construct_delete_text == null) {
				var text = "Apakah Anda yakin untuk menghapus data " 
					+ item.no_dok_lengkap.bold() 
					+ " a.n. " 
					+ item.nama_saksi.bold() 
					+ "?"
			} else {
				var text = this.construct_delete_text(item)
			}
			return text
		},
		closeModalDelete() {
			this.getDataTable()
			this.modal_delete_props.doc_type = null
			this.modal_delete_props.doc_id = null
			this.modal_delete_props.text = null
			this.modal_delete_props.show = false
		},
		displayTab(tab_index) {
			this.modal_props.tabs.list[tab_index]['visibility'] = true
		},
	},
	computed: {
		checkCreatePermission() {
			return permission.checkPermission(this.permission_to_create)
		}
	},
	created() {
		this.getDataTable()
	}
}
</script>

<style>

</style>