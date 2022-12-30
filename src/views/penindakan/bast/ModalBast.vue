<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Serah terima"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayBast
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormBast
					ref="form_bast"
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
					:available_details="['sarkut', 'barang', 'dokumen', 'orang']"
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
					:show_button="false"
				/>
			</template>
		</MyModalDoc>
  </div>
</template>

<script>
import MyDisplayBast from './DisplayBast.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormBast from './FormBast.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalBast',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayBast,
		MyFormDetail,
		MyFormBast,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'bast',
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
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>

</style>