<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Serah terima"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			@close-modal="closeModal"
		>
			<!-- <template #form-doc>
				<MyFormPengaman
					ref="form_pengaman"
					:state.sync="modal_state"
					:data.sync="data"
					@submit-data="refreshData"
				/>
			</template> -->
			<template #disp-doc>
				<MyDisplayBast
					:data_bast.sync="data"
				/>
			</template>
			<template #form-object>
				<MyFormDetail 
					:available_details="['sarkut', 'barang', 'dokumen', 'orang']"
					:data.sync="data"
					@submit-data="refreshData"
				/>
			</template>
			<template #disp-object>
				<MyDisplayDetail 
					:doc.sync="data"
				/>
			</template>
			<template #disp-pdf>
				<MyDisplayPdf 
					ref="display_pdf"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalDoc>
  </div>
</template>

<script>
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayBast from './DisplayBast.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
// import MyFormPengaman from './FormPengaman.vue'
import MyModalDoc from '../../components/ModalDoc.vue'

const data_default = {
	main: {
		data: {
			id: null,
			no_dok_lengkap: null,
			tanggal_dokumen: null,
			alasan_pengamanan: null,
			yang_menerima: {
				type: null,
				data: null,
				atas_nama: null,
			},
			yang_menyerahkan: {
				type: null,
				data: null,
				atas_nama: null,
			},
			dalam_rangka: null,
		}
	},
	objek: {
		type: null,
		data: null
	},
}

export default {
	name: 'ModalBast',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayBast,
		MyFormDetail,
		// MyFormPengaman,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'bast',
			doc_id: this.id,
			data: JSON.parse(JSON.stringify(data_default)),
			modal_state: this.state
		}
	},
	methods: {
		async getData() {
			let data = await this.$refs.modal_doc.getData(this.doc_id)
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