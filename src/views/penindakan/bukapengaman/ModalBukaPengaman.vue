<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Buka Tanda Pengaman"
			:state.sync="modal_state"
			:doc_type="doc_type"
			:doc_id.sync="doc_id"
			@close-modal="closeModal"
		>
			<template #form-doc>
				<MyFormBukaPengaman
					:state.sync="modal_state"
					:data.sync="data"
					@submit-data="refreshData"
				></MyFormBukaPengaman>
			</template>
			<template #disp-doc>
				<MyDisplayBukaPengaman
					:data.sync="data"
				></MyDisplayBukaPengaman>
			</template>
			<template #form-object>
				<MyFormDetail 
					:available_details="['sarkut', 'barang']"
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
				></MyDisplayPdf>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayBukaPengaman from './DisplayBukaPengaman.vue'
import MyDisplayDetail from '../../details/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormBukaPengaman from './FormBukaPengaman.vue'
import MyModalDoc from '../../components/ModalDoc.vue'

const data_default = {
	main: {
		data: {
			id: null,
			no_dok_lengkap: null,
			jenis_pengaman: null,
			jumlah_pengaman: null,
			satuan_pengaman: null,
			tempat_pengaman: null,
			nomor_pengaman: null,
			tanggal_pengaman: null,
			dasar_pengamanan: null,
			sprint: {
				id: null,
				nomor_sprint: null,
				tanggal_sprint: null
			},
			saksi: {
				id: null,
				nama: null,
				alamat: null,
				pekerjaan: null,
				jenis_identitas: null,
				nomor_identitas: null
			},
			petugas1: {
				user_id: null,
				name: null
			},
			petugas2: {
				user_id: null,
				name: null
			}
		}
	},
	objek: {
		type: null,
		data: null
	},
	dokumen: {
		pengaman: {
			id: null
		}
	}
}

export default {
	name: 'ModalBukaPengaman',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayBukaPengaman,
		MyFormDetail,
		MyFormBukaPengaman,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'bukapengaman',
			doc_id: this.id,
			data: JSON.parse(JSON.stringify(data_default)),
			modal_state: this.state
		}
	},
	methods: {
		async getData() {
			let data = await this.$refs.modal_doc.getData(this.doc_id)
			if (data.main.data.petugas2 == null) {
				data.main.data.petugas2 = {user_id: null}
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