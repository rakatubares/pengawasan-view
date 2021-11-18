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
		<CRow v-if="showAlamat">
			<CCol md="12">
				<CInput
					label="Alamat"
					:value.sync="entitas.alamat"
					disabled
				>
				</CInput>
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
	</div>
</template>

<script>
import axios from 'axios'

import api from '../../router/api.js'

const default_entitas = {
	id: null,
	nama: null,
	jenis_identitas: null,
	nomor_identitas: null
}

export default {
	name: 'SelectEntitas',
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
			entitas: JSON.parse(JSON.stringify(default_entitas))
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
	}
}
</script>

<style>

</style>