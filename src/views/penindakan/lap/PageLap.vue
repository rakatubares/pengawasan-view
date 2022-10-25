<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar LAP"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalLap 
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
import MyModalLap from './ModalLap.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLap',
	components: {
		MyModalLap,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lap',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No LAP' },
				{ key: 'tanggal_dokumen', label: 'Tgl LAP' },
				{ key: 'dokumen_sumber', label: 'Sumber Informasi' },
			],
			custom_fields: ['dokumen_sumber'],
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
					dokumen_sumber: item.nomor_sumber + '</br>' + item.tanggal_sumber,
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
			let text = "Apakah Anda yakin untuk menghapus data LAP atas " 
				+ item.nomor_sumber.bold() 
				+ ' tanggal ' + item.tanggal_sumber.bold()  
				+ "?"
			return text
		}
	}
}
</script>

<style>
</style>