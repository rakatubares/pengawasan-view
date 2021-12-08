<template>
	<div class="wrapper">
		<!-- Form detail -->
		<CRow>
			<CCol sm="12">
				<CForm class="pt-3">
					<CRow>
						<CCol sm="12">
							<h4>Objek Penindakan</h4>
						</CCol>
					</CRow>

					<CRow>
						<CCol md="4">
							<CSelect
								placeholder="pilih objek penindakan"
								:options.sync="options_objek_penindakan"
								:value.sync="active_detail"
								:is-valid="validatorRequired"
								invalid-feedback="Objek penindakan harus dipilih"
							/>
						</CCol>
					</CRow>
				</CForm>

				<MyFormSarkut
					v-if="active_detail == 'sarkut'"
					:state.sync="detail_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					@input-data="
						$emit('update:state', 'edit')
						displayDetail('sarkut')
					"
					@submit-data="$emit('submit-data')"
				>
				</MyFormSarkut>
				<MyFormBarang
					v-if="active_detail == 'barang'"
					:state.sync="detail_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					@input-data="
						$emit('update:state', 'edit')
						displayDetail('barang')
					"
					@submit-data="$emit('submit-data')"
				>
				</MyFormBarang>
				<MyFormBangunan
					v-if="active_detail == 'bangunan'"
					:state.sync="detail_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					@input-data="
						$emit('update:state', 'edit')
						displayDetail('bangunan')
					"
					@submit-data="$emit('submit-data')"
				>
				</MyFormBangunan>
				<MyFormBadan
					v-if="active_detail == 'badan'"
					:state.sync="detail_state"
					:doc_type="doc_type"
					:doc_id="doc_id"
					@input-data="
						$emit('update:state', 'edit')
						displayDetail('badan')
					"
					@submit-data="$emit('submit-data')"
				>
				</MyFormBadan>
			</CCol>
		</CRow>

		<!-- Penindakan yg dilakukan -->
		<CRow 
			v-if="tindakan.show.main"
		>
			<CCol sm="12">
				<CForm class="form-tindak pt-3">
					<CRow>
						<CCol sm="12">
							<h4>Tindakan yang Dilakukan</h4>
						</CCol>
					</CRow>
					<CRow v-if="tindakan.show.riksa">
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="tindakan.data.riksa"
							/>
						</CCol>
						<CCol class="col-9" md="11">
							Pemeriksaan
						</CCol>
					</CRow>
					<CRow v-if="tindakan.show.tegah">
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="tindakan.data.tegah"
							/>
						</CCol>
						<CCol class="col-9" md="11">
							Penegahan
						</CCol>
					</CRow>
					<CRow v-if="tindakan.show.segel">
						<CCol class="col-3" md="1">
							<CSwitch 
								class="mx-1" 
								color="success" 
								variant="3d" 
								v-bind="labelIcon" 
								:checked.sync="tindakan.data.segel"
							/>
						</CCol>
						<CCol class="col-9" md="2">
							Penyegelan
						</CCol>
					</CRow>
					<CRow v-if="tindakan.data.segel">
						<CCol class="col-12">
							<CRow>
								<CCol class="col-12" md="3">
									<CSelect
										label="Jenis Segel"
										:options="['Kertas', 'Kunci', 'Timah', 'Lakban', 'Segel Elektronik', 'Lainnya']"
										:value.sync="tindakan.data.data_segel.jenis"
									/>	
								</CCol>
								<CCol class="col-12" md="2">
									<CInput
										label="Jumlah Segel"
										:value.sync="tindakan.data.data_segel.jumlah"
									/>	
								</CCol>
								<CCol class="col-12" md="3">
									<CInput
										label="Satuan"
										:value.sync="tindakan.data.data_segel.satuan"
									/>	
								</CCol>
							</CRow>
							<CRow>
								<CCol class="col-12">
									<CInput
										label="Tempat Segel"
										:value.sync="tindakan.data.data_segel.tempat"
									/>	
								</CCol>
							</CRow>
						</CCol>
					</CRow>
				</CForm>

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
			</CCol>
		</CRow>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MyFormBadan from '../FormDetailBadan.vue'
