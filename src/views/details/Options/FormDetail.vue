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
								:value.sync="active_form"
								:is-valid="validatorRequired"
								invalid-feedback="Objek penindakan harus dipilih"
							/>
						</CCol>
					</CRow>
				</CForm>

				<MyFormSarkut
					v-if="active_form == 'sarkut'"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:data.sync="data"
				/>
				<MyFormBarang
					v-if="active_form == 'barang'"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:data.sync="data"
				/>
				<MyFormBangunan
					v-if="active_form == 'bangunan'"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:data.sync="data"
				/>
				<MyFormBadan
					v-if="active_form == 'orang'"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:data.sync="data"
				/>
				<MyFormDokumen
					v-if="active_form == 'dokumen'"
					:doc_type="doc_type"
					:doc_id="doc_id"
					:data.sync="data"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import validators from '../../../helpers/validator.js'
import MyFormBadan from './FormDetailBadan.vue'
import MyFormBangunan from '../FormDetailBangunan.vue'
import MyFormBarang from './FormDetailBarang.vue'
import MyFormDokumen from './FormDetailDokumen.vue'
import MyFormSarkut from './FormDetailSarkut.vue'

const data_default = {
	type: null,
	data: null
}

const objek_penindakan_default = [
	{ value: 'sarkut', label: 'Sarana Pengangkut', disabled: false },
	{ value: 'barang', label: 'Barang', disabled: false },
	{ value: 'bangunan', label: 'Bangunan / Tempat', disabled: false },
	{ value: 'orang', label: 'Badan / Orang', disabled: false },
	{ value: 'dokumen', label: 'Dokumen', disabled: false },
]

export default {
	name: 'FormDetail',
	components: {
		MyFormBadan,
		MyFormBangunan,
		MyFormBarang,
		MyFormDokumen,
		MyFormSarkut,
	},
	props: {
		available_details: {
			type: Array,
			default() {
				return ['sarkut', 'barang', 'bangunan', 'orang']
			} 
		},
		doc_type: String,
		doc_id: Number
	},
	computed: {
		options_objek_penindakan() {
			let options = []
			for (const idx in objek_penindakan_default) {
				if ((this.available_details.includes(objek_penindakan_default[idx]['value']))) {
					options.push(objek_penindakan_default[idx])
				}
			}
			return options
		}
	},
	data() {
		return {
			detail_state: 'insert',
			active_form: null,
			data: JSON.parse(JSON.stringify(data_default)),
		}
	},
	methods: {
		async getData() {
			this.data = await api.getObjek(this.doc_type, this.doc_id)
			this.active_form = this.data.type
		},
		validatorRequired(val) { return validators.required(val) },
	},
	async mounted() {
		await this.getData()
	}
}
</script>

<style>
.form-tindak {
	border-top: 1px solid;
	border-color: #d8dbe0;
}
</style>