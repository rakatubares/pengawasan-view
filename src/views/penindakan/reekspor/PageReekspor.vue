<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BA Pengawasan Reekspor"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			:permission_to_create="permission_to_create"
		>
			<template #modal-data>
				<MyModalReekspor 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalReekspor from './ModalReekspor.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageReekspor',
	components: {
		MyModalReekspor,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'reekspor',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Pengawasan Reekspor' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'dok_asal', label: 'Dok. Asal' },
				{ key: 'dok_ekspor', label: 'Dok. Ekspor' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['dok_asal','dok_ekspor','petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-reekspor',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					dok_asal: item.jenis_dok_asal + ' ' + item.nomor_dok_asal + '</br>' + item.tanggal_dok_asal,
					dok_ekspor: item.jenis_dok_ekspor + ' ' + item.nomor_dok_ekspor + '</br>' + item.tanggal_dok_ekspor,
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
			let text = "Apakah Anda yakin untuk menghapus data BA Reekspor atas " 
				+ item.dok_asal.bold() 
				+ " tanggal "
				+ item.tanggal_dok_asal.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>
</style>