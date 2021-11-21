<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{ label }}</label>
					<v-autocomplete
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="nama"
						item-value="id"
						@change="changeValue"
					>
						<template v-slot:append-outer>
							<CButton 
								color="success"
								v-c-tooltip.hover="{content: 'Tambah Entitas'}"
								@click="showModalEntitas"
							>
								<CIcon name="cil-user-follow"/>
							</CButton>
						</template>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									Data entitas tidak ditemukan
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<v-list-item-title v-text="item.nama"></v-list-item-title>
								<v-list-item-subtitle v-text="item.jenis_identitas + ' ' + item.nomor_identitas"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
					<small class="form-text text-muted w-100">{{ description }}</small>
				</div>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="3" sm="5">
				<CInput
					label="Jenis Identitas"
					:value.sync="entitas.jenis_identitas"
					disabled
				>
				</CInput>
			</CCol>
			<CCol md="5" sm="7">
				<CInput
					label="Nomor Identitas"
					:value.sync="entitas.nomor_identitas"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow v-if="showTanggalLahir">
			<CCol md="4">
				<CInput
					label="Tanggal Lahir"
					:value.sync="entitas.tanggal_lahir"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow v-if="showWargaNegara">
			<CCol md="6">
				<CInput
					label="Kewarganegaraan"
					:value.sync="entitas.warga_negara"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow v-if="showPekerjaan">
			<CCol md="6">
				<CInput
					label="Pekerjaan"
					:value.sync="entitas.pekerjaan"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow v-if="showAlamat">
			<CCol md="12">
				<CTextarea
					label="Alamat"
					:value.sync="entitas.alamat"
					disabled
				>
				</CTextarea>
			</CCol>
		</CRow>

		<!-- Modal input entitas -->
		<CModal
			title="Input Entitas"
			size="lg"
			:show.sync="show_modal"
			@update:show="show_modal == false && closeModalEntitas()"
		>
			<CForm>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Nama"
							description="Nama lengkap entitas"
							:value.sync="new_entitas.nama"
							:is-valid="validatorRequired"
							invalid-feedback="Nama entitas wajib diisi"
						>
						</CInput>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CSelect
							label="Jenis Kelamin"
							:value.sync="new_entitas.jenis_kelamin"
							:options="['Laki-laki', 'Perempuan']"
						/>
					</CCol>
					<CCol sm="6">
						<div class="form-group">
							<label class="w-100">Tgl lahir</label>
							<date-picker
								v-model="new_entitas.tanggal_lahir"
								format="DD-MM-YYYY" 
								value-type="format"
								type="date"
							>
								<template v-slot:input="slotProps">
									<input
										class="form-control" 
										type="text" 
										v-bind="slotProps.props" 
										v-on="slotProps.events"
									/>
								</template>
								<i slot="icon-calendar"></i>
							</date-picker>
						</div>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Kewarganegaraan"
							:value.sync="new_entitas.warga_negara"
						>
						</CInput>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="3" sm="12">
						<CInput
							label="Jenis Identitas"
							:value.sync="new_entitas.jenis_identitas"
							:is-valid="validatorRequired"
							invalid-feedback="Jenis identitas wajib diisi"
						>
						</CInput>
					</CCol>
					<CCol md="5" sm="12">
						<CInput
							label="Nomor Identitas"
							:value.sync="new_entitas.nomor_identitas"
							:is-valid="validatorRequired"
							invalid-feedback="Nomor identitas wajib diisi"
						>
						</CInput>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Pekerjaan"
							:value.sync="new_entitas.pekerjaan"
						>
						</CInput>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Alamat"
							:value.sync="new_entitas.alamat"
						>
						</CTextarea>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton 
					color="secondary"
					@click="closeModalEntitas"
				>
					Kembali
				</CButton>
				<CButton 
					color="success"
					@click="saveEntitas"
				>
					Simpan
				</CButton>
			</template>
		</CModal>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import axios from 'axios'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import MyAlert from '../components/AlertSubmit.vue'
import api from '../../router/api.js'
import validators from '../../helpers/validator.js'

const default_entitas = {
	id: null,
	nama: null,
	jenis_identitas: null,
	nomor_identitas: null
}

export default {
	name: 'SelectEntitas',
	components: {
		DatePicker,
		MyAlert
	},
	props: {
		id: {
			type: Number,
			default: null
		},
		label: String,
		description: String,
		showTanggalLahir: {
			type: Boolean,
			default: false
		},
		showWargaNegara: {
			type: Boolean,
			default: false
		},
		showPekerjaan: {
			type: Boolean,
			default: false
		},
		showAlamat: {
			type: Boolean,
			default: false
		},
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			entitas: JSON.parse(JSON.stringify(default_entitas)),
			show_modal: false,
			new_entitas: JSON.parse(JSON.stringify(default_entitas)),
		}
	},
	watch: {
		async search (val) {
			let data = {'s': val}
			let response = await axios.post(api.searchEntitas(), data)
			this.items = response.data.data
		}
	},
	methods: {
		changeValue(id) {
			this.getEntitas(id)
			this.$emit('update:id', id)
		},
		getEntitas(id, mounted=false) {
			if (id != null) {
				axios
					.get(api.getEntitasById(id))
					.then(
						(response) => {
							this.entitas = response.data.data
							if (mounted == true) {
								this.items = [response.data.data]
								this.value = this.items[0]
							}
						}
					)
			} else {
				this.entitas = JSON.parse(JSON.stringify(default_entitas))
			}
		},
		showModalEntitas() {
			this.show_modal = true
		},
		closeModalEntitas() {
			this.show_modal = false
		},
		saveEntitas() {
			axios
				.post(api.getEntitas(), this.new_entitas)
				.then(
					(response) => {
						this.alert('Entitas berhasil disimpan')
						this.$emit('update:id', response.data.id)
						this.getEntitas(response.data.id, true)
						this.closeModalEntitas()
					}
				)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
	}
}
</script>

<style>

</style>