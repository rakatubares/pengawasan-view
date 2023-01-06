<template>
	<div class="wrapper my-form">
		<!-- Form BA Segel header -->
		<CForm class="pt-3">
			<CRow>
				<CCol md="3">
					<label>Tipe LP</label>
					<CDropdown
						:togglerText.sync="txt_lp_type"
						color="primary"
					>
						<CDropdownItem @click="toggleLpType('lp')">LP Biasa</CDropdownItem>
						<CDropdownItem @click="toggleLpType('lpn')">LP NPP</CDropdownItem>
					</CDropdown>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectLp
						ref="selectLp"
						:lp_type.sync="data.lp_type"
						:id.sync="data.id_lp"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CInput
						label="Asal Perkara"
						description="Nama unit/instansi yang menyerahkan perkara"
						:value.sync="data.asal_perkara"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Penindakan"
						:options="jenis_penindakan_options"
						:value.sync="data.jenis_penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Jenis Perkara"
						:options="jenis_perkara_options"
						:value.sync="data.jenis_perkara"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="3" sm="12">
					<CSelect
						label="Status Pelanggaran"
						:options="['tertangkap tangan', 'tidak tertangkap tangan']"
						:value.sync="data.status_pelanggaran"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Jenis Pelanggaran"
						description="Jenis pelanggaran"
						:value.sync="data.jenis_pelanggaran"
					/>
				</CCol>
				<CCol md="6" sm="12">
					<CInput
						label="Pasal"
						description="Pasal yang diduga dilanggar"
						:value.sync="data.pasal"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Modus"
						description="Modus operandi pelanggaran"
						:value.sync="data.modus"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="8" sm="12">
					<CInput
						label="Tempat"
						description="Tempat kejadian pelanggaran"
						:value.sync="data.tempat_pelanggaran"
					/>
				</CCol>
				<CCol md="4" sm="12">
					<div class="form-group">
						<label class="w-100">Tanggal dan waktu</label>
						<date-picker 
							v-model="data.waktu_pelanggaran" 
							format="DD-MM-YYYY HH:mm" 
							value-type="format"
							type="datetime"
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectEntitas
						ref="selectPelaku"
						label="Nama Pelaku"
						description="Nama orang yang diduga melakukan pelanggaran"
						:id.sync="data.pelaku.id"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan"
						description="Catatan atasan pembuat LPP"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPetugas
						ref="selectPetugas"
						label="Nama Pembuat LPP"
						description="Nama yang membuat LPP"
						:id.sync="data.petugas.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan1"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Atasan Langsung Pembuat LPP', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.0505']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan1.user.user_id"
						:jabatan.sync="data.atasan1.jabatan.kode"
						:plh.sync="data.atasan1.plh"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan2"
						:state.sync="state"
						:label="{jabatan: 'Jabatan Atasan dari Atasan Langsung Pembuat LPP', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan2.user.user_id"
						:jabatan.sync="data.atasan2.jabatan.kode"
						:plh.sync="data.atasan2.plh"
					/>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow>
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveData()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>
		</CForm>

		<!-- Alert -->
		<MyAlert ref="alert"></MyAlert>
	</div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MyAlert from '../../components/AlertSubmit.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'
import MySelectLp from '../../penindakan/lp/SelectLp.vue'

const default_data = {
	lp_type: 'lp',
	id_lp: null,
	jenis_penindakan: 'penghentian sarana pengangkut',
	jenis_perkara: 'impor umum',
	status_pelanggaran: 'tertangkap tangan',
	pelaku: {id: null},
	petugas: {user_id: null},
	atasan1: {
		jabatan: {kode: null},
		plh: null,
		user: {user_id: null},
	},
	atasan2: {
		jabatan: {kode: null},
		plh: null,
		user: {user_id: null},
	},
}

export default {
	name: 'FormLpp',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPejabat,
		MySelectPetugas,
		MySelectLp,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
			txt_lp_type: 'LP Biasa',
			jenis_penindakan_options: [
				'penghentian sarana pengangkut',
				'pemeriksaan barang',
				'penyegelan',
				'penegahan',
				'penangkapan',
			],
			jenis_perkara_options: [
				'impor umum',
				'impor fasilitas',
				'impor BKC',
				'cukai HT',
				'cukai EA',
				'ekspor',
				'pengangkutan barang tertentu',
				'barang penumpang',
			],
		}
	},
	methods: {
		async getData() {
			let response = await api.getFormDataById(this.doc_type, this.doc_id)
			this.data = response.data.data

			this.$nextTick(function () {
				this.renderData()
			})
		},
		renderData() {
			this.changeLpText(this.data.lp_type)
			this.$refs.selectLp.getData(this.data.id_lp, true)
			this.$refs.selectPelaku.getEntitas(this.data.pelaku.id, true)
			this.$refs.selectPetugas.getPetugas(this.data.petugas.user_id, true)
			this.$refs.selectAtasan1.selected_jabatan = this.data.atasan1.jabatan.kode
			this.$refs.selectAtasan1.togglePlh(this.data.atasan1.plh)
			this.$refs.selectAtasan1.getPetugas(this.data.atasan1.user.user_id, true)
			this.$refs.selectAtasan2.selected_jabatan = this.data.atasan2.jabatan.kode
			this.$refs.selectAtasan2.togglePlh(this.data.atasan2.plh)
			this.$refs.selectAtasan2.getPetugas(this.data.atasan2.user.user_id, true)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data ${this.tipe_surat} berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert(`Data ${this.tipe_surat} berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
		toggleLpType(val) {
			// Reset LP data if different from previous type
			if (this.data.lp_type != val) {
				this.$refs.selectLp.getData(null, true)	
				this.data.id_lp = null
			}

			this.data.lp_type = val
			this.changeLpText(val)
		},
		changeLpText(lp_type) {
			if (lp_type == 'lp') {
				this.txt_lp_type = 'LP Biasa'
			} else {
				this.txt_lp_type = 'LP NPP'
			}
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	}
}
</script>

<style>

</style>