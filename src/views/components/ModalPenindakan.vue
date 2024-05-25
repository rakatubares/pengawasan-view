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
							v-if="detail_state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormSarkut
							v-else-if="detail_state=='edit'"
							:penindakan.sync="penindakan"
						/>
					</div>
				</CTab>

				<!-- Tab Detail Barang -->
				<CTab
					v-if="tabs_properties['barang']['visibility']"
					:title="tabs_properties['barang']['title']"
				>
					<div v-if="checkCurrentTab('barang')">
						<MyDisplayBarang
							v-if="detail_state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBarang
							v-else-if="detail_state=='edit'"
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
							v-if="detail_state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBangunan
							v-else-if="detail_state=='edit'"
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
							v-if="detail_state=='show'"
							:penindakan.sync="penindakan"
						/>
						<MyFormBadan
							v-else-if="detail_state=='edit'"
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
							v-if="['show','edit'].includes(state)"
							:state.sync="local_state"
							:doc_type="doc_type" 
							:document.sync="document"
						/>
					</div>
				</CTab>
			</template>
		</MyModalTabs>
	</div>
</template>

<script>
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
		document: Object,
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
			tabs_names: Object.keys(this.tabs_properties),
			tabs_list: Object.values(this.tabs_properties),
			current_tab: 0,
		}
	},
	computed: {
		local_state: {
			get() { return this.state },
			set(val) { return val },
		},
		detail_state() {
			let state = this.state
			if ((this.state != 'insert')) {
				if ((this.doc_type == 'buka_segel') & (this.document.segel_id != null)) {
					state = 'show'
				} else if (['lphp', 'lp'].includes(this.doc_type)) {
					state = 'show'
				}
			}
			return state
		},
		doc_id() { return this.document.id },
		penindakan: { 
			get() { return this.document.penindakan },
			set(val) { return val },
		},
		objects() {
			let objects = this.available_objects
			if ((this.detail_state == 'show') & (this.penindakan != undefined)) {
				let penindakan = this.penindakan
				objects = this.available_objects.filter(function (object) {
					if (Object.keys(penindakan.objek).includes(object)) {
						return object
					}
				})
			}
			return objects
		}
	},
	watch: {
		objects() {
			this.changeTabsVisibilities()
			this.changeTabsList()
		},
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
		changeTabsVisibilities() {
			switch (this.detail_state) {
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
}
</script>

<style>

</style>