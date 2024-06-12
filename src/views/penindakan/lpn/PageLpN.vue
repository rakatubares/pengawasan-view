<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="`Daftar ${this.doc_name}`"
			:table_fields="table_fields"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			:permission_to_create="permission_to_create"
			:permission_to_update="permission_to_update"
			:permission_to_delete="permission_to_delete"
		>
			<template #modal-data>
				<MyModalLpN 
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
import MyModalLpN from './ModalLpN.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLpN',
	components: {
		MyModalLpN,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lpn',
			doc_name: 'LP-N',
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No LP-N` },
				{ key: 'tanggal_dokumen', label: `Tgl LP-N` },
				{ key: 'no_lphp', label: `No LPHP-N` },
				{ key: 'tanggal_lphp', label: `Tgl LPHP-N` },
			],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lpn',
			permission_to_update: 'create-lpn',
			permission_to_delete: 'delete-lpn',
			permission_to_rollback: 'rollback-lpn',
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
			let text = "Apakah Anda yakin untuk menghapus draft LP-N atas "
				+ item.no_lphp.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>