<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BA Penolakan Tanda Tangan terhadap BA Penolakan SBP"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
			:permission_to_create="permission_to_create"
		>
			<template #modal-data>
				<MyModalTolak2
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
import MyModalTolak2 from './ModalTolak2.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageTolak2',
	components: {
		MyModalTolak2,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'tolak2',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Penolakan SBP' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'tolak1', label: 'BA Penolakan SBP' },
				{ key: 'sbp', label: 'SBP' },
				{ key: 'pemilik', label: 'Pemilik/Kuasa' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['tolak1', 'sbp', 'petugas'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-tolak2',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					tolak1: item.nomor_tolak1 + '</br>' + item.tanggal_tolak1,
					sbp: item.nomor_sbp + '</br>' + item.tanggal_sbp,
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
			let text = "Apakah Anda yakin untuk menghapus data BA Penolakan atas BA Penolakan SBP nomor " 
				+ item.nomor_tolak1.bold() 
				+ ' tanggal ' + item.tanggal_tolak1.bold() 
				+ " a.n. " + item.pemilik.bold() 
				+ "?"

			return text
		}
	}
}
</script>

<style>

</style>