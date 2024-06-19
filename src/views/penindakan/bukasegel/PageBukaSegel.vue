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
				<MyModalBukaSegel 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:id.sync="modal_data_props.doc_id"
					:permission_to_rollback="permission_to_rollback"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalBukaSegel from './ModalBukaSegel.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageBukaSegel',
	components: {
		MyModalBukaSegel,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'buka_segel',
			doc_name: 'BA Pembukaan Segel',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Buka Segel' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'segel', label: 'Segel' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['segel','petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-buka_segel',
			permission_to_update: 'create-buka_segel',
			permission_to_delete: 'delete-buka_segel',
			permission_to_rollback: 'rollback-buka_segel',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					segel: item.nomor_segel + '</br>' + item.tanggal_segel,
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
			if (item.nomor_segel != null) {
				text += " atas segel nomor "
				text += item.nomor_segel.bold()
			}
			text += "?"
			
			return text
		},
	},
}
</script>

<style>

</style>