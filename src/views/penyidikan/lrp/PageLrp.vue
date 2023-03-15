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
		>
			<template #modal-data>
				<MyModalLrp 
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
import MyModalLrp from './ModalLrp.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const tipe_surat = 'LRP'

export default {
	name: 'PageLrp',
	components: {
		MyModalLrp,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lrp',
			tipe_surat: tipe_surat,
			table_title: `Daftar ${tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${tipe_surat}` },
				{ key: 'lp', label: 'LP' },
				{ key: 'lhp', label: 'LHP' },
				{ key: 'penyidik', label: 'Penyidik' },
			],
			custom_fields: ['lp', 'lhp'],
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
					lhp: item.no_lhp + '</br>' + item.tanggal_lhp,
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
				+ item.no_lhp.bold()
				+ " tanggal "
				+ item.tanggal_lhp.bold()
				+ "?"

			return text
		},
	},
}
</script>

<style>

</style>