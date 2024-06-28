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
				<MyModalLpf 
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
import MyModalLpf from './ModalLpf.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const doc_name = 'LPF'

export default {
	name: 'PageLpf',
	components: {
		MyModalLpf,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lpf',
			doc_name: doc_name,
			table_title: `Daftar ${doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${doc_name}` },
				{ key: 'lpp', label: 'LPP' },
			],
			custom_fields: ['lpp'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lpf',
			permission_to_update: 'create-lpf',
			permission_to_delete: 'delete-lpf',
			permission_to_rollback: 'rollback-lpf',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					lpp: item.nomor_lpp + '</br>' + item.tanggal_lpp,
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
				+ " atas "
				+ item.nomor_lpp.bold()
				+ "?"

			return text
		}
	}
}
</script>

<style>

</style>