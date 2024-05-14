<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${this.doc_name}`"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<CTab :title="tabs_list[0]['title']">
					<MyFormLap
						v-if="['insert','edit'].includes(local_state)"
						:state.sync="local_state"
						:doc_type="doc_type"
						:doc_name="doc_name"
						:document.sync="document"
						@save-data="setDocument"
					/>
					<MyDisplayLap
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
import converters from '../../../helpers/converter.js'
import DefaultLap from './DefaultLap'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayLap from './DisplayLap.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLap from './FormLap.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalLap',
	components: {
		DefaultLap,
		MyAlert,
		MyDisplayLap,
		MyDisplayPdf,
		MyFormLap,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		doc_name: String,
		id: Number
	},
	data() {
		return {
			doc_id: this.id,
			document: JSON.parse(JSON.stringify(DefaultLap.data)),
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
			if (this.document.jenis_sumber == null) {
				this.document.jenis_sumber = DefaultLap.data.jenis_sumber
			}
			this.document.flag_layak_penindakan = this.document.flag_layak_penindakan == 1 ? true : false
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
		} else {
			this.document.tanggal_dokumen = converters.currentDate()
		}
	},
	mounted() {
		this.changeTabsList(this.local_state)
	}
}
</script>

<style>
</style>