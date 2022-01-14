<template>
	<div class="wrapper sep mt-4 pt-2">
		<CForm>
			<CRow>
				<CCol sm="12">
					<h4>Tindakan yang Dilakukan</h4>
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.show.riksa">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.riksa"
					/>
				</CCol>
				<CCol class="col-9" md="11">
					Pemeriksaan
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.show.tegah">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.tegah"
					/>
				</CCol>
				<CCol class="col-9" md="11">
					Penegahan
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.show.segel">
				<CCol class="col-3" md="1">
					<CSwitch 
						class="mx-1" 
						color="success" 
						variant="3d" 
						v-bind="labelIcon" 
						:checked.sync="data_tindakan.data.segel"
					/>
				</CCol>
				<CCol class="col-9" md="2">
					Penyegelan
				</CCol>
			</CRow>
			<CRow v-if="data_tindakan.data.segel">
				<CCol class="col-12">
					<CRow>
						<CCol class="col-12" md="3">
							<CSelect
								label="Jenis Segel"
								:options="['Kertas', 'Kunci', 'Timah', 'Lakban', 'Segel Elektronik', 'Lainnya']"
								:value.sync="data_tindakan.data.data_segel.jenis"
							/>	
						</CCol>
						<CCol class="col-12" md="2">
							<CInput
								label="Jumlah Segel"
								:value.sync="data_tindakan.data.data_segel.jumlah"
							/>	
						</CCol>
						<CCol class="col-12" md="3">
							<CInput
								label="Satuan"
								:value.sync="data_tindakan.data.data_segel.satuan"
							/>	
						</CCol>
					</CRow>
					<CRow>
						<CCol class="col-12">
							<CInput
								label="Tempat Segel"
								:value.sync="data_tindakan.data.data_segel.tempat"
							/>	
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow>
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveLinkedDoc()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>
		</CForm>
	</div>
</template>

<script>
import api from '../../../router/api2.js'

const default_data = {
	show: {
		riksa: false,
		tegah: false,
		segel: false
	},
	data: {
		riksa: false,
		tegah: false,
		segel: false,
		data_segel: {
			jenis: 'kertas',
			jumlah: null,
			satuan: null,
			tempat: null
		}
	}
}

export default {
	name: "FormTindakan",
	props: {
		active_details: String,
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_tindakan: JSON.parse(JSON.stringify(default_data)),
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	watch: {
		active_details: {
			handler: function (val) {
				switch (val) {
					case 'sarkut':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = true
						this.data_tindakan.show.segel = true
						break;
					case 'barang':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = true
						this.data_tindakan.show.segel = true
						break;
					case 'bangunan':
						this.data_tindakan.show.riksa = true
						this.data_tindakan.show.tegah = false
						this.data_tindakan.show.segel = true
						this.data_tindakan.data.tegah = false
						break;
				
					default:
						this.data_tindakan = JSON.parse(JSON.stringify(default_data))
						break;
				}
			},
			immediate: true
		}
	},
	methods: {
		async getData() {
			let docs = await api.getLinkedDoc(this.doc_type, this.doc_id)
			this.renderData(docs)
		},
		async saveLinkedDoc() {
			let docs = await api.storeLinkedDoc(this.doc_type, this.doc_id, this.data_tindakan.data)
			this.renderData(docs)
		},
		renderData(docs) {
			let linked_docs = docs.data.data

			if ('riksa' in linked_docs) {
				this.data_tindakan.data.riksa = true
			} else {
				this.data_tindakan.data.riksa = false
			}

			if ('tegah' in linked_docs) {
				this.data_tindakan.data.tegah = true
			} else {
				this.data_tindakan.data.tegah = false
			}

			if ('segel' in linked_docs) {
				this.data_tindakan.data.segel = true
				this.data_tindakan.data.data_segel.jenis = linked_docs.segel.jenis_segel
				this.data_tindakan.data.data_segel.jumlah = linked_docs.segel.jumlah_segel
				this.data_tindakan.data.data_segel.satuan = linked_docs.segel.satuan_segel
				this.data_tindakan.data.data_segel.tempat = linked_docs.segel.tempat_segel
			} else {
				this.data_tindakan.data.segel = false
				this.data_tindakan.data.data_segel.jenis = 'kertas'
				this.data_tindakan.data.data_segel.jumlah = null
				this.data_tindakan.data.data_segel.satuan = null
				this.data_tindakan.data.data_segel.tempat = null
			}
		}
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
div.sep {
	border-top: 1px solid;
	border-color: #d8dbe0;;
}
</style>