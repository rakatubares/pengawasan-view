<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data LPHP"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>

			<!-- Documents' components -->
			<template #tab-uraian>
				<MyDisplayLphp 
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormLphp
					ref="form_sbp"
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="['show','edit'].includes(modal_state)"
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
import MyDisplayLphp from './DisplayLphp.vue'
import MyFormLphp from './FormLphp.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalLphp',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayLphp,
		MyFormLphp,
		MyModalDoc
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'lphp',
			doc_id: this.id,
			modal_state: this.state,
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val) {
			this.$refs.modal_doc.modal_state = val
			this.$emit('update:state', val)
		}
	}
}
</script>

<style>

</style>