import MyFormBangunan from '../FormDetailBangunan.vue'
import MyFormBarang from './FormDetailBarang.vue'
import MyFormSarkut from '../FormDetailSarkut.vue'

const objek_penindakan_default = [
	{ value: 'sarkut', label: 'Sarana Pengangkut', disabled: false },
	{ value: 'barang', label: 'Barang', disabled: false },
	{ value: 'bangunan', label: 'Bangunan / Tempat', disabled: false },
	{ value: 'badan', label: 'Badan / Orang', disabled: false }
]

export default {
	name: 'FormDetail',
	components: {
		MyAlert,
		MyFormBadan,
		MyFormBangunan,
		MyFormBarang,
		MyFormSarkut
	},
	props: {
		available_details: {
			type: Array,
			default() {
				return ['sarkut', 'barang', 'bangunan', 'badan']
			} 
		},
		doc_type: String,
		doc_id: Number
	},
	computed: {
		options_objek_penindakan() {
			let options = JSON.parse(JSON.stringify(objek_penindakan_default))
			for (const idx in options) {
				if (!(this.available_details.includes(options[idx]['value']))) {
					options[idx]['disabled'] = true
				}
			}
			return options
		}
	},
	data() {
		return {
			console,
			active_detail: null,
			detail_state: 'insert',
			tindakan: {
				show: {
					main: false,
					riksa: false,
					tegah: false,
					segel: false,
				},
				data: {
					riksa: false,
					tegah: false,
					segel: false,
					data_segel: {
						jenis: 'Kertas',
						jumlah: null,
						satuan: null,
						tempat: null
					}
				}
			},
			labelIcon: {
				labelOn: '\u2713',
				labelOff: '\u2715'
			},
		}
	},
	watch: {
		active_detail: function (val) {
			if (this.doc_type == 'sbp') {
				switch (val) {
					case 'sarkut':
						this.tindakan.show.main = true
						this.tindakan.show.riksa = true
						this.tindakan.show.tegah = true
						this.tindakan.show.segel = true
						break;

					case 'barang':
						this.tindakan.show.main = true
						this.tindakan.show.riksa = true
						this.tindakan.show.tegah = true
						this.tindakan.show.segel = true
						break;

					case 'bangunan':
						this.tindakan.show.main = true
						this.tindakan.show.riksa = true
						this.tindakan.show.tegah = false
						this.tindakan.show.segel = true
						this.tindakan.data.tegah = false
						break;
				
					default:
						this.tindakan.show.main = false
						this.tindakan.show.riksa = false
						this.tindakan.show.tegah = false
						this.tindakan.show.segel = false
						this.tindakan.data.riksa = false
						this.tindakan.data.tegah = false
						this.tindakan.data.segel = false
						break;
				}	
			}
		}
	},
	methods: {
		async getData() {
			if (this.state == 'edit') {
				let objek = await api.getObjek(this.doc_type, this.doc_id)
				
				if (objek.type != null) {
					this.active_detail = objek.type
					this.detail_state = 'edit'
				} else {
					this.detail_state = 'insert'
				}
			}
		},
		validatorRequired(val) { return validators.required(val) },
		displayDetail(type) {
			this.$emit('input-data', type)
		},
		async saveLinkedDoc() {
			await api.upsertLinkedDoc(this.doc_type, this.doc_id, this.tindakan.data)
			this.$emit('submit-data')
			this.alert('Data dokumen terkait berhasil disimpan')
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	mounted() {
		this.getData()
	}
}
</script>

<style>
.form-tindak {
	border-top: 1px solid;
	border-color: #d8dbe0;
}
</style>