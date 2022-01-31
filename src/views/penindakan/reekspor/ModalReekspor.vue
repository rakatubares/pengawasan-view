<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			title="Data BA Pengawasan Reekspor"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyDisplayReekspor
						v-if="modal_state == 'show'"
						:doc_id.sync="doc_id"
					/>
				</CTab>
				<CTab 
					v-if="tabs_list[1]['visibility']"
					:title="tabs_list[1]['title']"
				>
					<MyDisplayPdf 
						v-if="['show','edit'].includes(modal_state)"
						:state.sync="modal_state"
						:doc_type="doc_type" 
						:doc_id.sync="doc_id"
						:show_button="false"
					/>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyDisplayReekspor from './DisplayReekspor.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
// import MyFormContoh from './FormContoh.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

const default_tabs_list = [
	{
		title: 'Uraian',
		visibility: true,
	}, 
	{
		title: 'Print',
		visibility: false
	}
]

export default {
	name: 'ModalReekspor',
	components: {
		MyDisplayReekspor,
		MyDisplayDetail,
		MyDisplayPdf,
		// MyFormContoh,
		MyFormDetail,
		MyModalDoc,
		MyModalTabs,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'reekspor',
			doc_id: this.id,
			modal_state: null,
			current_tab: 0,
			tabs_list: JSON.parse(JSON.stringify(default_tabs_list))
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

			switch (val) {
				case 'show':
					this.tabs_list[1].visibility = true
					break;
			
				default:
					this.tabs_list[1].visibility = false
					break;
			}
		}
	},
	mounted() {
		this.modal_state = this.state
		console.log('modal reekspor - state', this.modal_state)
	}
}
</script>

<style>
</style>