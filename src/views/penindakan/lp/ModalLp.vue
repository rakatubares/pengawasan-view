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
				<MyFormLp
					v-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:doc_name="doc_name"
					:document.sync="document"
					@save-data="setDocument"
				/>
				<MyDisplayLp
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
import DefaultLp from './DefaultLp'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayLp from './DisplayLp.vue'
import MyFormLp from './FormLp.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalLp',
	components: {
		DefaultLp,
		MyAlert,
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayLp,
		MyFormLp,
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
			document: JSON.parse(JSON.stringify(DefaultLp.data)),
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