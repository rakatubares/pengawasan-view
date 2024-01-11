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
				<MyModalLpf 
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
import MyModalLpf from './ModalLpf.vue'
import MyPageDoc from '../../components/PageDoc.vue'

const tipe_surat = 'LPF'

export default {
	name: 'PageLpf',
	components: {
		MyModalLpf,
		MyPageDoc,
	},
	data() {
		return {
			doc_type: 'lpf',
			tipe_surat: tipe_surat,
			table_title: `Daftar ${tipe_surat}`,
			table_fields: [
				{ key: 'no_dok_lengkap', label: `No ${tipe_surat}` },
				{ key: 'tanggal_dokumen', label: `Tgl ${tipe_surat}` },
				{ key: 'lpp', label: 'LPP' },
				{ key: 'peneliti', label: 'Peneliti' },
			],
			custom_fields: ['lpp'],
			modal_data_props: {
				show: false,
				state: null,
				doc_id: null
			},
			permission_to_create: 'create-lpf',
		}
	},
	methods: {
		computeList(list) {
			return list.map(item => {
				return {
					...item,
					lpp: item.no_lpp + '</br>' + item.tanggal_lpp,
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
				+ item.no_lpp.bold()
				+ " tanggal "
				+ item.tanggal_lpp.bold()
				+ "?"

			return text
		}
	}
}
</script>

<style>

</style>