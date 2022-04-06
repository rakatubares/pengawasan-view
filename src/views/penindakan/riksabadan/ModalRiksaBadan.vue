<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Pemeriksaan Badan"
			:state.sync="modal_state"
			:tabs.sync="tabs"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<!-- <MyFormRiksa
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/> -->
				<!-- v-else-if="modal_state == 'show'" -->
				<MyDisplayRiksaBadan
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyFormDetail 
					:available_details="['orang']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<!-- <MyDisplayDetail 
					v-else-if="modal_state == 'show'"
					:doc_type="doc_type"
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
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayRiksaBadan from './DisplayRiksaBadan.vue'
// import MyFormDetail from '../../details/Options/FormDetail.vue'
// import MyFormRiksa from './FormRiksa.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

const show_tabs_list = [
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

const insert_tabs_list = [
	{
		title: 'Uraian',
		visibility: true,
		name: 'tab-uraian',
	}, 
	{
		title: 'Objek',
		visibility: false,
		name: 'tab-object',
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
		// MyFormDetail,
		// MyFormRiksa,
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
			tabs: JSON.parse(JSON.stringify(insert_tabs_list)),
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
		chooseTabs() {
			if (this.modal_state == 'show') {
				this.tabs = JSON.parse(JSON.stringify(show_tabs_list))
			} else {
				this.tabs = JSON.parse(JSON.stringify(insert_tabs_list))
			}
		}
	},
	watch: {
		modal_state: function(val) {
			this.$emit('update:state', val)
			this.chooseTabs()
		}
	},
	mounted() {
		this.chooseTabs()
	}
}
</script>

<style>
</style>