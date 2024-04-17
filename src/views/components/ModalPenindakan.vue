<template>
	<div class="wrapper">
		<MyModalTabs
			ref="modal_tabs"
			:title="title"
			:tabs_list.sync="tabs_list"
			:current_tab.sync="current_tab"
			@close-modal="closeModal"
		>
			<template #tabs>
				<!-- Tab Uraian Header -->
				<CTab :title="tabs_properties['uraian']['title']">
					<slot name="uraian"></slot>
				</CTab>

				<!-- Tab Detail Sarkut -->
				<CTab
					v-if="tabs_properties['sarkut']['visibility']"
					:title="tabs_properties['sarkut']['title']"
				>
					<div v-if="checkCurrentTab('sarkut')">
						<MyDisplaySarkut
							v-if="state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormSarkut
							v-else-if="state=='edit'"
							:penindakan.sync="penindakan"
						/>
						<!-- :penindakan_id.sync="penindakan_id"
						:data_objek.sync="data_sarkut" -->
					</div>
				</CTab>

				<!-- Tab Detail Barang -->
				<CTab
					v-if="tabs_properties['barang']['visibility']"
					:title="tabs_properties['barang']['title']"
				>
					<div v-if="checkCurrentTab('barang')">
						<MyDisplayBarang
							v-if="state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBarang
							v-else-if="state=='edit'"
							:penindakan.sync="penindakan"
						/>
					</div>
				</CTab>

				<!-- Tab Detail Bangunan -->
				<CTab
					v-if="tabs_properties['bangunan']['visibility']"
					:title="tabs_properties['bangunan']['title']"
				>
					<div v-if="checkCurrentTab('bangunan')">
						<MyDisplayBangunan
							v-if="state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBangunan
							v-else-if="state=='edit'"
							:penindakan.sync="penindakan"
						/>
					</div>
				</CTab>

				<!-- Tab Detail Badan -->
				<CTab
					v-if="tabs_properties['badan']['visibility']"
					:title="tabs_properties['badan']['title']"
				>
					<div v-if="checkCurrentTab('badan')">
						<MyDisplayBadan
							v-if="state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBadan
							v-else-if="state=='edit'"
							:penindakan.sync="penindakan"
						/>
					</div>
				</CTab>

				<!-- Tab Penindakan -->
				<CTab
					v-if="tabs_properties['tindakan']['visibility']"
					:title="tabs_properties['tindakan']['title']"
				>
					<div v-if="checkCurrentTab('tindakan')">
						<MyFormTindakan 
							v-if="state=='edit'"
							:penindakan.sync="penindakan"
						/>
					</div>
				</CTab>

				<!-- Tab PDF -->
				<CTab 
					v-if="tabs_properties['pdf']['visibility']"
					:title="tabs_properties['pdf']['title']"
				>
					<div v-if="checkCurrentTab('pdf')">
						<MyDisplayPdf 
							v-if="['show','edit'].includes(local_state)"
							:state.sync="local_state"
							:doc_type="doc_type" 
							:doc_id.sync="local_doc_id"
						/>
					</div>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
import api from '../../router/api2.js'
import MyDisplayBadan from '../details/displays/DisplayBadan.vue'
import MyDisplayBangunan from '../details/displays/DisplayBangunan.vue'
import MyDisplayBarang from '../details/displays/DisplayBarang.vue'
import MyDisplaySarkut from '../details/displays/DisplaySarkut.vue'
import MyDisplayPdf from '../pdf/DisplayPdf.vue'
import MyFormBadan from '../details/forms/FormBadan.vue'
import MyFormBangunan from '../details/forms/FormBangunan.vue'
import MyFormBarang from '../details/forms/FormBarang.vue'
import MyFormSarkut from '../details/forms/FormSarkut.vue'
import MyFormTindakan from '../penindakan/sbp/FormTindakan2.vue'
import MyModalTabs from './ModalTabs.vue'

const default_tabs_properties = {
		'uraian': 
		{
			title: 'Uraian',
			visibility: true,
		}, 
		'sarkut': 
		{
			title: 'Detail Sarkut',
			visibility: false,
		}, 
		'barang': 
		{
			title: 'Detail Barang',
			visibility: false,
		}, 
		'bangunan': 
		{
			title: 'Detail Bangunan',
			visibility: false,
		}, 
		'badan':
		{
			title: 'Detail Badan',
			visibility: false,
		}, 
		'tindakan':
		{
			title: 'Tindakan',
			visibility: false,
		}, 
		'pdf':
		{
			title: 'Print',
			visibility: false
		}
	}

const default_objects = ['sarkut', 'barang', 'bangunan', 'badan']

