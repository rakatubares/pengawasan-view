<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			:table_title="table_title"
			:table_fields="table_fields"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalLphp 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:tipe_surat="tipe_surat"
					:sbp_type="sbp_type"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalLphp from './ModalLphp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLphp',
	components: {
		MyModalLphp,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'lphp'
		},
		tipe_surat: {
			type: String,
			default: 'LPHP'
		},
		sbp_type: {
			type: String,
			dedfault: 'sbp'
		},
		tipe_surat_sbp: {
			type: String,
			default: 'SBP'
		}
	},
	data() {
		return {
			table_title: `Daftar ${this.tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.tipe_surat}` },
				{ key: 'no_sbp', label: `No ${this.tipe_surat_sbp}` },
				{ key: 'tanggal_sbp', label: `tgl ${this.tipe_surat_sbp}` },
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
				+ ` atas ` 
				+ item.no_sbp.bold() 
				+ "?"

			return text
		},
	},
}
</script>

<style>

</style>