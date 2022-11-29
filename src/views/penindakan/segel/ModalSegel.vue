<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data BA Segel"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplaySegel
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormSegel
					ref="form_sbp"
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
					:state.sync="modal_state"
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
import MyDisplaySegel from './DisplaySegel.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormSegel from './FormSegel.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalSegel',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplaySegel,
		MyFormDetail,
		MyFormSegel,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'segel',
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
			this.$refs.modal_doc.changeState(val)
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>

</style>