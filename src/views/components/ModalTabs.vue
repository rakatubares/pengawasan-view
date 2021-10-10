<template>
	<CModal
		:title="title"
		:size="size"
		:show="show"
		@update:show="
			$emit('update:show', $event)
			getNavs()
		"
	>
		<CTabs 
			:activeTab.sync="active_tab"
			@update:activeTab="changeTab($event)"
		>
			<slot name="tab-header"></slot>
			<slot name="tab-detail"></slot>
		</CTabs>

		<template #footer>
			<CButton
				class="btn-nav prev"
				color="info" 
				shape="pill" 
				:disabled.sync="navs.prev.disabled" 
				@click="prevTab"
			>
				<CIcon name="cil-chevron-circle-left-alt"/>
				{{navs.prev.text}}
			</CButton>
			<div class="btn-action">
				<CButton
					class="mx-1"
					color="secondary"
					@click="closeModal"
				>
					Kembali
				</CButton>
			</div>
			<CButton
				class="btn-nav next"
				color="info" 
				shape="pill" 
				:disabled.sync="navs.next.disabled" 
				@click="nextTab()"
			>
				{{navs.next.text}}
				<CIcon name="cil-chevron-circle-right-alt"/>
			</CButton>
		</template>
	</CModal>
</template>

<script>
const navs_default = {
	prev: {
		text: "",
		disabled: true
	},
	next: {
		text: "",
		disabled: true
	}
}
export default {
	name: 'ModalTabs',
	props: {
		title: String,
		show: Boolean,
		size: {
			type: String,
			default: "xl"
		},
		current_tab: {
			type: Number,
			default: 0
		},
		tabs_list: {
			type: Array,
			default() {
				return [
					{
						title: 'Header',
						visibility: true
					}
				]
			}
		}
	},
	data() {
		return {
			console,
			navs: JSON.parse(JSON.stringify(navs_default)),
			active_tab: this.current_tab
		}
	},
	methods: {
		closeModal() {
			this.$emit('update:show', false)
			this.$emit('update:current_tab', 0)
		},
		getNavs() {
			let prev_title = (this.active_tab == 0) ? "" : this.tabs_list[this.active_tab-1]['title']
			let next_title = (this.active_tab == this.tabs_list.length-1) ? "" : this.tabs_list[this.active_tab+1]['title']
			let prev_disabled = (this.active_tab == 0) ? true : !this.tabs_list[this.active_tab-1]['visibility']
			let next_disabled = (this.active_tab == this.tabs_list.length-1) ? true : !this.tabs_list[this.active_tab+1]['visibility']

			this.navs = {
				prev: {
					text: prev_title,
					disabled: prev_disabled
				},
				next: {
					text: next_title,
					disabled: next_disabled
				}
			}
		},
		changeTab(tab) {
			this.active_tab = tab
			this.getNavs()
		},
		prevTab() {
			this.active_tab -= 1
			this.getNavs()
		},
		nextTab() {
			this.active_tab += 1
			this.getNavs()
		}
	},
	mounted() {
		this.getNavs()
	}
}
</script>

<style>

</style>