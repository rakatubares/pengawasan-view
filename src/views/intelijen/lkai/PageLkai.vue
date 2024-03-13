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
				<MyModalLkai 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:id.sync="modal_data_props.doc_id"
					:kode_lppi="kode_lppi"
					:label_lkai="label_lkai"
					:label_lppi="label_lppi"
					:label_lpti="label_lpti"
					:label_npi="label_npi"
					:label_nhi="label_nhi"
					:label_ni="label_ni"
					:default_pejabat="default_pejabat"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalLkai from './ModalLkai.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageLkai',
	components: {
		MyModalLkai,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'lkai'
		},
		kode_lppi: {
			type: String,
			default: 'lppi'
		},
		label_lkai: {
			type: String,
			default: 'LKAI'
		},
		label_lppi: {
			type: String,
			default: 'LPPI'
		},
		label_lpti: {
			type: String,
			default: 'LPTI'
		},
		label_npi: {
			type: String,
			default: 'NPI'
		},
		label_nhi: {
			type: String,
			default: 'NHI'
		},
		label_ni: {
			type: String,
			default: 'NI'
		},
		default_pejabat: {
			type: String,
			default: 'bd.0501'
		},
		permission_to_create: {
			type: String,
			default: 'create-lkai'
		},
		
	},
	data() {
		return {
			table_title: `Daftar ${this.label_lkai}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.label_lkai}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.label_lkai}` },
				{ key: 'analis', label: 'Analis' },
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
				+ "?"
			return text
		}
	},
}
</script>

<style>
</style>