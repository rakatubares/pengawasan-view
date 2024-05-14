<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${doc_name}`"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormNhi
						ref="FormNhi"
						v-if="['insert','edit'].includes(local_state)"
						:state.sync="local_state"
						:doc_type.sync="doc_type"
						:document.sync="document"
						@save-data="setDocument"
					/>
					<MyDisplayNhi
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
						<MyTableItemBarang
							:state.sync="local_state"
							:doc_type.sync="doc_type"
							:doc_id.sync="doc_id"
							:with_photo="false"
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
import DefaultNhi from './DefaultNhi'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayNhi from './DisplayNhi.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormNhi from './FormNhi.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import MyTableItemBarang from '../../components/barang/TableItemBarang.vue'

export default {
	name: 'ModalNhi',
	components: {
		DefaultNhi,
		MyAlert,
		MyDisplayNhi,
		MyDisplayPdf,
		MyFormNhi,
		MyModalTabs,
		MyTableItemBarang,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		id: Number,
	},
	data() {
		return {
			doc_id: this.id,
			document: JSON.parse(JSON.stringify(DefaultNhi.data)),
			local_state: this.state,
			tabs_list: [
				{
					title: 'Uraian',
					visibility: true,
				}, 
				{
					title: 'Barang',
					visibility: false,
				}, 
				{
					title: 'Print',
					visibility: false
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
			let detail_type = this.document.detail.type
			switch (detail_type) {
				case 'nhi-exim':
					if (this.document.detail.data.entitas == null) {
						this.document.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhi.detail_exim.entitas))
					}
					break;

				case 'nhi-tertentu':
					if (this.document.detail.data.entitas == null) {
						this.document.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhi.detail_tertentu.entitas))
					}
					break;
			
				default:
					break;
			}
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
			if (this.state == 'edit') {
				await this.$refs.FormNhi.mountData()
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