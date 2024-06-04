<template>
	<CModal
		:size="size"
		:show.sync="show"
		@update:show="show == false && closeModal()"
	>
		<template #header>
			<h5 class="modal-title">{{ title }}</h5>
			<div class="action-buttons">
				<CButton 
					v-if="show_rollback"
					color="success"
					@click="rollbackDocument"
				>
					Rollback
				</CButton>

				<button 
					type="button" 
					aria-label="Close" 
					class="close" 
					@click="closeModal"
				>×</button>
			</div>
		</template>

		<CTabs 
			v-if="show_tabs"
			:activeTab="current_tab"
			@update:activeTab="changeTab($event)"
		>
			<slot name="tabs"></slot>
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

		<!-- Modal konfirmasi rollback -->
		<MyModalRollback
			v-if="show_rollback_modal"
			:doc_type="doc_type"
			:document.sync="document"
			@close-modal="closeModalRollback"
			@rollback-data="rolledBack"
		/>
	</CModal>
</template>

<script>
import MyModalRollback from './ModalRollback.vue'
import permission from '../../helpers/permission'

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
	components: {
		MyModalRollback,
	},
	props: {
		title: String,
		state: String,
		doc_type: String,
		document: Object,
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
		},
		permission_to_rollback: String,
	},
	data() {
		return {
			show: false,
			navs: JSON.parse(JSON.stringify(navs_default)),
			show_tabs: true,
			show_rollback_modal: false,
		}
	},
	computed: {
		show_rollback() {
			let show = false
			if (!['insert', 'edit'].includes(this.state)) {
				let rollbackable = !['draft', 'booking-nomor', 'rollback'].includes(this.document['kode_status'])
				let permited = permission.checkPermission(this.permission_to_rollback)
				if (rollbackable && permited) {
					show = true
				}
			}
			
			return show
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
		},
		resetTabs() {
			this.show_tabs = false
			this.$nextTick(() => {
				this.show_tabs = true
			})
		},
		rollbackDocument() {
			this.show_rollback_modal = true
		},
		closeModalRollback() {
			this.show_rollback_modal = false
		},
		rolledBack() {
			this.closeModalRollback()
			this.closeModal()
		},
	},
	mounted() {
		console.log('MODAL TABS - MOUNTED - STATE', this.state)
		this.showModal()
		this.getNavs(0)
	}
}
</script>

<style>
div.action-buttons {
	display: flow-root;
}

div.action-buttons button {
	margin: 0 5px;
}
</style>