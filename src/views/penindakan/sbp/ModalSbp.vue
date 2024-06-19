<template>
	<div class="wrapper">
		<MyModalPenindakan
			ref="ModalPenindakan"
			:title="`Data ${doc_name}`"
			:state.sync="local_state"
			:doc_type="doc_type"
			:document.sync="document"
			:permission_to_rollback="permission_to_rollback"
			@close-modal="closeModal"
		>
			<template #uraian>
				<MyFormSbp 
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:lptp_name="lptp_name"
					:document.sync="document"
					:source_options="source_options"
					@save-data="setDocument"
				/>
				<MyDisplaySbp 
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
import DefaultSbp from './DefaultSbp'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplaySbp from './DisplaySbp.vue'
import MyFormSbp from './FormSbp.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalSbp',
	components: {
		DefaultSbp,
		MyAlert,
		MyDisplaySbp,
		MyFormSbp,
		MyModalPenindakan,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		lptp_name: String,
		id: Number,
		permission_to_rollback: String,
		source_options: Object,
	},
	data() {
		return {
			doc_id: this.id,
			local_state: this.state,
			default_data: DefaultSbp.data[this.doc_type],
			document: JSON.parse(JSON.stringify(DefaultSbp.data[this.doc_type])),
		}
	},
	watch: {
		state(val) {
			this.local_state = val
		},
		local_state(val) {
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
		async fillNull() {
			if (this.document.jenis_sumber == null) {
				this.document.jenis_sumber = this.default_data.jenis_sumber
			}

			if (this.document.penindakan.sprint == null) {
				this.document.penindakan.sprint = JSON.parse(JSON.stringify(this.default_data.penindakan.sprint))
			}

			if (this.document.penindakan.kategori_penindakan == null) {
				this.document.penindakan.kategori_penindakan = JSON.parse(JSON.stringify(this.default_data.penindakan.kategori_penindakan))
			}

			if (this.document.penindakan.saksi == null) {
				this.document.penindakan.saksi = JSON.parse(JSON.stringify(this.default_data.penindakan.saksi))
			}

			if (
				(this.document.penindakan.petugas.petugas2 == null) ||
				(this.document.penindakan.petugas.petugas2 == undefined)
			) {
				this.document.penindakan.petugas.petugas2 = JSON.parse(JSON.stringify(this.default_data.penindakan.petugas.petugas2))
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