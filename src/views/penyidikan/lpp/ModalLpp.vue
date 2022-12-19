<template>
	<div class="wrapper">
		<MyModalDoc
			:title="`Data ${tipe_surat}`"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplayLpp 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyDisplayDetail 
					v-if="modal_state == 'show'"
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
import MyDisplayLpp from './DisplayLpp.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalLpp',
	components: {
		MyDisplayDetail,
		MyDisplayLpp,
		MyDisplayPdf,
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
	}
}
</script>

<style>

</style>