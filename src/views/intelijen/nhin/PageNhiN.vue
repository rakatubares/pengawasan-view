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
		>
			<template #modal-data>
				<MyModalNhiN 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:tipe_surat="tipe_surat"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalNhiN from './ModalNhiN.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageNhiN',
	components: {
		MyModalNhiN,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'nhin'
		},
		tipe_surat: {
			type: String,
			default: 'NHI-N'
		}
	},
	data() {
		return {
			table_title: `Daftar ${this.tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.tipe_surat}` },
				{ key: 'lkain', label: 'LKAI-N' },
			],
			custom_fields: ['lkain'],
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
					lkain: item.no_lkain + '</br>' + item.tgl_lkain,
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
			let text = "Apakah Anda yakin untuk menghapus data <b>NHI-N atas</b> " 
				+ item.no_lkain.bold() 
				+ " tanggal " + item.tgl_lkain.bold()
				+ "?"
			return text
		}
	},
}
</script>

<style>
</style>