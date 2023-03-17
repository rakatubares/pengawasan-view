<template>
	<div class="wrapper">
		<CRow>
			<CCol md="8" sm="12">
				<div class="form-group">
					<label>Nomor LHP</label>
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
									Data LHP tidak ditemukan
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
					label="Tanggal LHP"
					:value.sync="doc.tanggal_dokumen"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol md="6" sm="12">
				<CInput
					label="Pelaku"
					:value.sync="doc.penyidikan.pelaku.nama"
					disabled
				/>
			</CCol>
			<CCol md="2" sm="12">
				<CInput
					label="Jenis ID"
					:value.sync="doc.penyidikan.pelaku.jenis_identitas"
					disabled
				/>
			</CCol>
			<CCol md="4" sm="12">
				<CInput
					label="No ID"
					:value.sync="doc.penyidikan.pelaku.nomor_identitas"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CTextarea
					label="Jenis Pelanggaran"
					:value.sync="doc.penyidikan.jenis_pelanggaran"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CTextarea
					label="Modus Pelanggaran"
					:value.sync="doc.penyidikan.modus"
					disabled
				/>
			</CCol>
		</CRow>
		<CRow>
			<CCol sm="12">
				<CInput
					label="Pasal"
					:value.sync="doc.penyidikan.pasal"
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
}

export default {
	name: 'SelectLhp',
	props: {
		id: Number,
	},
	data() {
		return {
			items: [],
			value: null,
			search: null,
			exception: null,
			doc: JSON.parse(JSON.stringify(default_data)),
		}
	},
	methods: {
		changeValue(id, mounted=false) {
			this.getData(id, mounted)
			this.$emit('update:id', id)
		},
		async getData(id, mounted=false) {
			if (id != null) {
				let responses = await api.getDisplayDataById('lhp', id)
				this.doc = JSON.parse(JSON.stringify(responses.data.data))
				this.exception = this.doc.id
			} else {
				this.doc = JSON.parse(JSON.stringify(default_data))
			}

			if (mounted == true) {
				this.items = [this.doc]
				this.value = this.items[0]
			}
		},
	},
	watch: {
		async search (val) {
			let data = {'src': val, 'flt': {'kode_status': 200}, 'exc': this.exception}
			let responses = await api.searchDoc('lhp', data)
			this.items = responses.data.data
		},
	},
}
</script>

<style>

</style>