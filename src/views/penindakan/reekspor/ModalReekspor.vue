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
					<!-- <div v-if="current_tab == 0"> -->
						<MyFormReekspor
							v-if="['insert','edit'].includes(modal_state)"
							:state.sync="modal_state"
							:doc_id.sync="doc_id"
						/>
						<MyDisplayReekspor
							v-else
							:doc_id.sync="doc_id"
						/>
					<!-- </div> -->
				</CTab>
				<CTab 
					v-if="tabs_list[1]['visibility']"
					:title="tabs_list[1]['title']"
				>
					<div v-if="current_tab == 1">
						<MyDisplayPdf 
							v-if="['show','edit'].includes(modal_state)"
							:state.sync="modal_state"
							:doc_type="doc_type" 
							:doc_id.sync="doc_id"
							:show_button="false"
						/>
					</div>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyDisplayReekspor from './DisplayReekspor.vue'
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormReekspor from './FormReekspor.vue'
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
		MyFormReekspor,
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

				case 'edit':
					this.tabs_list[1].visibility = true
					break;
			
				default:
					this.tabs_list[1].visibility = false
					break;
			}
			this.$refs.modal_tabs.getNavs(this.current_tab)
		}
	},
	mounted() {
		this.modal_state = this.state
		console.log('modal reeskpor - state', this.modal_state)
	}
}
</script>

<style>
</style>