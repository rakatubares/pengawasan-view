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
				<MyDisplayLpp 
					v-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyFormLpp
					ref="form_lpp"
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
import MyDisplayLpp from './DisplayLpp.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLpp from './FormLpp.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalLpp',
	components: {
		MyDisplayBhp,
		MyDisplayLpp,
		MyDisplayPdf,
		MyFormLpp,
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