<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>{{ label }}</label>
					<v-autocomplete
						class="no-rounded rounded-left no-message"
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="nama"
						item-value="id"
					>
						<template v-slot:append-outer>
							<CButton 
								v-if="editable"
								class="button-input no-rounded"
								color="primary"
								v-c-tooltip.hover="{content: 'Edit Entitas'}"
								@click="editEntitas"
							>
								<CIcon class="m-0" name="cil-pencil"/>
							</CButton>
							<CButton 
								class="button-input no-rounded rounded-right"
								color="success"
								v-c-tooltip.hover="{content: 'Entitas Baru'}"
								@click="inputEntitas"
							>
								<CIcon class="m-0" name="cil-user-follow"/>
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
				/>
			</CCol>
			<CCol md="5" sm="7">
				<CInput
					label="Nomor Identitas"
					:value.sync="entitas.nomor_identitas"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow v-if="showTanggalLahir">
			<CCol md="4">
				<CInput
					label="Tanggal Lahir"
					:value.sync="entitas.tanggal_lahir"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow v-if="showWargaNegara">
			<CCol md="6">
				<CInput
					label="Kewarganegaraan"
					:value.sync="entitas.warga_negara"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow v-if="showPekerjaan">
			<CCol md="6">
				<CInput
					label="Pekerjaan"
					:value.sync="entitas.pekerjaan"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow v-if="showAlamat">
			<CCol md="12">
				<CTextarea
					label="Alamat Identitas"
					:value.sync="entitas.alamat_identitas"
					disabled
				/>
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
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Alias"
							:value.sync="new_entitas.alias"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CInput
							label="Tempat Lahir"
							:value.sync="new_entitas.tempat_lahir"
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
					<CCol sm="6">
						<CSelect
							label="Jenis Kelamin"
							:value.sync="new_entitas.jenis_kelamin"
							:options="[{value: 'M', label: 'Laki-laki'}, {value: 'F', label: 'Perempuan'}]"
						/>
					</CCol>
					<CCol sm="6">
						<CInput
							label="Agama"
							:value.sync="new_entitas.agama"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<MySelectNegara
							ref="SelectNegara"
							label="Kewarganegaraan"
							:kode.sync="new_entitas.warga_negara.kode_2"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="3" sm="12">
						<CInput
							label="Jenis Identitas"
							:value.sync="new_entitas.jenis_identitas"
							:is-valid="validatorRequired"
							invalid-feedback="Jenis identitas wajib diisi"
						/>
					</CCol>
					<CCol md="5" sm="12">
						<CInput
							label="Nomor Identitas"
							:value.sync="new_entitas.nomor_identitas"
							:is-valid="validatorRequired"
							invalid-feedback="Nomor identitas wajib diisi"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Penerbit Identitas"
							:value.sync="new_entitas.penerbit_identitas"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Tempat Terbit"
							:value.sync="new_entitas.tempat_identitas_terbit"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Alamat Identitas"
							:value.sync="new_entitas.alamat_identitas"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CTextarea
							label="Alamat Tinggal"
							:value.sync="new_entitas.alamat_tinggal"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="12">
						<CInput
							label="Pekerjaan"
							:value.sync="new_entitas.pekerjaan"
						/>
					</CCol>
				</CRow>
				<CRow>
					<CCol sm="6">
						<CInput
							label="No Telepon"
							:value.sync="new_entitas.nomor_telepon"
							:is-valid="validatorPhone"
							invalid-feedback="Nomor telepon tidak valid"
						/>
					</CCol>
					<CCol sm="6">
						<CInput
							id='input-email'
							label="Email"
							:value.sync="new_entitas.email"
							:is-valid="validatorEmail"
							invalid-feedback="Email tidak valid"
						/>
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../router/api2.js'
import validators from '../../helpers/validator.js'
import MyAlert from '../components/AlertSubmit.vue'
import MySelectNegara from '../components/SelectNegara.vue'

const default_entitas = {
	id: null,
	nama: null,
	jenis_identitas: null,
	nomor_identitas: null,
	jenis_kelamin: 'M',
	warga_negara: {kode_2: null}
}

export default {
	name: 'SelectEntitas',
	components: {
		DatePicker,
		MyAlert,
		MySelectNegara,
	},
	props: {
		id: Number,
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
			state: 'insert',
			items: [],
			value: null,
			search: null,
			entitas: JSON.parse(JSON.stringify(default_entitas)),
			show_modal: false,
			new_entitas: JSON.parse(JSON.stringify(default_entitas)),
			editable: false,
		}
	},
	watch: {
		async search (val) {
			let data = {'s': val}
			let response = await api.searchEntitas(data)
			this.items = response.data.data
		},
		value(val) {
			this.getEntitas(val)
			this.$emit('update:id', val)
		}
	},
	methods: {
		async getEntitas(id, mounted=false) {
			if (id != null) {
				// Get entity data
				let response = await api.getEntitasById(id)
				let entitas = response.data.data

				// Fill null value
				if (entitas.warga_negara == null) {
					entitas.warga_negara = {kode_2: null}
				}

				// Change local variable
				this.entitas = response.data.data
				if (mounted == true) {
					this.items = [this.entitas]
					this.value = this.items[0]['id']
				}
				this.editable = true
			} else {
				this.entitas = JSON.parse(JSON.stringify(default_entitas))
				this.editable = false
			}
		},
		editEntitas() {
			this.new_entitas = this.entitas
			this.$nextTick(function() {
				this.$refs.SelectNegara.getData(this.new_entitas.warga_negara.kode_2)	
			})
			this.showModalEntitas('update')
		},
		inputEntitas() {
			this.new_entitas = JSON.parse(JSON.stringify(default_entitas))
			this.showModalEntitas('insert')
		},
		showModalEntitas(state='insert') {
			this.state = state
			this.show_modal = true
		},
		closeModalEntitas() {
			this.new_entitas = JSON.parse(JSON.stringify(default_entitas))
			this.$refs.SelectNegara.getData(null)
			this.show_modal = false
		},
		async saveEntitas() {
			try {
				// Save data
				if (this.state == 'update') {
					var response = await api.updateEntitas(this.new_entitas.id, this.new_entitas)
				} else {
					var response = await api.saveEntitas(this.new_entitas)
				}
				let entitas = response.data.data
				
				// Fill null value
				if (entitas.warga_negara == null) {
					entitas.warga_negara = {kode_2: null}
				}
				
				// Change local variable to result
				this.entitas = entitas
				this.items = [this.entitas]
				this.value = this.items[0]['id']
				this.editable = true

				// Emit result
				this.alert('Entitas berhasil disimpan')
				this.$emit('update:id', response.data.id)
				
				// Close modal
				this.closeModalEntitas()
			} catch (error) {
				console.log('form entitas - save data - error', error)
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorPhone(val) { return validators.phone(val) },
		validatorEmail(val) { return validators.email(val) }
	}
}
</script>

<style>

</style>