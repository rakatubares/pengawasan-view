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
				<MyModalBukaPengaman
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
import MyModalBukaPengaman from './ModalBukaPengaman.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageBukaPengaman',
	components: {
		MyModalBukaPengaman,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'buka_pengaman',
			doc_name: 'BA Pembukaan Tanda Pengaman',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Buka Tanda Pengaman' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'ba_pengaman', label: 'BA Tanda Pengaman' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['ba_pengaman', 'petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-buka_pengaman',
			permission_to_update: 'create-buka_pengaman',
			permission_to_delete: 'delete-buka_pengaman',
			permission_to_rollback: 'rollback-buka_pengaman',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					ba_pengaman: item.nomor_pengaman + '</br>' + item.tanggal_pengaman,
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
			if (item.nomor_pengaman != null) {
				text += " atas tanda pengaman nomor "
				text += item.nomor_pengaman.bold()
			}
			text += "?"
			
			return text
		},
	},
}
</script>

<style>

</style>