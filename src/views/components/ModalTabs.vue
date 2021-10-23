<template>
	<CModal
		:title="title"
		:size="size"
		:show.sync="show"
		@update:show="show == false && closeModal()"
	>
		<CTabs 
			:activeTab="current_tab"
			@update:activeTab="changeTab($event)"
		>
			<slot name="tab-header"></slot>
			<slot name="tab-detail"></slot>
			<slot name="tab-form"></slot>
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
			show: false,
			navs: JSON.parse(JSON.stringify(navs_default)),
		}
	},
	methods: {
		showModal() {
			this.show = true
		},
		closeModal() {
			this.show = false
			this.$emit('close-modal')
			this.$emit('update:current_tab', 0)
		},
		getNavs(tab) {
			let prev_title = (tab == 0) ? "" : this.tabs_list[tab-1]['title']
			let next_title = (tab == this.tabs_list.length-1) ? "" : this.tabs_list[tab+1]['title']
			let prev_disabled = (tab == 0) ? true : !this.tabs_list[tab-1]['visibility']
			let next_disabled = (tab == this.tabs_list.length-1) ? true : !this.tabs_list[tab+1]['visibility']

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
			this.$emit('update:current_tab', tab)
			this.getNavs(tab)
		},
		prevTab() {
			this.$emit('update:current_tab', this.current_tab - 1)
			this.getNavs(this.current_tab - 1)
		},
		nextTab() {
			this.$emit('update:current_tab', this.current_tab + 1)
			this.getNavs(this.current_tab + 1)
		}
	},
	mounted() {
		this.showModal()
		this.getNavs(0)
	}
}
</script>

<style>

</style>