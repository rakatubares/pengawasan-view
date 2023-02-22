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
		>
			<template #modal-data>
				<MyModalSplit 
					v-if="modal_data_props.show"
					:state.sync="modal_data_props.state"
					:tipe_surat="tipe_surat"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalSplit from './ModalSplit.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const tipe_surat = 'SPLIT'

export default {
	name: 'PageSplit',
	components: {
		MyModalSplit,
		MyPageDoc,
	},
	data() {
		return {
			tipe_surat: tipe_surat,
			table_title: `Daftar ${tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${tipe_surat}` },
				{ key: 'lp', label: 'LP' },
				{ key: 'lpf', label: 'LPF' },
				{ key: 'pelaku', label: 'Pelaku' },
			],
			custom_fields: ['lp', 'lpf'],
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
					lp: item.no_lp + '</br>' + item.tanggal_lp,
					lpf: item.no_lpf + '</br>' + item.tanggal_lpf,
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