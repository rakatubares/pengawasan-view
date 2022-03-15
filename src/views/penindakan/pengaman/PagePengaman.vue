<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BA Pelekatan Tanda Pengaman"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalPengaman
					v-if="modal_data_props.show"
					:state="modal_data_props.state"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalPengaman from './ModalPengaman.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PagePengaman',
	components: {
		MyModalPengaman,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'pengaman',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Pengaman' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			custom_fields: ['petugas'],
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
		constructDeleteText(item) {
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ " a.n. " 
				+ item.nama_saksi.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>
</style>