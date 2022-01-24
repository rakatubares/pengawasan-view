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

		<!-- Modal konfirmasi delete BA Penitipan -->
		<MyModalDelete
			v-if="modal_delete_props.show"
			:doc_type.sync="modal_delete_props.doc_type"
			:doc_id.sync="modal_delete_props.doc_id"
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
		MyModalDelete,
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
			modal_delete_props: {
				show: false,
				url: null,
				text: null
			}
		}
	},
	methods: {
		async getDataTable() {
			this.list_table = await api.getListDocuments('titip')
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
				+ item.nama_penerima.bold() 
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