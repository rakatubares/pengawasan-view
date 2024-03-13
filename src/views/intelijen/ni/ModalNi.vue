<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${label_ni}`"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormNi
						v-if="(['insert','edit'].includes(modal_state)) & (doc_type == 'ni')"
						:state.sync="modal_state"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:kode_lkai="kode_lkai"
						:label_ni="label_ni"
						:label_lkai="label_lkai"
					/>
					<MyFormNiN
						v-if="(['insert','edit'].includes(modal_state)) & (doc_type == 'nin')"
						:state.sync="modal_state"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:kode_lkai="kode_lkai"
						:label_ni="label_ni"
						:label_lkai="label_lkai"
					/>
					<MyDisplayNi
						v-else-if="(modal_state == 'show') & (doc_type == 'ni')"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:label_lkai="label_lkai"
					/>
					<MyDisplayNiN
						v-else-if="(modal_state == 'show') & (doc_type == 'nin')"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:label_lkai="label_lkai"
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
import MyDisplayNi from './DisplayNi.vue'
import MyDisplayNiN from './DisplayNiN.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormNi from './FormNi.vue'
import MyFormNiN from './FormNiN.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalNi',
	components: {
		MyDisplayNi,
		MyDisplayNiN,
		MyDisplayPdf,
		MyFormNi,
		MyFormNiN,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		id: Number,
		kode_lkai: String,
		label_ni: String,
		label_lkai: String,
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