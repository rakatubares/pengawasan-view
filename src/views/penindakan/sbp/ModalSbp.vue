<template>
	<div class="wrapper">
		<MyModalDoc
			:title="`Data ${tipe_surat}`"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<!-- Documents' components -->
			<template #tab-uraian>
				<MyDisplaySbp 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormSbp 
					ref="form_sbp"
					v-else-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_type="doc_type"
					:tipe_surat="tipe_surat"
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
					v-else-if="modal_state == 'edit'"
					ref="form_detail"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
					@change-data="renderTindakan"
				/>
				<MyFormTindakan
					v-if="show_tindakan"
					ref="form_tindakan"
					:active_details.sync="active_details"
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
import MyDisplaySbp from './DisplaySbp.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormSbp from './FormSbp.vue'
import MyFormTindakan from './FormTindakan.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalSbp',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplaySbp,
		MyFormDetail,
		MyFormSbp,
		MyFormTindakan,
		MyModalDoc,
	},
	props: {
		doc_type: String,
		tipe_surat: String,
		state: String,
		id: Number,
	},
	data() {
		return {
			doc_id: this.id,
			modal_state: this.state,
			show_tindakan: false,
			active_details: null
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
		renderTindakan() {
			this.active_details = this.$refs.form_detail.data.type

			if (this.active_details != null) {
				this.show_tindakan = true
			} else {
				this.show_tindakan = false
			}
		}
	},
	watch: {
		modal_state: function(val) {
			if (val == 'show') {
				this.show_tindakan = false
			}
			this.$emit('update:state', val)
		},
	},
}
</script>

<style>

</style>