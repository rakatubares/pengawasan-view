<template>
	<div class="wrapper">
		<MyModalDoc
			:title="`Data ${tipe_surat}`"
			:state.sync="modal_state"
			:tabs="tabs"
			:tabs_visibility="tabs_visibility"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyDisplaySplit 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<!-- <MyFormLpp
					ref="form_lpp"
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_type.sync="doc_type"
					:doc_id.sync="doc_id"
				/> -->
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
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplaySplit from './DisplaySplit.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalSplit',
	components: {
		MyDisplayPdf,
		MyDisplaySplit,
		MyModalDoc,
	},
	props: {
		tipe_surat: String,
		state: String,
		id: Number,
	},
	data() {
		return {
			doc_type: 'split',
			doc_id: this.id,
			modal_state: this.state,
			tabs: [
				{
					title: 'Uraian',
					visibility: true,
					name: 'tab-uraian',
				},
				{
					title: 'Print',
					visibility: false,
					name: 'tab-pdf',
				}
			],
			tabs_visibility: {
				show: ['tab-pdf'],
				edit: ['tab-pdf'],
			},
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
}
</script>