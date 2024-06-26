<template>
	<div class="wrapper" data-app>
		<MyPageDoc
			ref="page_doc"
			doc_type="lpp"
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
				<MyModalLpp 
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
import MyModalLpp from './ModalLpp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const doc_name = 'LPP'

export default {
	name: 'PageLpp',
	components: {
		MyModalLpp,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lpp',
			doc_name: doc_name,
			table_title: `Daftar ${doc_name}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${doc_name}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${doc_name}` },
				{ key: 'sbp', label: 'SBP' },
				{ key: 'lp', label: 'LP' },
			],
			custom_fields: ['sbp', 'lp'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lpp',
			permission_to_update: 'create-lpp',
			permission_to_delete: 'delete-lpp',
			permission_to_rollback: 'rollback-lpp',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					sbp: item.nomor_sbp + '</br>' + item.tanggal_sbp,
					lp: item.nomor_lp + '</br>' + item.tanggal_lp
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
				+ " atas LP nomor " 
				+ item.nomor_lp.bold() 
				+ "?"

			return text
		}
	}
}
</script>

<style>

</style>