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
				<div 
					v-for="(tab, index) in tabs_list"
					v-bind:key="index"
				>
					<CTab
						v-if="tab['visibility']"
						:title="tab['title']"
					>
						<slot
							v-if="current_tab == index"
							:name="tab['name']"
						/>
					</CTab>
				</div>
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
		name: 'tab-uraian',
	}, 
	{
		title: 'Objek',
		visibility: false,
		name: 'tab-object',
	}, 
	{
		title: 'Print',
		visibility: false,
		name: 'tab-pdf',
	}
]

const default_state_visibility = {
	show: ['tab-object', 'tab-pdf'],
	insert: [],
	edit: ['tab-object', 'tab-pdf'],
}

export default {
	name: 'ModalDoc',
	components: {
		MyModalTabs
	},
	props: {
		state: String,
		title: String,
		tabs: {
			type: Array,
			default() { return JSON.parse(JSON.stringify(default_tabs_list)) }
		},
		tabs_visibility: {
			type: Object,
			default() { return JSON.parse(JSON.stringify(default_state_visibility)) }
		}
	},
	data() {
		return {
			modal_state: null,
			current_tab: 0,
			tabs_list: this.tabs,
			state_visibility: this.tabs_visibility,
		}
	},
	methods: {
		closeModal() {
			for (let i = 1; i < this.tabs_list.length; i++) {
				this.tabs_list[i].visibility = false
			}
			this.$emit('close-modal')
		},
		changeTabsProps() {
			for (let i = 1; i < this.tabs_list.length; i++) {
				if (this.state_visibility[this.state].includes(this.tabs_list[i]['name'])) {
					this.tabs_list[i]['visibility'] = true
				} else {
					this.tabs_list[i]['visibility'] = false
				}
			}
			this.$refs.modal_tabs.getNavs(this.current_tab)
		}
	},
	watch: {
		state: function () {
			this.changeTabsProps()
		},
		current_tab: function (val) {
			this.$emit('change-tab', val)
		},
		tabs(val) {
			this.tabs_list = JSON.parse(JSON.stringify(val))
			this.changeTabsProps()
		}
	},
	mounted() {
		this.changeTabsProps()
	}
}
</script>

<style>

</style>