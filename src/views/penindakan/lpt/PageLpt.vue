<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="`Daftar ${this.doc_name}`"
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
				<MyModalLpt
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
import MyModalLpt from './ModalLpt.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLpt',
	components: {
		MyModalLpt,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'lpt'
		},
		doc_name: {
			type: String,
			default: 'LPT'
		},
	},
	data() {
		return {
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
				{ key: 'sbp', label: `SBP` },
				{ key: 'petugas', label: `Petugas` },
			],
			custom_fields: ['sbp', 'petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lpt',
			permission_to_update: 'create-lpt',
			permission_to_delete: 'delete-lpt',
			permission_to_rollback: 'rollback-lpt',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					sbp: item.no_sbp + '</br>' + item.tanggal_sbp,
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
			let text = "Apakah Anda yakin untuk menghapus draft LPT atas "
				+ item.no_sbp.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>