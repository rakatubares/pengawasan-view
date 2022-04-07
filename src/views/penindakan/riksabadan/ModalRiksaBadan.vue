<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Pemeriksaan Badan"
			:state.sync="modal_state"
			:tabs.sync="tabs"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyFormRiksaBadan
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
				<MyDisplayRiksaBadan
					v-else-if="modal_state == 'show'"
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
import MyDisplayRiksaBadan from './DisplayRiksaBadan.vue'
import MyFormRiksaBadan from './FormRiksaBadan.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

const tabs_list = [
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
]

export default {
	name: 'ModalRiksaBadan',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayRiksaBadan,
		MyFormRiksaBadan,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'riksabadan',
			doc_id: this.id,
			modal_state: this.state,
			tabs: JSON.parse(JSON.stringify(tabs_list)),
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