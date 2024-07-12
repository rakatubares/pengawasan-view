<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="table_title"
			:table_fields="table_fields"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			:permission_to_create="permission_to_create"
			:permission_to_update="permission_to_update"
			:permission_to_delete="permission_to_delete"
		>
			<template #modal-data>
				<MyModalSti 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:id.sync="modal_data_props.doc_id"
					:permission_to_rollback="permission_to_rollback"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalSti from './ModalSti.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageSti',
	components: {
		MyModalSti,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'sti'
		},
		label_sti: {
			type: String,
			default: 'ST-I'
		},
		permission_to_create: {
			type: String,
			default: 'create-sti'
		},
		permission_to_update: {
			type: String,
			default: 'create-sti'
		},
		permission_to_delete: {
			type: String,
			default: 'delete-sti'
		},
		permission_to_rollback: {
			type: String,
			default: 'rollback-sti'
		},
	},
	data() {
		return {
			table_title: `Daftar ${this.label_sti}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.label_sti}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.label_sti}` },
				// { key: 'analis', label: 'Analis' },
			],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
		}
	},
	methods: {
		closeModal() {
			this.$refs.page_doc.getDataTable()
			this.modal_data_props.state = null
			this.modal_data_props.doc_id = null
			this.modal_data_props.show = false
		},
		constructDeleteText(item) {
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ "?"
			return text
		}
	},
}
</script>

<style>
</style>