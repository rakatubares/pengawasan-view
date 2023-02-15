<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>Nomor LPP</label>
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
									Data LPP tidak ditemukan
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
					label="Tanggal LPP"
					:value.sync="lpp.tanggal_dokumen"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CTextarea
					label="Jenis Pelanggaran"
					:value.sync="lpp.penyidikan.jenis_pelanggaran"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="8" sm="12">
				<CInput
					label="Tempat"
					:value.sync="lpp.penyidikan.tempat_pelanggaran"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="Waktu"
					:value.sync="lpp.penyidikan.waktu_pelanggaran"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="8" sm="12">
				<CInput
					label="Pelaku"
					:value.sync="lpp.penyidikan.pelaku.nama"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="Status Penangkapan"
					:value.sync="lpp.penyidikan.status_penangkapan"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="8" sm="12">
				<CInput
					label="No SBP"
					:value.sync="lpp.dokumen.sbp.no_dok_lengkap"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="Tanggal"
					:value.sync="lpp.dokumen.sbp.tanggal_dokumen"
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
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	penyidikan: {
		jenis_pelanggaran: null,
		tempat_pelanggaran: null,
		waktu_pelanggaran: null,
		pelaku: {nama: null},
		status_penangkapan: null,
	},
	dokumen: {
		sbp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		}
	},
}

export default {
	name: 'SelectLpp',
	props: {
		id: Number,
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			lpp: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getData(id, mounted)
			this.$emit('update:id', id)
		},
		async getData(id, mounted=false) {
			if (id != null) {
				let responses = await api.getDisplayDataById('lpp', id)
				this.lpp = JSON.parse(JSON.stringify(responses.data.data))
				this.exception = this.lpp.id
			} else {
				this.lpp = JSON.parse(JSON.stringify(default_data))
			}

			if (mounted == true) {
				this.items = [this.lpp]
				this.value = this.items[0]
			}
		},
	},
	watch: {
		async search (val) {
			let data = {'src': val, 'flt': {'kode_status': 200}, 'exc': this.exception}
			let responses = await api.searchDoc('lpp', data)
			this.items = responses.data.data
		},
	},
}
</script>

<style>

</style>