export default {
	name: 'ModalPenindakan',
	components: {
		MyDisplayBadan,
		MyDisplayBangunan,
		MyDisplayBarang,
		MyDisplaySarkut,
		MyDisplayPdf,
		MyFormBadan,
		MyFormBangunan,
		MyFormBarang,
		MyFormSarkut,
		MyFormTindakan,
		MyModalTabs,
	},
	props: {
		state: String,
		title: String,
		doc_type: String,
		doc_id: Number,
		tabs_properties: {
			type: Object,
			default() { return JSON.parse(JSON.stringify(default_tabs_properties)) }
		},
		available_objects: {
			type: Array,
			default() { return JSON.parse(JSON.stringify(default_objects)) }
		},
	},
	data() {
		return {
			local_doc_id: this.doc_id,
			local_state: null,
			penindakan_id: null,
			penindakan: null,
			tabs_names: Object.keys(this.tabs_properties),
			tabs_list: Object.values(this.tabs_properties),
			current_tab: 0,
			objects: this.available_objects,
			data_objects: {},
			data_sarkut: null,
		}
	},
	watch: {
		doc_id(val) {
			this.local_doc_id = val
		},
		local_doc_id(val) {
			this.$emit('update:doc_id', val)
		},
		state(val) {
			this.local_state = val
		},
		local_state(val) {
			this.$emit('update:state', val)
			this.changeTabsVisibilities()
		},
		objects() {
			this.changeTabsVisibilities()
			this.changeTabsList()
		},
	},
	methods: {
		async getObjects() {
			let response = await api.getDocumentById(this.doc_type, this.doc_id)
			if (this.state == 'show') {
				this.objects = this.available_objects.filter(function (object) {
					if (Object.keys(response.data.penindakan.objek).includes(object)) {
						return object
					}
				})
			}

			this.data_objects = response.data.penindakan.objek
			this.penindakan_id = response.data.penindakan.id
			this.penindakan = response.data.penindakan
			
			this.data_sarkut = response.data.penindakan.objek.sarkut
				? JSON.parse(JSON.stringify(response.data.penindakan.objek.sarkut))
				: null

			this.data_badan = response.data.penindakan.objek.badan
				? JSON.parse(JSON.stringify(response.data.penindakan.objek.badan))
				: null
			
			this.data_bangunan = response.data.penindakan.objek.bangunan
				? JSON.parse(JSON.stringify(response.data.penindakan.objek.bangunan))
				: null

			this.data_barang = response.data.penindakan.objek.barang
				? JSON.parse(JSON.stringify(response.data.penindakan.objek.barang))
				: null
		},
		setPenindakan(penindakan) {
			this.data_objects = penindakan.objek
			this.penindakan_id = penindakan.id
			this.penindakan = penindakan
		},
		closeModal() {
			this.$emit('close-modal')
		},
		changeTabsVisibilities() {
			switch (this.state) {
				case 'show':
					this.tabs_properties['sarkut'].visibility = this.objects.includes('sarkut')
					this.tabs_properties['barang'].visibility = this.objects.includes('barang')
					this.tabs_properties['bangunan'].visibility = this.objects.includes('bangunan')
					this.tabs_properties['badan'].visibility = this.objects.includes('badan')
					this.tabs_properties['tindakan'].visibility = false
					this.tabs_properties['pdf'].visibility = true
					break;

				case 'insert':
					this.tabs_properties['sarkut'].visibility = false
					this.tabs_properties['barang'].visibility = false
					this.tabs_properties['bangunan'].visibility = false
					this.tabs_properties['badan'].visibility = false
					this.tabs_properties['tindakan'].visibility = false
					this.tabs_properties['pdf'].visibility = false
					break;

				case 'edit':
					this.tabs_properties['sarkut'].visibility = this.available_objects.includes('sarkut') ? true : false
					this.tabs_properties['barang'].visibility = this.available_objects.includes('barang') ? true : false
					this.tabs_properties['bangunan'].visibility = this.available_objects.includes('bangunan') ? true : false
					this.tabs_properties['badan'].visibility = this.available_objects.includes('badan') ? true : false
					this.tabs_properties['tindakan'].visibility = this.doc_type == 'sbp' ? true : false
					this.tabs_properties['pdf'].visibility = true
					break;
			
				default:
					this.tabs_properties['sarkut'].visibility = false
					this.tabs_properties['barang'].visibility = false
					this.tabs_properties['bangunan'].visibility = false
					this.tabs_properties['badan'].visibility = false
					this.tabs_properties['tindakan'].visibility = false
					this.tabs_properties['pdf'].visibility = false
					break;
			}
			this.$refs.modal_tabs.getNavs(this.current_tab)
		},
		changeTabsList() {
			let tabs_properties = JSON.parse(JSON.stringify(this.tabs_properties))
			default_objects.forEach(object => {
				if (!this.objects.includes(object)) {
					delete tabs_properties[object]
				}
				if ((this.state == 'show') || (this.doc_type != 'sbp')) {
					delete tabs_properties['tindakan']
				}
			});
			this.tabs_names = Object.keys(tabs_properties)
			this.tabs_list = Object.values(tabs_properties)
			this.$refs.modal_tabs.resetTabs()
			this.$nextTick(() => {
				this.$refs.modal_tabs.getNavs(this.current_tab)
			})
		},
		checkCurrentTab(tab_name) {
			let tab_index = this.tabs_names.indexOf(tab_name)
			let match_current = tab_index == this.current_tab
			return match_current
		}
	},
	mounted() {
		this.local_state = this.state
		if (this.state != 'insert') {
			this.getObjects()	
		}
		this.changeTabsVisibilities()
		this.changeTabsList()
	}
}
</script>

<style>

</style>