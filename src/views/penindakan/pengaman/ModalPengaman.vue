<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Tanda Pengaman"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayPengaman
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormPengaman
					ref="form_pengaman"
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormDetail 
					v-if="modal_state == 'edit'"
					:available_details="['sarkut', 'barang']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
					ref="display_pdf"
					v-if="['show','edit'].includes(modal_state)"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalDoc>
  </div>
</template>

<script>
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayPengaman from './DisplayPengaman.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormPengaman from './FormPengaman.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

// const data_default = {
// 	main: {
// 		data: {
// 			id: null,
// 			no_dok_lengkap: null,
// 			alasan_pengamanan: null,
// 			keterangan: null,
// 			jenis_pengaman: null,
// 			jumlah_pengaman: null,
// 			nomor_pengaman: null,
// 			tempat_pengaman: null,
// 		}
// 	},
// 	penindakan: {
// 		tanggal_penindakan: null,
// 		lokasi_penindakan: null,
// 		sprint: {
// 			id: null,
// 			nomor_sprint: null,
// 			tanggal_sprint: null
// 		},
// 		saksi: {
// 			id: null,
// 			nama: null
// 		},
// 		petugas1: {
// 			user_id: null,
// 			name: null,
// 			nip: null
// 		},
// 		petugas2: {
// 			user_id: null,
// 			name: null,
// 			nip: null
// 		}
// 	},
// 	objek: {
// 		type: null,
// 		data: null
// 	},
// }

export default {
	name: 'ModalPengaman',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayPengaman,
		MyFormDetail,
		MyFormPengaman,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'pengaman',
			doc_id: this.id,
			// data: JSON.parse(JSON.stringify(data_default)),
			modal_state: this.state
		}
	},
	methods: {
		// async getData() {
		// 	let data = await this.$refs.modal_doc.getData(this.doc_id)
		// 	if (data.penindakan.petugas2 == null) {
		// 		data.penindakan.petugas2 = {user_id: null}
		// 	}
		// 	if (data.objek == null) {
		// 		data.objek = {
		// 			type: null,
		// 			data: null
		// 		}
		// 	}
		// 	this.data = data
		// },
		// async refreshData(id) {
		// 	this.doc_id = id != undefined ? id : this.doc_id
		// 	await this.getData()
		// 	await this.$refs.display_pdf.getPdf()
		// },
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val) {
			this.$emit('update:state', val)
		}
	},
	// async mounted() {
	// 	if (['edit', 'show'].includes(this.state)) {
	// 		await this.getData()
	// 	}
	// }
}
</script>

<style>

</style>