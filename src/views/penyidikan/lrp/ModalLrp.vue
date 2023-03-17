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
				<MyDisplayLrp 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormLrp
					ref="form_lrp"
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_type.sync="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-bhp>
				<MyDisplayBhp
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
import MyDisplayBhp from '../../details/displays/DisplayBhp.vue' 
import MyDisplayLrp from './DisplayLrp.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLrp from './FormLrp.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalLrp',
	components: {
		MyDisplayBhp,
		MyDisplayLrp,
		MyDisplayPdf,
		MyFormLrp,
		MyModalDoc,
	},
	props: {
		tipe_surat: String,
		state: String,
		id: Number,
	},
	data() {
		return {
			doc_type: 'lrp',
			doc_id: this.id,
			modal_state: this.state,
			tabs: [
				{
					title: 'Uraian',
					visibility: true,
					name: 'tab-uraian',
				}, 
				{
					title: 'BHP',
					visibility: false,
					name: 'tab-bhp',
				}, 
				{
					title: 'Print',
					visibility: false,
					name: 'tab-pdf',
				}
			],
			tabs_visibility: {
				show: ['tab-bhp', 'tab-pdf'],
				insert: [],
				edit: ['tab-bhp', 'tab-pdf'],
			},
			data_bhp: null,
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
}
</script>

<style>

</style>