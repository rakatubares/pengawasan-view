<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="title"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<slot
						v-if="current_tab == 0"
						name="tab-uraian"
					/>
				</CTab>

				<CTab 
					v-if="tabs_list[1]['visibility']"
					:title="tabs_list[1]['title']"
				>
					<slot
						v-if="current_tab == 1"
						name="tab-object"
					/>
				</CTab>

				<CTab 
					v-if="tabs_list[2]['visibility']"
					:title="tabs_list[2]['title']"
				>
					<slot
						v-if="current_tab == 2"
						name="tab-pdf"
					/>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import MyModalTabs from './ModalTabs.vue'

const default_tabs_list = [
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
			current_tab: 0,
			tabs_list: JSON.parse(JSON.stringify(default_tabs_list)),
		}
	},
	methods: {
		closeModal() {
			this.tabs_list[1].visibility = false
			this.tabs_list[2].visibility = false
			this.$emit('close-modal')
		}
	},
	watch: {
		modal_state: function (val) {
			switch (val) {
				case 'show':
					this.tabs_list[1].visibility = true
					this.tabs_list[2].visibility = true
					break;
				
				case 'insert':
					this.tabs_list[1].visibility = false
					this.tabs_list[2].visibility = false
					break;

				case 'edit':
					this.tabs_list[1].visibility = true
					this.tabs_list[2].visibility = true
					break;
			
				default:
					break;
			}
			this.$refs.modal_tabs.getNavs(this.current_tab)
		},
		current_tab: function (val) {
			this.$emit('change-tab', val)
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