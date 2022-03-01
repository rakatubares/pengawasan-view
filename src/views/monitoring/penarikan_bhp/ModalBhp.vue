<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			title="Monitoring penerikan BHP"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyDisplaySbp 
						v-if="current_tab == 0"
						doc_type="sbp"
						:doc_id.sync="doc_id"
					/>
				</CTab>
				<CTab :title="tabs_list[1]['title']">
					<MyDisplayDetail 
						v-if="current_tab == 1"
						doc_type="sbp"
						:doc_id.sync="doc_id"
					/>
				</CTab>
				<CTab :title="tabs_list[2]['title']">
					<MyFormPenarikanBhp
						v-if="(current_tab == 2) && (['store', 'edit'].includes(modal_state))"
						:state.sync="modal_state"
						:doc_id.sync="doc_id"
						@save-data="modal_state = 'show'"
						@cancel-edit="modal_state = 'show'"
					/>
					<MyDisplayPenarikanBhp
						v-if="(current_tab == 2) && (modal_state == 'show')"
						:doc_id.sync="doc_id"
						@edit-data="modal_state = 'edit'"
					/>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplaySbp from '../../penindakan/sbp/DisplaySbp.vue'
import MyDisplayPenarikanBhp from './DisplayPenarikan.vue'
import MyFormPenarikanBhp from './FormPenarikan.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalBhp',
	components: {
		MyDisplayDetail,
		MyDisplaySbp,
		MyDisplayPenarikanBhp,
		MyFormPenarikanBhp,
		MyModalTabs,
	},
	props: {
		state: String,
		id: Number
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
	data() {
		return {
			modal_state: this.state,
			doc_id: this.id,
			tabs_list: [
				{
					title: 'SBP',
					visibility: true
				},
				{
					title: 'Objek',
					visibility: true
				},
				{
					title: 'Penarikan',
					visibility: true
				}
			],
			current_tab: 0
		}
	}
}
</script>

<style>

</style>