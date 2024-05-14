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
					<component
						ref="FormNi"
						:is="form_ni"
						v-if="['insert','edit'].includes(local_state)"
						:state.sync="local_state"
						:doc_type="doc_type"
						:document.sync="document"
						:kode_lkai="kode_lkai"
						:label_ni="label_ni"
						:label_lkai="label_lkai"
						@save-data="setDocument"
					/>
					<MyDisplayNi
						v-else-if="local_state == 'show'"
						:doc_type="doc_type"
						:document.sync="document"
						:label_lkai="label_lkai"
					/>
				</CTab>
				<CTab 
					v-if="tabs_list[1]['visibility']"
					:title="tabs_list[1]['title']"
				>
					<div v-if="current_tab == 1">
						<MyDisplayPdf 
							v-if="['show','edit'].includes(local_state)"
							:state.sync="local_state"
							:doc_type="doc_type" 
							:document.sync="document"
						/>
					</div>
				</CTab>
			</template>
		</MyModalTabs>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import DefaultNi from './DefaultNi'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayNi from './DisplayNi.vue'
import MyDisplayNiN from './DisplayNiN.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormNi from './FormNi.vue'
import MyFormNiN from './FormNiN.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import NiNKeys from './NiNKeys'

export default {
	name: 'ModalNi',
	components: {
		DefaultNi,
		MyAlert,
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
			document: JSON.parse(JSON.stringify(DefaultNi.data)),
			local_state: this.state,
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
			current_tab: 0,
			nin_keys: JSON.parse(JSON.stringify(NiNKeys)),
		}
	},
	watch: {
		state(val) {
			this.local_state = val
		},
		local_state: function(val) {
			this.$emit('update:state', val)
			this.changeTabsList(val)
		},
		id(val) {
			this.doc_id = val
		},
		doc_id(val) {
			this.$emit('update:id', val)
		},
	},
	computed: {
		form_ni() { return this.doc_type == 'nin' ? MyFormNiN : MyFormNi }
	},
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.document = response.data
			if (this.doc_type == 'nin') {
				this.convertNinData()
			}
		},
		convertNinData() {
			for (const [new_key, old_key] of Object.entries(this.nin_keys)) {
				Object.defineProperty(this.document, new_key, 
					Object.getOwnPropertyDescriptor(this.document, old_key)
				)
				delete this.document[old_key];
			}
		},
		setDocument(val) {
			this.document = JSON.parse(JSON.stringify(val))
			this.alert('DATA BERHASIL DISIMPAN')
		},
		changeTabsList(state) {
			switch (state) {
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
		},
		closeModal() {
			this.$emit('close-modal')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	async beforeMount() {
		if (['show', 'edit'].includes(this.state)) {
			await this.getData()
			if (this.state == 'edit') {
				await this.$refs.FormNi.mountData()
			}
		}
	},
	mounted() {
		this.changeTabsList(this.local_state)
	},
}
</script>

<style>

</style>