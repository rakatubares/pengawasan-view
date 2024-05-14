<template>
	<div class="wrapper">
		<MyModalPenindakan
			ref="ModalPenindakan"
			:title="`Data ${doc_name}`"
			:state.sync="local_state"
			:doc_type="doc_type"
			:document.sync="document"
			:available_objects="['sarkut', 'barang', 'bangunan']"
			@close-modal="closeModal"
		>
			<!-- :default_data="default_document" -->
			<template #uraian>
				<MyFormBukaSegel 
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:document.sync="document"
					@save-data="setDocument"
				/>
				<MyDisplayBukaSegel 
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
import DefaultBukaSegel from './DefaultBukaSegel'
import MyAlert from '../../components/AlertSubmit.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'
import MyDisplayBukaSegel from './DisplayBukaSegel.vue'
import MyFormBukaSegel from './FormBukaSegel.vue'

export default {
	name: 'ModalBukaSegel',
	components: {
		DefaultBukaSegel,
		MyAlert,
		MyModalPenindakan,
		MyDisplayBukaSegel,
		MyFormBukaSegel,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		id: Number,
	},
	data() {
		return {
			doc_id: this.id,
			local_state: this.state,
			document: JSON.parse(JSON.stringify(DefaultBukaSegel.data)),
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
		},
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
			if (this.document.sprint == null) {
				this.document.sprint = JSON.parse(JSON.stringify(DefaultBukaSegel.data.sprint))
			}

			if (this.document.asal_segel == null) {
				this.document.asal_segel = DefaultBukaSegel.data.asal_segel
			}

			if (this.document.saksi == null) {
				this.document.saksi = JSON.parse(JSON.stringify(DefaultBukaSegel.data.saksi))
			}

			if (
				(this.document.petugas.petugas2 == null) ||
				(this.document.petugas.petugas2 == undefined)
			) {
				this.document.petugas.petugas2 = JSON.parse(JSON.stringify(DefaultBukaSegel.data.petugas.petugas2))
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
			this.document.tanggal_buka_segel = converters.currentDate()
		}
	},
}
</script>

<style>

</style>