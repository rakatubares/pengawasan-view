<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="`Data ${label_lkai}`"
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
					<MyFormLkai
						ref="FormLkai"
						v-if="(['insert','edit'].includes(local_state))"
						:state.sync="local_state"
						:doc_type="doc_type"
						:document.sync="document"
						:kode_lppi="kode_lppi"
						:label_lkai="label_lkai"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
						:default_pejabat="default_pejabat"
						@save-data="setDocument"
					/>
					<MyDisplayLkai
						v-else-if="(local_state == 'show')"
						:doc_type="doc_type"
						:document.sync="document"
						:label_lppi="label_lppi"
						:label_lpti="label_lpti"
						:label_npi="label_npi"
						:label_nhi="label_nhi"
						:label_ni="label_ni"
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
import DefaultLkai from './DefaultLkai'
import MyAlert from '../../components/AlertSubmit.vue'
import MyDisplayLkai from './DisplayLkai.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyFormLkai from './FormLkai.vue'
import MyModalTabs from '../../components/ModalTabs.vue'

export default {
	name: 'ModalLkai',
	components: {
		DefaultLkai,
		MyAlert,
		MyDisplayLkai,
		MyDisplayPdf,
		MyFormLkai,
		MyModalTabs,
	},
	props: {
		state: String,
		doc_type: String,
		id: Number,
		kode_lppi: String,
		label_lkai: String,
		label_lppi: String,
		label_lpti: String,
		label_npi: String,
		label_nhi: String,
		label_ni: String,
		default_pejabat: String,
		permission_to_rollback: String,
	},
	data() {
		return {
			doc_id: this.id,
			document: JSON.parse(JSON.stringify(DefaultLkai.data)),
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
			let posisi = Object.keys(this.document.petugas)
			for (const key in DefaultLkai.data.petugas) {
				if (!posisi.includes(key)) {
					this.document.petugas[key] = JSON.parse(JSON.stringify(DefaultLkai.data.petugas[key]))
				}
			}
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
				await this.$refs.FormLkai.mountData()
			}
		} else {
			this.document.tanggal_terima_pejabat = converters.currentDate()
			this.document.tanggal_terima_atasan = converters.currentDate()
		}
	},
	mounted() {
		this.changeTabsList(this.local_state)
	},
}
</script>

<style>
</style>