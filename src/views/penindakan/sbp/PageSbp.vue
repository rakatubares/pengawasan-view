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
			:status_filter_options="status_filter_options"
		>
			<template #modal-data>
				<MyModalSbp 
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
import MyModalSbp from './ModalSbp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageSbp',
	components: {
		MyModalSbp,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'sbp'
		},
		tipe_surat: {
			type: String,
			default: 'SBP'
		},
		custom_filters: [
			{'status-filter': '<input type="date">'}
		]
	},
	data() {
		return {
			table_title: `Daftar ${this.tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.tipe_surat}` },
				{ key: 'nama_saksi', label: 'Saksi/Pemilik' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			status_filter_options: [
				{ value: 'draft lphp', label: 'Draft LPHP' }, 
				{ value: 'lphp', label: 'LPHP' }, 
				{ value: 'draft lp', label: 'Draft LP' }, 
				{ value: 'lp', label: 'LP' }, 
			]
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					petugas: item.petugas1 + '</br>' + item.petugas2,
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
			let text = "Apakah Anda yakin untuk menghapus data " 
				+ item.no_dok_lengkap.bold() 
				+ " a.n. " 
				+ item.nama_saksi.bold() 
				+ "?"

			return text
		}
	},
}
</script>

<style>

</style>