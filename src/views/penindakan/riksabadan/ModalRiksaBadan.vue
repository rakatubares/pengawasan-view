<template>
	<div class="wrapper">
		<MyModalPenindakan
			:title="`Data ${doc_name}`"
			:state.sync="local_state"
			:doc_type="doc_type"
			:document.sync="document"
			:available_objects="[]"
			:permission_to_rollback="permission_to_rollback"
			@close-modal="closeModal"
		>
			<template #uraian>
				<MyFormRiksaBadan 
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:document.sync="document"
					@save-data="setDocument"
				/>
				<MyDisplayRiksaBadan 
					v-else-if="local_state == 'show'"
					:doc_type="doc_type"
					:document.sync="document"
				/>
			</template>
		</MyModalPenindakan>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import converters from '../../../helpers/converter.js'
import DefaultRiksaBadan from './DefaultRiksaBadan'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayRiksaBadan from './DisplayRiksaBadan.vue'
import MyFormRiksaBadan from './FormRiksaBadan.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalRiksaBadan',
	components: {
		DefaultRiksaBadan,
		MyAlert,
		MyDisplayRiksaBadan,
		MyFormRiksaBadan,
		MyModalPenindakan,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		id: Number,
		permission_to_rollback: String,
	},
	data() {
		return {
			doc_id: this.id,
			local_state: this.state,
			document: JSON.parse(JSON.stringify(DefaultRiksaBadan.data)),
		}
	},
	watch: {
		state(val) {
			this.local_state = val
		},
		local_state: function(val) {
			this.$emit('update:state', val)
		},
		id(val) {
			this.doc_id = val
		},
		doc_id(val) {
			this.$emit('update:id', val)
		}
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.document = response.data
			this.fillNull()
		},
		setDocument(val) {
			this.document = JSON.parse(JSON.stringify(val))
			this.fillNull()

			this.alert('DATA BERHASIL DISIMPAN')
		},
		fillNull() {
			if (this.document.penindakan.sprint == null) {
				this.document.penindakan.sprint = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.sprint))
			}

			if (this.document.penindakan.saksi == null) {
				this.document.penindakan.saksi = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.saksi))
			}

			if (
				(this.document.penindakan.petugas.petugas2 == null) ||
				(this.document.penindakan.petugas.petugas2 == undefined)
			) {
				this.document.penindakan.petugas.petugas2 = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.petugas.petugas2))
			}

			let objek = this.document.penindakan.objek.badan

			if (objek.entitas == null) {
				objek.entitas = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.objek.badan.entitas))
			}

			if (objek.pendamping == null) {
				objek.pendamping = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.objek.badan.pendamping))
			}

			if (objek.pengemudi == null) {
				objek.pengemudi = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.objek.badan.pengemudi))
			}

			if (objek.bendera == null) {
				objek.bendera = JSON.parse(JSON.stringify(DefaultRiksaBadan.data.penindakan.objek.badan.bendera))
			}
		},
		closeModal() {
			this.$emit('close-modal')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	async beforeMount() {
		if (['show', 'edit'].includes(this.state)) {
			await this.getData()
		} else {
			this.document.penindakan.tanggal_selesai_penindakan = converters.currentDate()
		}
	},
}
</script>

<style>
</style>