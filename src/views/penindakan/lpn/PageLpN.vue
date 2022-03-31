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
				<MyModalLpN 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:id.sync="modal_data_props.doc_id"
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
			table_title: `Daftar ${this.tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No LP-N` },
				{ key: 'tanggal_dokumen', label: `Tgl LP-N` },
				{ key: 'no_sbp', label: `No SBP-N` },
				{ key: 'tanggal_sbp', label: `Tgl SBP-N` },
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
			let text = "Apakah Anda yakin untuk menghapus draft LP-N atas "
				+ item.no_sbp.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>