<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="title"
			:tabs_list.sync="tabs.list"
			:current_tab.sync="tabs.current"
			@close-modal="closeModal"
		>
			<template #action-buttons>
				<slot name="action-buttons" />
			</template>
			
			<template #tabs>
				<!-- Uraian -->
				<CTab :title="tabs.list[0]['title']">
					<slot 
						v-if="tabs.list[0].children.form  == true"
						name="form-doc"
					></slot>
					<slot 
						v-if="tabs.list[0].children.display  == true"
						name="disp-doc"
					></slot>
				</CTab>

				<!-- Objek -->
				<CTab 
					v-if="tabs.list[1]['visibility']  == true"
					:title="tabs.list[1]['title']"
				>
					<slot 
						v-if="tabs.list[1].children.form  == true"
						name="form-object"
					></slot>
					<slot 
						v-if="tabs.list[1].children.display  == true"
						name="disp-object"
					></slot>
				</CTab>

				<!-- Print -->
				<CTab 
					v-if="tabs.list[2]['visibility'] == true"
					:title="tabs.list[2]['title']"
				>
					<slot name="disp-pdf"></slot>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyModalTabs from './ModalTabs.vue'

const tabs_default = {
	current: 0,
	list: [
		{
			title: 'Uraian',
			visibility: true,
			children: {
				form: false,
				display: false
			}
		}, 
		{
			title: 'Objek',
			visibility: false,
			children: {
				form: false,
				display: false
			}
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
		doc_type: String,
		doc_id: Number,
		title: String
	},
	data() {
		return {
			modal_state: null,
			tabs: JSON.parse(JSON.stringify(tabs_default)),
			data: null
		}
	},
	methods: {
		async getData(doc_id) {
			return await api.getDocumentById(this.doc_type, doc_id)
		},
		changeState(state) {
			this.modal_state = state
		},
		closeModal() {
			this.$emit('close-modal')
		}
	},
	watch: {
		modal_state: function(val) {
			switch (val) {
				case 'show':
					this.tabs.list[0].children.form = false
					this.tabs.list[0].children.display = true
					this.tabs.list[1].visibility = true
					this.tabs.list[1].children.form = false
					this.tabs.list[1].children.display = true
					this.tabs.list[2].visibility = true
					break;

				case 'insert':
					this.tabs.list[0].children.form = true
					this.tabs.list[0].children.display = false
					this.tabs.list[1].visibility = false
					this.tabs.list[1].children.form = false
					this.tabs.list[1].children.display = false
					this.tabs.list[2].visibility = false
					break;

				case 'edit':
					this.tabs.list[0].children.form = true
					this.tabs.list[0].children.display = false
					this.tabs.list[1].visibility = true
					this.tabs.list[1].children.form = true
					this.tabs.list[1].children.display = false
					this.tabs.list[2].visibility = true
					break;

				case 'edit-header':
					this.tabs.list[0].children.form = true
					this.tabs.list[0].children.display = false
					this.tabs.list[1].visibility = true
					this.tabs.list[1].children.form = false
					this.tabs.list[1].children.display = true
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