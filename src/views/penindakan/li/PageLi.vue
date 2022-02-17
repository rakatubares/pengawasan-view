<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar Lembar Informasi"
			:table_fields="table_fields"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalLi 
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
import MyModalLi from './ModalLi.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLi',
	components: {
		MyModalLi,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'li',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Penolakan SBP' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'sumber', label: 'Sumber Informasi' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
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
			let text = "Apakah Anda yakin untuk menghapus data Lembar Informasi nomor " 
				+ item.no_dok_lengkap.bold() 
				+ "?"
			return text
		}
	}
}
</script>

<style>
</style>