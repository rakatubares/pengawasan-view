<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Penitipan"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayTitip
					v-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
				<MyFormTitip
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
import MyDisplayTitip from './DisplayTitip.vue'
import MyFormTitip from './FormTitip.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalSegel',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayTitip,
		MyFormTitip,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'titip',
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