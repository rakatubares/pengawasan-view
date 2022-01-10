<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="title"
			:tabs_list.sync="tabs.list"
			:current_tab.sync="tabs.current"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs.list[0]['title']">
					<slot
						v-if="tabs.current == 0"
						name="tab-uraian"
					/>
				</CTab>

				<CTab 
					v-if="tabs.list[1]['visibility']"
					:title="tabs.list[1]['title']"
				>
					<slot
						v-if="tabs.current == 1"
						name="tab-object"
					/>
				</CTab>

				<CTab 
					v-if="tabs.list[2]['visibility']"
					:title="tabs.list[2]['title']"
				>
					<slot
						v-if="tabs.current == 2"
						name="tab-pdf"
					/>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyModalTabs from './ModalTabs.vue'

const tabs_default = {
	current: 0,
	list: [
		{
			title: 'Uraian',
			visibility: true,
		}, 
		{
			title: 'Objek',
			visibility: false,
		}, 
		{
			title: 'Print',
			visibility: false
		}
	]
}

export default {
	name: 'ModalDoc',
	components: {
		MyModalTabs
	},
	props: {
		state: String,
		title: String
	},
	data() {
		return {
			modal_state: null,
			tabs: JSON.parse(JSON.stringify(tabs_default)),
		}
	},
	methods: {
		closeModal() {
			this.tabs.list[1].visibility = false
			this.tabs.list[2].visibility = false
			this.$emit('close-modal')
		}
	},
	watch: {
		modal_state: function (val) {
			switch (val) {
				case 'show':
					this.tabs.list[1].visibility = true
					this.tabs.list[2].visibility = true
					break;
				
				case 'insert':
					this.tabs.list[1].visibility = false
					this.tabs.list[2].visibility = false
					break;

				case 'edit':
					this.tabs.list[1].visibility = true
					this.tabs.list[2].visibility = true
					break;
			
				default:
					break;
			}
			this.$refs.modal_tabs.getNavs(this.tabs.current)
		}
	},
	mounted() {
		// Change state on mounted to trigger watcher
		this.modal_state = this.state
	}
}
</script>

<style>

</style>