<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="table_title"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			permission_to_create="create-nhi"
			permission_to_update="create-nhi"
			permission_to_delete="delete-nhi"
		>
			<template #modal-data>
				<MyModalNhi 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:id.sync="modal_data_props.doc_id"
					permission_to_rollback="rollback-nhi"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalNhi from './ModalNhi.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageNhi',
	components: {
		MyModalNhi,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'nhi'
		},
		doc_name: {
			type: String,
			default: 'NHI'
		}
	},
	data() {
		return {
			table_title: `Daftar ${this.doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
				{ key: 'lkai', label: 'LKAI' },
			],
			custom_fields: ['lkai'],
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
					lkai: item.no_lkai + '</br>' + item.tgl_lkai,
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
			let text = "Apakah Anda yakin untuk menghapus data <b>NHI atas</b> " 
				+ item.no_lkai.bold() 
				+ " tanggal " + item.tgl_lkai.bold()
				+ "?"
			return text
		}
	},
}
</script>

<style>
</style>