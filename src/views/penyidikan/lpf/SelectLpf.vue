<template>
	<div class="wraper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>Nomor LPF</label>
					<v-autocomplete
						v-model="value"
						outlined
						dense
						:items.sync="items"
						:search-input.sync="search"
						item-text="no_dok_lengkap"
						item-value="id"
						@change="changeValue"
					>
						<template v-slot:no-data>
							<v-list-item>
								<v-list-item-title>
									Data LPF tidak ditemukan
								</v-list-item-title>
							</v-list-item>
						</template>
						<template v-slot:item="{ item }">
							<v-list-item-content>
								<v-list-item-title v-text="item.no_dok_lengkap"></v-list-item-title>
								<v-list-item-subtitle v-text="item.tanggal_dokumen"></v-list-item-subtitle>
							</v-list-item-content>
						</template>
					</v-autocomplete>
				</div>
			</CCol>
			<CCol md="3" sm="12">
				<CInput
					label="Tanggal LPF"
					:value.sync="lpf.tanggal_dokumen"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="8" sm="12">
				<CInput
					label="No LP"
					:value.sync="lpf.dokumen.lp.no_dok_lengkap"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="Tanggal"
					:value.sync="lpf.dokumen.lp.tanggal_dokumen"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="6" sm="12">
				<CInput
					label="Pelaku"
					:value.sync="lpf.penyidikan.pelaku.nama"
					disabled
				/>
			</CCol>
			<CCol md="2" sm="12">
				<CInput
					label="Jenis ID"
					:value.sync="lpf.penyidikan.pelaku.jenis_identitas"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="No ID"
					:value.sync="lpf.penyidikan.pelaku.nomor_identitas"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CTextarea
					label="Jenis Pelanggaran"
					:value.sync="lpf.penyidikan.jenis_pelanggaran"
					disabled
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'

const default_data = {
	id: null,
	penyidikan: {
		jenis_pelanggaran: null,
		pelaku: {
			nama: null,
			jenis_identitas: null,
			nomor_identitas: null,
		}
	},
	dokumen: {
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		}
	},
}

export default {
	name: 'SelectLpf',
	props: {
		id: Number,
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			lpf: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getData(id, mounted)
			this.$emit('update:id', id)
		},
		async getData(id, mounted=false) {
			if (id != null) {
				let responses = await api.getDisplayDataById('lpf', id)
				this.lpf = JSON.parse(JSON.stringify(responses.data.data))
				this.exception = this.lpf.id
			} else {
				this.lpf = JSON.parse(JSON.stringify(default_data))
			}

			if (mounted == true) {
				this.items = [this.lpf]
				this.value = this.items[0]
			}
		},
	},
	watch: {
		async search (val) {
			let data = {'src': val, 'flt': {'kode_status': 200}, 'exc': this.exception}
			let responses = await api.searchDoc('lpf', data)
			this.items = responses.data.data
		},
	},
}
</script>

<style>

</style>