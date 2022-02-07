<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BA Penolakan SBP"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
		>
			<template #modal-data>
				<MyModalTolak1 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalTolak1 from './ModalTolak1.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageTolak1',
	components: {
		MyModalTolak1,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'tolak1',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Penolakan SBP' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'sbp', label: 'SBP' },
				{ key: 'nama_saksi', label: 'Saksi/Pemilik' },
				{ key: 'petugas', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			custom_fields: ['sbp', 'petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					sbp: item.nomor_sbp + '</br>' + item.tanggal_sbp,
					petugas: item.petugas1 + '</br>' + item.petugas2,
				}
			})
		},
		closeModal() {
			this.$refs.page_doc.getDataTable()
			this.modal_data_props.state = null
			this.modal_data_props.doc_id = null
			this.modal_data_props.show = false
		},
	// 	saveData(state) {
	// 		if (state == 'insert') {
	// 			this.displayTab(1)
	// 			this.displayTab(2)
	// 			this.$refs.modal_tabs.getNavs(0)
	// 		} else {
	// 			this.refreshPdf()
	// 		}
	// 	},
	// 	deleteDoc(item) {
	// 		let text = "Apakah Anda yakin untuk menghapus data " 
	// 			+ item.no_dok_lengkap.bold() 
	// 			+ " a.n. " 
	// 			+ item.nama_saksi.bold() 
	// 			+ "?"
			
	// 		// this.modal_delete_props.url = api.sbpId(item.id)
	// 		this.modal_delete_props.doc_type = this.doc_type,
	// 		this.modal_delete_props.doc_id = item.id
	// 		this.modal_delete_props.text = text
	// 		this.modal_delete_props.show = true
	// 	},
	// 	closeModalDelete() {
	// 		this.getDataTable()
	// 		this.modal_delete_props.doc_type = null
	// 		this.modal_delete_props.doc_id = null
	// 		this.modal_delete_props.text = null
	// 		this.modal_delete_props.show = false
	// 	},
	// 	publishSbp(id) {
	// 		this.showSbp(id)
	// 	},
	// 	displayTab(tab_index) {
	// 		this.modal_props.tabs.list[tab_index]['visibility'] = true
	// 	},
	// 	refreshPdf() {
	// 		this.$refs.pdf_sbp.showPdf()
	// 	}
	// },
	// created() {
	// 	this.getDataTable()
	}
}
</script>

<style>

</style>