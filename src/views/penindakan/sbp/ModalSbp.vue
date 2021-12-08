<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data SBP"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id="doc_id"
			@close-modal="closeModal"
		>
			<template #form-doc>
				<MyFormSbp 
					:state.sync="modal_state"
					:data.sync="data"
					@update:data="doc_id = data.main.data.id"
				></MyFormSbp>
			</template>
			<template #disp-doc>
				<MyDisplaySbp 
					:data_sbp.sync="data"
				></MyDisplaySbp>
			</template>
			<template #form-object>
				<MyFormDetail 
					doc_type="sbp"
					:doc_id.sync="data.main.data.id"
					:state.sync="modal_state"
					@submit-data="$refs.display_pdf.getPdf()"
				></MyFormDetail>
			</template>
			<template #disp-object>
				<MyDisplayDetail 
					:doc.sync="data"
				></MyDisplayDetail>
			</template>
			<template #disp-pdf>
				<MyDisplayPdf 
					ref="display_pdf"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				></MyDisplayPdf>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplaySbp from './DisplaySbp.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormSbp from './FormSbp.vue'
import MyModalDoc from '../../components/ModalDoc.vue'

const data_default = {
	main:{
		data: {
			id: null,
			no_dok_lengkap: null,
			uraian_penindakan: null,
			alasan_penindakan: null,
			jenis_pelanggaran: 'Kepabeanan',
			wkt_mulai_penindakan: null,
			wkt_selesai_penindakan: null,
			hal_terjadi: null,
		},
	},
	penindakan: {
		tanggal_penindakan: null,
		lokasi_penindakan: null,
		sprint: {
			id: null,
			nomor_sprint: null,
			tanggal_sprint: null
		},
		saksi: {
			id: null,
			nama: null
		},
		petugas1: {
			user_id: null,
			name: null,
			nip: null
		},
		petugas2: {
			user_id: null,
			name: null,
			nip: null
		}
	},
	objek: {
		type: null,
		data: null
	},
	dokumen: {
		lptp: {
			jabatan_atasan: {
				kode: 'bd.0503',
				jabatan: null
			},
			plh: false,
			atasan: {
				user_id: null
			}
		}
	}
}

export default {
	name: 'ModalSbp',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplaySbp,
		MyFormDetail,
		MyFormSbp,
		MyModalDoc,
	},
	props: {
		state: String,
		doc_id: Number
	},
	data() {
		return {
			doc_type: 'sbp',
			data: JSON.parse(JSON.stringify(data_default)),
			modal_state: this.state
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		}
	},
	watch: {
		modal_state: function(val) {
			this.$refs.modal_doc.changeState(val)
			this.$emit('update:state', val)
		}
	},
	async mounted() {
		if (['edit', 'show'].includes(this.state)) {
			this.data = await this.$refs.modal_doc.getData()
		}
	}
}
</script>

<style>

</style>