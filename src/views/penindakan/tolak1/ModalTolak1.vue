<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			title="Data BA Penolakan Tanda Tangan SBP"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormTolak1
						v-if="['insert','edit'].includes(modal_state)"
						:state.sync="modal_state"
						:doc_id.sync="doc_id"
					/>
					<MyDisplayTolak1
						v-else-if="modal_state == 'show'"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
					/>
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
						/>
					</div>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayTolak1 from './DisplayTolak1.vue'
import MyFormTolak1 from './FormTolak1.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalTolak1',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayTolak1,
		MyFormTolak1,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		id: Number
	},
	data() {
		return {
			doc_id: this.id,
			modal_state: null,
			tabs_list: [
				{
					title: 'Uraian',
					visibility: true,
				}, 
				{
					title: 'Print',
					visibility: false
				}
			],
			current_tab: 0
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
		},
		doc_id: function (val) {
			console.log('modal tolak 1 - doc id', val)
		}
	},
	mounted() {
		this.modal_state = this.state
	}
}
</script>

<style>

</style>