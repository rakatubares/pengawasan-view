<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Buka Segel"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayBukaSegel
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormBukaSegel
					v-if="['insert','edit','edit-header'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="['show','edit-header'].includes(modal_state)"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormDetail 
					v-if="modal_state == 'edit'"
					:available_details="['sarkut', 'barang', 'bangunan']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
					ref="display_pdf"
					v-if="['show','edit','edit-header'].includes(modal_state)"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayBukaSegel from './DisplayBukaSegel.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormBukaSegel from './FormBukaSegel.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

// const data_default = {
// 	main: {
// 		data: {
// 			id: null,
// 			no_dok_lengkap: null,
// 			jenis_segel: null,
// 			jumlah_segel: null,
// 			satuan_segel: null,
// 			nomor_segel: null,
// 			tempat_segel: null,
// 			sprint: {
// 				id: null,
// 				nomor_sprint: null,
// 				tanggal_sprint: null
// 			},
// 			saksi: {
// 				id: null,
// 				nama: null,
// 				alamat: null,
// 				pekerjaan: null,
// 				jenis_identitas: null,
// 				nomor_identitas: null
// 			},
// 			petugas1: {
// 				user_id: null,
// 				name: null
// 			},
// 			petugas2: {
// 				user_id: null,
// 				name: null
// 			}
// 		}
// 	},
// 	objek: {
// 		type: null,
// 		data: null
// 	},
// 	dokumen: {
// 		segel: {
// 			id: null
// 		}
// 	}
// }

export default {
	name: 'ModalBukaSegel',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayBukaSegel,
		MyFormDetail,
		MyFormBukaSegel,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'bukasegel',
			doc_id: this.id,
			modal_state: this.state
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val, val0) {
			console.log('modal buka segel - state', val, val0)
			// this.$refs.modal_doc.changeState(val)
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>

</style>