<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${label_lkai}`"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormLkai
						v-if="(['insert','edit'].includes(modal_state)) & (doc_type == 'lkai')"
						:state.sync="modal_state"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:kode_lppi="kode_lppi"
						:label_lkai="label_lkai"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
						:default_pejabat="default_pejabat"
					/>
					<MyFormLkaiN
						v-else-if="(['insert','edit'].includes(modal_state)) & (doc_type == 'lkain')"
						:state.sync="modal_state"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:kode_lppi="kode_lppi"
						:label_lkai="label_lkai"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
						:default_pejabat="default_pejabat"
					/>
					<MyDisplayLkai
						v-else-if="(modal_state == 'show') & (doc_type == 'lkai')"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
					/>
					<MyDisplayLkaiN
						v-else-if="(modal_state == 'show') & (doc_type == 'lkain')"
						:doc_type="doc_type"
						:doc_id.sync="doc_id"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
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
import MyDisplayLkaiN from './DisplayLkaiN.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLkai from './FormLkai.vue'
import MyFormLkaiN from './FormLkaiN.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalLkai',
	components: {
		MyDisplayLkai,
		MyDisplayLkaiN,
		MyDisplayPdf,
		MyFormLkai,
		MyFormLkaiN,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		id: Number,
		kode_lppi: String,
		label_lkai: String,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
		default_pejabat: String,
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