<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${this.doc_name}`"
			:state.sync="state"
			:doc_type.sync="doc_type"
			:document.sync="document"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			:permission_to_rollback="permission_to_rollback"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormLpf
						v-if="['insert','edit'].includes(local_state)"
						:state.sync="local_state"
						:doc_type="doc_type"
						:doc_name="doc_name"
						:document.sync="document"
						@save-data="setDocument"
					/>
					<MyDisplayLpf
						v-else-if="local_state == 'show'"
						:doc_type="doc_type"
						:document.sync="document"
					/>
				</CTab>
				<CTab
					v-if="tabs_list[1]['visibility']"
					:title="tabs_list[1]['title']"
				>
					<div v-if="current_tab == 1">
						<MyDisplayBhp
							:bhp.sync="document.penyidikan.bhp"
						/>
					</div>
				</CTab>
				<CTab 
					v-if="tabs_list[2]['visibility']"
					:title="tabs_list[2]['title']"
				>
					<div v-if="current_tab == 2">
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
import DefaultLpf from './DefaultLpp'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayBhp from '../../details/displays/DisplayBhp.vue' 
import MyDisplayLpf from './DisplayLpf.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLpf from './FormLpf.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalLpf',
	components: {
		MyAlert,
		MyDisplayBhp,
		MyDisplayLpf,
		MyDisplayPdf,
		MyFormLpf,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		id: Number,
		permission_to_rollback: String,
	},
	data() {
		return {
			doc_id: this.id,
			document: JSON.parse(JSON.stringify(DefaultLpf.data)),
			local_state: this.state,
			tabs_list: [
				{
					title: 'Uraian',
					visibility: true,
				}, 
				{
					title: 'BHP',
					visibility: false,
				}, 
				{
					title: 'Print',
					visibility: false,
				}
			],
			current_tab: 0
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
	methods: {
		async getData() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			this.document = response.data
			this.fillNull()
		},
		setDocument(val) {
			this.document = JSON.parse(JSON.stringify(val))
			this.fillNull()

			this.alert('DATA BERHASIL DISIMPAN')
		},
		fillNull() {
			if (this.document.saksi == null) {
				this.document.saksi = JSON.parse(JSON.stringify(DefaultLpf.data.saksi))
			}

			if (this.document.tersangka == null) {
				this.document.tersangka = JSON.parse(JSON.stringify(DefaultLpf.data.tersangka))
			}
			
			this.document.penyidikan.tertangkap_tangan = this.document.penyidikan.tertangkap_tangan == 1 
				? true : false
		},
		changeTabsList(state) {
			switch (state) {
				case 'show':
					this.tabs_list[1].visibility = true
					this.tabs_list[2].visibility = true
					break;

				case 'edit':
					this.tabs_list[1].visibility = true
					this.tabs_list[2].visibility = true
					break;
			
				default:
					this.tabs_list[1].visibility = false
					this.tabs_list[2].visibility = false
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
		}
	},
	mounted() {
		this.changeTabsList(this.local_state)
	}
}
</script>

<style>

</style>