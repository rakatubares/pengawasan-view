<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${doc_name}`"
			:tabs_list.sync="visible_tabs"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormNhiN
						ref="FormNhiN"
						v-if="['insert','edit'].includes(local_state)"
						:state.sync="local_state"
						:doc_type.sync="doc_type"
						:document.sync="document"
						@save-data="setDocument"
					/>
					<MyDisplayNhiN
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
					<div 
						v-if="
							(is_exim == false && current_tab == 1) || 
							(is_exim == true && current_tab == 2)
						"
					>
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
import DefaultNhiN from './DefaultNhiN'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayNhiN from './DisplayNhiN.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormNhiN from './FormNhiN.vue'
import MyModalTabs from '../../components/ModalTabs.vue'
import MyTableItemBarang from '../../components/barang/TableItemBarang.vue'

const default_tabs = [
	{
		title: 'Uraian',
		visibility: true,
	},
	{
		title: 'Barang',
		visibility: false
	}, 
	{
		title: 'Print',
		visibility: false
	}
]

export default {
	name: 'ModalNhiN',
	components: {
		DefaultNhiN,
		MyAlert,
		MyDisplayNhiN,
		MyDisplayPdf,
		MyFormNhiN,
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
			document: JSON.parse(JSON.stringify(DefaultNhiN.data)),
			local_state: this.state,
			tabs_list: JSON.parse(JSON.stringify(default_tabs)),
			visible_tabs: JSON.parse(JSON.stringify(default_tabs)),
			current_tab: 0
		}
	},
	watch: {
		is_exim() {
			this.showData()
		},
		state(val) {
			this.local_state = val
		},
		local_state: function(val) {
			this.$emit('update:state', val)
			this.changeTabsVisibility(val)
		},
		id(val) {
			this.doc_id = val
		},
		doc_id(val) {
			this.$emit('update:id', val)
		},
	},
	computed: {
		is_exim() { return this.document.detail.type == 'nhin-exim' ? true : false }
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
			this.showData()

			this.alert('DATA BERHASIL DISIMPAN')
		},
		fillNull() {
			let detail_type = this.document.detail.type
			switch (detail_type) {
				case 'nhin-exim':
					if (this.document.detail.data.entitas == null) {
						this.document.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhiN.detail_exim.entitas))
					}
					break;

				case 'nhin-sarkut':
					if (this.document.detail.data.pelabuhan_asal == null) {
						this.document.detail.data.pelabuhan_asal = JSON.parse(JSON.stringify(DefaultNhiN.detail_sarkut.pelabuhan_asal))
					}
					if (this.document.detail.data.pelabuhan_tujuan == null) {
						this.document.detail.data.pelabuhan_tujuan = JSON.parse(JSON.stringify(DefaultNhiN.detail_sarkut.pelabuhan_tujuan))
					}
					break;

				case 'nhin-orang':
					if (this.document.detail.data.entitas == null) {
						this.document.detail.data.entitas = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.entitas))
					}
					if (this.document.detail.data.pelabuhan_asal == null) {
						this.document.detail.data.pelabuhan_asal = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.pelabuhan_asal))
					}
					if (this.document.detail.data.pelabuhan_tujuan == null) {
						this.document.detail.data.pelabuhan_tujuan = JSON.parse(JSON.stringify(DefaultNhiN.detail_orang.pelabuhan_tujuan))
					}
					break;
			
				default:
					break;
			}
		},
		closeModal() {
			this.$emit('close-modal')
		},
		changeTabsVisibility(state) {
			switch (state) {
				case 'show':
					this.tabs_list[1].visibility = this.is_exim == true ? true : false
					this.tabs_list[2].visibility = true
					break;

				case 'edit':
					this.tabs_list[1].visibility = this.is_exim == true ? true : false
					this.tabs_list[2].visibility = true
					break;
			
				default:
					break;
			}
		},
		resetVisibility() {
			this.current_tab = 0
			this.tabs_list[1].visibility = false
			this.tabs_list[2].visibility = false
		},
		getVisibleTabs() {
			this.visible_tabs.splice(0)
			for (const idx in this.tabs_list) {
				if (this.tabs_list[idx]['visibility'] == true) {
					this.visible_tabs.push(this.tabs_list[idx])
				}
			}
		},
		showData() {
			let old_tab = this.current_tab
			this.resetVisibility()
			this.getVisibleTabs()
			this.$refs.modal_tabs.getNavs(this.current_tab)

			this.$nextTick(function() {
				this.changeTabsVisibility(this.local_state)
				this.getVisibleTabs()
				if (this.local_state == 'show') {
					this.current_tab = old_tab
				}
				this.$refs.modal_tabs.getNavs(this.current_tab)
			})
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	async beforeMount() {
		if (['show', 'edit'].includes(this.state)) {
			await this.getData()
			if (this.state == 'edit') {
				await this.$refs.FormNhiN.mountData()
			}
		}
	},
	mounted() {
		this.showData()
	}
}
</script>

<style>
</style>