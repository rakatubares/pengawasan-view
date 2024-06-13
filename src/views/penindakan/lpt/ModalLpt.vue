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
				<MyFormLpt
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:document.sync="document"
					@save-data="setDocument"
				/>
				<MyDisplayLpt
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
import DefaultLpt from './DefaultLpt'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayLpt from './DisplayLpt.vue'
import MyFormLpt from './FormLpt.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalLp',
	components: {
		DefaultLpt,
		MyAlert,
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayLpt,
		MyFormLpt,
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
			document: JSON.parse(JSON.stringify(DefaultLpt.data)),
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
		},
		setDocument(val) {
			this.document = JSON.parse(JSON.stringify(val))

			this.alert('DATA BERHASIL DISIMPAN')
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