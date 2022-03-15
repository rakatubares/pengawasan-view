<template>
	<div class="wrapper" data-app>
		<MyPageDoc 
			ref="page_doc"
			:doc_type="doc_type"
			table_title="Daftar BA Pembukaan Tanda Pengaman"
			:table_fields="table_fields"
			:custom_fields="custom_fields"
			:compute_list="computeList"
			:modal_data_props.sync="modal_data_props"
			:construct_delete_text="constructDeleteText"
		>
			<template #modal-data>
				<MyModalBukaPengaman
					v-if="modal_data_props.show"
					:state="modal_data_props.state"
					:id.sync="modal_data_props.doc_id"
					@close-modal="closeModal"
				/>
			</template>
		</MyPageDoc>
	</div>
</template>

<script>
import MyModalBukaPengaman from './ModalBukaPengaman.vue'
import MyPageDoc from '../../components/PageDoc.vue'

export default {
	name: 'PageBukaPengaman',
	components: {
		MyModalBukaPengaman,
		MyPageDoc
	},
	data() {
		return {
			doc_type: 'bukapengaman',
			table_fields: [
				{ key: 'no_dok_lengkap', label: 'No BA Buka Tanda Pengaman' },
				{ key: 'tanggal_dokumen', label: 'Tgl BA' },
				{ key: 'ba_pengaman', label: 'BA Tanda Pengaman' },
				{ key: 'nama_saksi', label: 'Pemilik/Saksi' },
				{ key: 'petugas', label: 'Petugas' },
				{ key: 'status', label: 'Status' },
				{ key: 'actions', label: '' },
			],
			custom_fields: ['ba_pengaman', 'petugas'],
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
					ba_pengaman: item.nomor_pengaman + '</br>' + item.tanggal_pengaman,
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
			let text = "Apakah Anda yakin untuk menghapus BA Pembukaan Tanda Pengaman atas " 
				+ item.nomor_pengaman.bold() 
				+ " tanggal " 
				+ item.tanggal_pengaman.bold() 
				+ "?"
			
			return text
		},
	},
}
</script>

<style>

</style>