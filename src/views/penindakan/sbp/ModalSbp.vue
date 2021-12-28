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
			<!-- Action buttons -->
			<template #action-buttons>
				<MyModalLphp
					v-if="show_lphp_button"
					:state="lphp_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:doc_num="data.main.data.no_dok_lengkap"
					:data.sync="data.dokumen.lphp"
					@submit-data="refreshData(doc_id)"
				/>
				<MyModalLp
					v-if="show_lp_button"
					:state="lp_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:doc_num="data.main.data.no_dok_lengkap"
					:data.sync="data.dokumen.lp"
					@submit-data="refreshData(doc_id)"
				/>
			</template>

			<!-- Documents' components -->
			<template #form-doc>
				<MyFormSbp 
					ref="form_sbp"
					:state.sync="modal_state"
					:data.sync="data"
					@submit-data="refreshData"
				></MyFormSbp>
			</template>
			<template #disp-doc>
				<MyDisplaySbp 
					:data_sbp.sync="data"
				></MyDisplaySbp>
			</template>
			<template #form-object>
				<MyFormDetail 
					:data.sync="data"
					@submit-data="refreshData"
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
					@publish-refresh="refreshData"
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
import MyModalLp from './ModalLp.vue'
import MyModalLphp from './ModalLphp.vue'

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
	status: {
		kode_status: null
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
		},
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
		MyModalLp,
		MyModalLphp,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			console,
			doc_type: 'sbp',
			doc_id: this.id,
			data: JSON.parse(JSON.stringify(data_default)),
			modal_state: this.state,
		}
	},
	computed: {
		lphp_state() {
			let state = null
			if (this.data.status.kode_status == 200) {
				state = 'create'
			} else if (this.data.status.kode_status == 102) {
				state = 'edit'
			}
			return state
		},
		show_lphp_button() {
			let show = false
			if ([200, 102].includes(this.data.status.kode_status)) {
				show = true
			}
			return show
		},
		lp_state() {
			let state = null
			if (this.data.status.kode_status == 202) {
				state = 'create'
			} else if (this.data.status.kode_status == 103) {
				state = 'edit'
			}
			return state
		},
		show_lp_button() {
			let show = false
			if ([202, 103].includes(this.data.status.kode_status)) {
				show = true
			}
			return show
		}
	},
	methods: {
		async getData() {
			let data = await this.$refs.modal_doc.getData(this.doc_id)
			if (data.penindakan.petugas2 == null) {
				data.penindakan.petugas2 = {user_id: null}
			}
			if (data.objek == null) {
				data.objek = {
					type: null,
					data: null
				}
			}
			this.data = data
		},
		async refreshData(id) {
			this.doc_id = id != undefined ? id : this.doc_id
			await this.getData()
			this.$refs.display_pdf.active_pdf = 'sbp'
			await this.$refs.display_pdf.getPdf()
		},
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val) {
			this.$refs.modal_doc.changeState(val)
			this.$emit('update:state', val)
		}
	},
	async mounted() {
		if (['edit', 'show'].includes(this.state)) {
			await this.getData()
		}
	}
}
</script>

<style>

</style>