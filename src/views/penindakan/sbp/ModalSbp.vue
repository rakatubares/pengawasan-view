<template>
	<div class="wrapper">
		<MyModalDoc
			ref="modal_doc"
			title="Data SBP"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
		<!-- @change-tab="checkTab" -->
			<!-- Action buttons -->
			<!-- <template #action-buttons>
				<MyModalLphp
					v-if="show_lphp_button"
					:state="lphp_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:doc_num="data.main.data.no_dok_lengkap"
					:data.sync="data.dokumen.lphp"
					@submit-data="refreshData(doc_id)"
				/>
				<MyModalLp
					v-if="show_lp_button"
					:state="lp_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:doc_num="data.main.data.no_dok_lengkap"
					:data.sync="data.dokumen.lp"
					@submit-data="refreshData(doc_id)"
				/>
			</template> -->

			<!-- Documents' components -->
			<template #tab-uraian>
				<MyDisplaySbp 
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormSbp 
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
					ref="display_pdf"
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
import MyDisplaySbp from './DisplaySbp.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormSbp from './FormSbp.vue'
import MyFormTindakan from './FormTindakan.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'
// import MyModalLp from './ModalLp.vue'
// import MyModalLphp from './ModalLphp.vue'

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
		// MyModalLp,
		// MyModalLphp,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'sbp',
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

			if ((this.active_details != null) && (this.active_details != 'orang')) {
				this.show_tindakan = true
			} else {
				this.show_tindakan = false
			}
		}
	},
	watch: {
		modal_state: function(val) {
			this.$refs.modal_doc.modal_state = val
			this.$emit('update:state', val)
		},
	},
}
</script>

<style>

</style>