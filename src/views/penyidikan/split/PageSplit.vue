<template>
	<div class="wrapper" data-app>
		<MyPageDoc
			ref="page_doc"
			doc_type="split"
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
				<MyModalSplit 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:id.sync="modal_data_props.doc_id"
					:permission_to_rollback="permission_to_rollback"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalSplit from './ModalSplit.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const doc_name = 'SPLIT'

export default {
	name: 'PageSplit',
	components: {
		MyModalSplit,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'split',
			doc_name: doc_name,
			table_title: `Daftar ${doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${doc_name}` },
				{ key: 'lp', label: 'LP' },
				{ key: 'lpf', label: 'LPF' },
			],
			custom_fields: ['lp', 'lpf'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-split',
			permission_to_update: 'create-split',
			permission_to_delete: 'delete-split',
			permission_to_rollback: 'rollback-split',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					lp: item.nomor_lp + '</br>' + item.tanggal_lp,
					lpf: item.nomor_lpf + '</br>' + item.tanggal_lpf,
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
				+ " atas LPF nomor " 
				+ item.nomor_lpf.bold() 
				+ "?"

			return text
		}
	},
}
</script>

<style>

</style>