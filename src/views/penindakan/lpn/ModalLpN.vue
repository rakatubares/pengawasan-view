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
				<MyFormLpN
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:document.sync="document"
					@save-data="setDocument"
				/>
				<MyDisplayLpN
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
import DefaultLpN from './DefaultLpN'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayLpN from './DisplayLpN.vue'
import MyFormLpN from './FormLpN.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalLp',
	components: {
		MyAlert,
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayLpN,
		MyFormLpN,
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
			document: JSON.parse(JSON.stringify(DefaultLpN.data)),
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
		fillNull() {
			if (this.document.sprint == null) {
				this.document.sprint = JSON.parse(JSON.stringify(DefaultLpN.data.sprint))
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
			this.document.tanggal_dokumen = converters.currentDate()
		}
	},
}
</script>

<style>

</style>