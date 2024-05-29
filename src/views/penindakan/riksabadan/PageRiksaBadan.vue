<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="`Daftar ${doc_name}`"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			:permission_to_create="permission_to_create"
			:permission_to_update="permission_to_update"
			:permission_to_delete="permission_to_delete"
		>
			<template #modal-data>
				<MyModalRiksaBadan 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalRiksaBadan from './ModalRiksaBadan.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageRiksaBadan',
	components: {
		MyModalRiksaBadan,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'riksa_badan',
			doc_name: 'BA Pemeriksaan Badan',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Periksa Badan' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'entitas', label: 'Nama Orang' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-riksa_badan',
			permission_to_update: 'create-riksa_badan',
			permission_to_delete: 'delete-riksa_badan',
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
				+ item.entitas.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>
</style>