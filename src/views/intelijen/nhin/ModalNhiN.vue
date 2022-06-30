<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			title="Data NHI-N"
			:tabs_list.sync="visible_tabs"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormNhiN
						v-if="['insert','edit'].includes(modal_state)"
						:state.sync="modal_state"
						:doc_type.sync="doc_type"
						:doc_id.sync="doc_id"
						:is_exim.sync="is_exim"
						@show-data="showData('form')"
					/>
					<MyDisplayNhiN
						v-else-if="modal_state == 'show'"	
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:is_exim.sync="is_exim"
						@show-data="showData('display')"
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
					<div 
						v-if="
							(is_exim == false && current_tab == 1) || 
							(is_exim == true && current_tab == 2)
						"
					>
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
import MyDisplayNhiN from './DisplayNhiN.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormBarangNhi from '../nhi/FormBarangNhi.vue'
import MyFormNhiN from './FormNhiN.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

const default_tabs = [
	{
		title: 'Uraian',
		visibility: true,
	},
	{
		title: 'Barang',
		visibility: false
	}, 
	{
		title: 'Print',
		visibility: false
	}
]

export default {
	name: 'ModalNhiN',
	components: {
		MyDisplayNhiN,
		MyDisplayPdf,
		MyFormBarangNhi,
		MyFormNhiN,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		id: Number,
	},
	data() {
		return {
			doc_id: this.id,
			is_exim: false,
			modal_state: null,
			tabs_list: JSON.parse(JSON.stringify(default_tabs)),
			visible_tabs: JSON.parse(JSON.stringify(default_tabs)),
			current_tab: 0
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
		changeTabsVisibility() {
			switch (this.modal_state) {
				case 'show':
					this.tabs_list[1].visibility = this.is_exim == true ? true : false
					this.tabs_list[2].visibility = true
					break;

				case 'edit':
					this.tabs_list[1].visibility = this.is_exim == true ? true : false
					this.tabs_list[2].visibility = true
					break;
			
				default:
					break;
			}
		},
		resetVisibility() {
			this.current_tab = 0
			this.tabs_list[1].visibility = false
			this.tabs_list[2].visibility = false
		},
		getVisibleTabs() {
			this.visible_tabs.splice(0)
			for (const idx in this.tabs_list) {
				if (this.tabs_list[idx]['visibility'] == true) {
					this.visible_tabs.push(this.tabs_list[idx])
				}
			}
		},
		showData(act=null) {
			let old_tab = this.current_tab
			this.resetVisibility()
			this.getVisibleTabs()
			this.$refs.modal_tabs.getNavs(this.current_tab)

			this.$nextTick(function() {
				this.changeTabsVisibility()
				this.getVisibleTabs()
				if (act == 'display') {
					this.current_tab = old_tab
				}
				this.$refs.modal_tabs.getNavs(this.current_tab)
			})
		},
	},
	watch: {
		modal_state: function(val) {
			this.$emit('update:state', val)
		},
	},
	mounted() {
		this.modal_state = this.state
	}
}
</script>

<style>
</style>