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
			:permission_to_create="permission_to_create"
		>
			<template #modal-data>
				<MyModalNi 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:id.sync="modal_data_props.doc_id"
					:kode_lkai="kode_lkai"
					:label_ni="label_ni"
					:label_lkai="label_lkai"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalNi from './ModalNi.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageNi',
	components: {
		MyModalNi,
		MyPageDoc,
	},
	props: {
		doc_type: {
			type: String,
			default: 'ni'
		},
		kode_lkai: {
			type: String,
			default: 'lkai'
		},
		label_ni: {
			type: String,
			default: 'NI'
		},
		label_lkai: {
			type: String,
			default: 'LKAI'
		},
		permission_to_create: {
			type: String,
			default: 'create-ni'
		}
	},
	data() {
		return {
			table_title: `Daftar ${this.label_ni}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.label_ni}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.label_ni}` },
				{ key: 'lkai', label: this.label_lkai },
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
					lkai: item[`no_${this.kode_lkai}`] + '</br>' + item[`tgl_${this.kode_lkai}`],
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
			let text = `Apakah Anda yakin untuk menghapus data <b>${this.label_ni} atas</b> `
				+ item[`no_${this.kode_lkai}`].bold() 
				+ " tanggal " + item[`tgl_${this.kode_lkai}`].bold()
				+ "?"
			return text
		}
	},
}
</script>

<style>
</style>