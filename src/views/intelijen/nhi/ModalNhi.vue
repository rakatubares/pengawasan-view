<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			title="Data NHI"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormNhi
						v-if="['insert','edit'].includes(modal_state)"
						:state.sync="modal_state"
						:doc_type.sync="doc_type"
						:doc_id.sync="doc_id"
					/>
					<MyDisplayNhi
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
						<MyFormBarangNhi
							:state.sync="modal_state"
							:doc_type.sync="doc_type"
							:doc_id.sync="doc_id"
						/>
					</div>
				</CTab>
				<CTab 
					v-if="tabs_list[2]['visibility']"
					:title="tabs_list[2]['title']"
				>
					<div v-if="current_tab == 2">
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
import MyDisplayNhi from './DisplayNhi.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormBarangNhi from './FormBarangNhi.vue'
import MyFormNhi from './FormNhi.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalNhi',
	components: {
		MyDisplayNhi,
		MyDisplayPdf,
		MyFormBarangNhi,
		MyFormNhi,
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
					title: 'Barang',
					visibility: false,
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
					this.tabs_list[2].visibility = true
					break;
				case 'edit':
					this.tabs_list[1].visibility = true
					this.tabs_list[2].visibility = true
					break;
			
				default:
					this.tabs_list[1].visibility = false
					this.tabs_list[2].visibility = false
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