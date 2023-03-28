<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${tipe_surat}`"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormLkai
						v-if="['insert','edit'].includes(modal_state)"
						:state.sync="modal_state"
						:tipe_surat="tipe_surat"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
					/>
					<MyDisplayLkai
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
import MyDisplayLkai from './DisplayLkai.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLkai from './FormLkai.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalLkai',
	components: {
		MyDisplayLkai,
		MyDisplayPdf,
		MyFormLkai,
		MyModalTabs,
	},
	props: {
		state: String,
		tipe_surat: String,
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
		}
	},
	mounted() {
		this.modal_state = this.state
	}
}
</script>

<style>
</style>