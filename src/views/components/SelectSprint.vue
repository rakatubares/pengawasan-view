<template>
	<div class="wrapper">
		<CRow>
			<CCol md="9" sm="12">
				<div class="form-group">
					<label>No SPRINT</label>
					<v-autocomplete
						class="no-rounded rounded-left no-message"
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="nomor_sprint"
						item-value="id"
						@change="changeValue"
					>
						<template v-slot:append-outer>
							<CButton 
								class="button-input no-rounded rounded-right"
								color="success"
								v-c-tooltip.hover="{content: 'Tambah SPRINT'}"
								@click="showModalSprint"
							>
								<CIcon name="cil-note-add"/>
							</CButton>
						</template>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									Data SPRINT tidak ditemukan
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<h3><v-list-item-title v-text="item.nomor_sprint"></v-list-item-title></h3>
								<v-list-item-subtitle v-text="item.tanggal_sprint"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
					<small class="form-text text-muted w-100">Pilih Nomor Surat Perintah</small>
				</div>
			</CCol>
			<CCol md="3" sm="12">
				<CInput
					label="Tanggal SPRINT"
					:value.sync="sprint.tanggal_sprint"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CInput
					label="Pejabat"
					:value.sync="sprint.pejabat.jabatan"
					disabled
				>
				</CInput>
			</CCol>
		</CRow>

		<!-- Modal input SPRINT -->
		<CModal
			title="Input SPRINT"
			size="lg"
			:show.sync="show_modal"
			@update:show="show_modal == false && closeModalSprint()"
		>
			<CForm>
				<CRow>
					<CCol sm="12">
						<CInput
							label="No Sprint"
							description="Nomor Surat Perintah"
							:value.sync="new_sprint.nomor_sprint"
							:is-valid="validatorRequired"
							invalid-feedback="No SPRINT wajib diisi"
						>
						</CInput>
					</CCol>
				</CRow>
				<CRow>
					<CCol md="4" sm="12">
						<div class="form-group">
							<label class="w-100">Tgl Sprint</label>
							<date-picker
								v-model="new_sprint.tanggal_sprint"
								format="DD-MM-YYYY" 
								value-type="format"
								type="date"
								@change="validatorDatetime($event, 'DD-MM-YYYY', 'validasi.tgl_sprint', 'Tanggal SPRINT wajib diisi')"
							>
								<template v-slot:input="slotProps">
									<input
										class="form-control" 
										type="text" 
										v-bind="slotProps.props" 
										v-on="slotProps.events"
										v-bind:class="{
											'is-valid': validasi.tgl_sprint.state,
											'is-invalid': !validasi.tgl_sprint.state
										}"
									/>
									<div class="invalid-feedback pb-1">{{validasi.tgl_sprint.text}}</div>
								</template>
								<i slot="icon-calendar"></i>
							</date-picker>
						</div>
					</CCol>
					<CCol md="8" sm="12">
						<CSelect
							label="Pejabat"
							description="Jabatan Pejabat Penerbit Surat Perintah"
							:value.sync="new_sprint.pejabat.id"
							:options="pejabatOptions"
						/>
					</CCol>
				</CRow>
			</CForm>

			<template #footer>
				<CButton 
					color="secondary"
					@click="closeModalSprint"
				>
					Kembali
				</CButton>
				<CButton 
					color="success"
					@click="saveSprint"
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
import converters from '../../helpers/converter.js'
import validators from '../../helpers/validator.js'

const default_sprint = {
	nomor_sprint: null,
	tanggal_sprint: null,
	pejabat: {
		id: null,
		jabatan: null
	}
}

const custom_validations_default = {
	tgl_sprint: {
		state: false,
		text: 'Tanggal SPRINT wajib diisi'
	},
}

export default {
	name: 'SelectSprint',
	components: {
		DatePicker,
		MyAlert
	},
	props: {
		id: Number
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			sprint: JSON.parse(JSON.stringify(default_sprint)),
			show_modal: false,
			new_sprint: JSON.parse(JSON.stringify(default_sprint)),
			validasi: JSON.parse(JSON.stringify(custom_validations_default)),
			pejabatOptions: [],
		}
	},
	watch: {
		async search (val) {
			let data = {'s': val}
			let response = await axios.post(api.searchSprint(), data)
			this.items = response.data.data
		}
	},
	methods: {
		changeValue(id) {
			this.getSprint(id)
			this.$emit('update:id', id)
		},
		getSprint(id, mounted=false) {
			if (id != null) {
				axios
					.get(api.getSprintById(id))
					.then(
						(response) => {
							this.sprint = response.data.data
							if (mounted == true) {
								this.items = [response.data.data]
								this.value = this.items[0]
							}
						}
					)
			} else {
				this.sprint = JSON.parse(JSON.stringify(default_sprint))
			}
		},
		showModalSprint() {
			this.getJabatan()
			this.validatorDatetime(this.new_sprint.tanggal_sprint, 'DD-MM-YYYY', 'validasi.tgl_sprint', 'Tanggal SPRINT wajib diisi')	
			this.show_modal = true
		},
		closeModalSprint() {
			this.show_modal = false
			this.new_sprint = JSON.parse(JSON.stringify(default_sprint))
		},
		saveSprint() {
			axios
				.post(api.getSprint(), this.new_sprint)
				.then(
					(response) => {
						this.alert('SPRINT berhasil disimpan')
						this.$emit('update:id', response.data.id)
						this.getSprint(response.data.id, true)
						this.closeModalSprint()
					}
				)
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		validatorRequired(val) { return validators.required(val) },
		validatorDatetime(val, format, validasiName, text) { 
			let dt = converters.date(val, format)
			let valid = validators.date(dt)
			_.set(this, validasiName+'.state', valid)
			_.set(this, validasiName+'.text', text)
		},
		async getJabatan() {
			const response = await axios.get(api.getJabatan())
			let data_jabatan = response.data.data
			
			for (let idx = 0; idx < data_jabatan.length; idx++) {
				// Append jabatan to list
				let jabatan = {
					value: data_jabatan[idx]['id'],
					label: data_jabatan[idx]['jabatan'],
				}
				this.pejabatOptions.push(jabatan)

				// Set default value
				if (data_jabatan[idx]['jabatan'] == 'Kepala Bidang Penindakan dan Penyidikan') {
					this.new_sprint.pejabat.id = data_jabatan[idx]['id']
				}
			}
		}
	},
	mounted() {
		this.getJabatan()
	}
}
</script>

<style>

</style>