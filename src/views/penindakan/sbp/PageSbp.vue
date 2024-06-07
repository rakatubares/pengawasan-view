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
			:permission_to_update="permission_to_update"
			:permission_to_delete="permission_to_delete"
		>
			<template #modal-data>
				<MyModalSbp 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:lptp_name="lptp_name"
					:id.sync="modal_data_props.doc_id"
					:permission_to_rollback="permission_to_rollback"
					:source_options="source_options"
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
		doc_name: {
			type: String,
			default: 'SBP'
		},
		lptp_name: {
			type: String,
			default: 'LPTP'
		},
		permission_to_create: {
			type: String,
			default: 'create-sbp'
		},
		permission_to_update: {
			type: String,
			default: 'create-sbp'
		},
		permission_to_delete: {
			type: String,
			default: 'delete-sbp'
		},
		permission_to_rollback: {
			type: String,
			default: 'rollback-sbp'
		},
		source_options: {
			type: Object,
			default() {
				return {
					'nhi': {'label': 'NHI', 'state': 'search', 'filters': {'status_sbp': false}}, 
					'lap': {'label': 'LAP', 'state': 'search'},
				}
			}
		},
	},
	data() {
		return {
			table_title: `Daftar ${this.doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${this.doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${this.doc_name}` },
				{ key: 'nhi', label: 'NHI' },
				{ key: 'nama_saksi', label: 'Saksi/Pemilik/Orang' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['nhi', 'petugas'],
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
					nhi: item.nomor_nhi + '</br>' + item.tanggal_nhi,
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
			if (item.nama_saksi) {
				text += " a.n. "
				text += item.nama_saksi.bold() 
			}
			text += "?"

			return text
		}
	},
}
</script>

<style>

</style>