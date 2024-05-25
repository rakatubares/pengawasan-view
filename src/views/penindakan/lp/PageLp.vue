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
		>
			<template #modal-data>
				<MyModalLp 
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
import MyModalLp from './ModalLp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLp',
	components: {
		MyModalLp,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'lp'
		},
		doc_name: {
			type: String,
			default: 'LP'
		},
	},
	data() {
		return {
			table_title: `Daftar ${this.doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
				{ key: 'no_lphp', label: `No LPHP` },
				{ key: 'tanggal_lphp', label: `Tgl LPHP` },
			],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lp',
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
			let text = "Apakah Anda yakin untuk menghapus draft LP atas "
				+ item.no_lphp.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>