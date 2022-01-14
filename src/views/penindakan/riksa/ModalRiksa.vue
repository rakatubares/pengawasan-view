<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Pemeriksaan"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayRiksa
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormRiksa
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
					:available_details="['sarkut', 'barang', 'bangunan']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
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
import MyDisplayRiksa from './DisplayRiksa.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormRiksa from './FormRiksa.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

// const data_default = {
// 	main: {
// 		data: {
// 			id: null,
// 			no_dok_lengkap: null,
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
	name: 'ModalRiksa',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayRiksa,
		MyFormDetail,
		MyFormRiksa,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'riksa',
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
		modal_state: function(val) {
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>
</style>