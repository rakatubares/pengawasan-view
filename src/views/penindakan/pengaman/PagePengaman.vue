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
				<MyModalPengaman
					v-if="modal_data_props.show"
					:state="modal_data_props.state"
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
			doc_name: 'BA Pelekatan Tanda Pengaman',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Pengaman' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-pengaman',
			permission_to_update: 'create-pengaman',
			permission_to_delete: 'delete-pengaman',
			permission_to_rollback: 'rollback-pengaman',
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
			let saksi = '-'
			if (item.nama_saksi) { saksi = item.nama_saksi.bold() }

			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ ` a.n. ${saksi} ?`
			
			return text
		},
	},
}
</script>

<style>
</style>