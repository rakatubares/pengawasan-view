<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BAST"
			:table_fields="table_fields"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalBast 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalBast from './ModalBast.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageBast',
	components: {
		MyModalBast,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'bast',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BAST' },
				{ key: 'tanggal_dokumen', label: 'Tgl BAST' },
				{ key: 'yang_menerima', label: 'Penerima' },
				{ key: 'yang_menyerahkan', label: 'Yang Menyerahkan' },
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
				+ " dalam rangka " 
				+ item.dalam_rangka.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>