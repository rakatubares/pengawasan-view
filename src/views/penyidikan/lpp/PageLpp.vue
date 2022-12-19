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
		>
			<template #modal-data>
				<MyModalLpp 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					doc_type="lpp"
					:tipe_surat="tipe_surat"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalLpp from './ModalLpp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const tipe_surat = 'LPP'

export default {
	name: 'PageLpp',
	components: {
		MyModalLpp,
		MyPageDoc,
	},
	data() {
		return {
			tipe_surat: tipe_surat,
			table_title: `Daftar ${tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${tipe_surat}` },
				{ key: 'sbp', label: 'SBP' },
				{ key: 'lp', label: 'LP' },
				{ key: 'petugas', label: 'Petugas' },
			],
			custom_fields: ['sbp', 'lp'],
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
					sbp: item.no_sbp + '</br>' + item.tanggal_sbp,
					lp: item.no_lp + '</br>' + item.tanggal_lp
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
				+ item.no_lp.bold() 
				+ "?"

			return text
		}
	}
}
</script>

<style>

</style>