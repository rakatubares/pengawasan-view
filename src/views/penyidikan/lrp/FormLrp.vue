<template>
	<div class="wrapper my-form">
		<CForm class="pt-3">
			<CRow>
				<CCol md="12">
					<MySelectLhp
						ref="selectLhp"
						:id.sync="data.id_lhp"
					/>
				</CCol>
			</CRow>

			<!-- Dokumen terkait -->
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor LK"
						:value.sync="data.no_lk"
					/>
				</CCol>
				<CCol md="4">
					<div class="form-group">
						<label class="w-100">Tanggal LK</label>
						<date-picker 
							v-model="data.tanggal_lk" 
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor SPTP"
						:value.sync="data.no_sptp"
					/>
				</CCol>
				<CCol md="4">
					<div class="form-group">
						<label class="w-100">Tanggal SPTP</label>
						<date-picker 
							v-model="data.tanggal_sptp" 
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="6" sm="12">
					<CInput
						label="Nomor SPDP"
						:value.sync="data.no_spdp"
					/>
				</CCol>
				<CCol md="4">
					<div class="form-group">
						<label class="w-100">Tanggal SPDP</label>
						<date-picker 
							v-model="data.tanggal_spdp" 
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
							<i slot="icon-clear"></i>
						</date-picker>
					</div>
				</CCol>
			</CRow>

			<!-- Saksi -->
			<CRow class="sep">
				<CCol sm="12">
					<CRow>
						<CCol>
							<h4>Saksi:</h4>
						</CCol>
					</CRow>
					<CRow v-for="(saksi, index) in data.saksi" :key="index" :id="`saksi-${index}`">
						<CCol md="12">
							<MySelectEntitas
								:ref="`selectSaksi${index}`"
								label="Nama Saksi"
								:id.sync="data.saksi[index]['id']"
							>
								<template #button v-if="index > 0">
									<div class="form-group">
										<label>&nbsp;</label>
										<CButton 
											style="height: calc(1.5em + 0.75rem + 2px);"
											class="w-100 d-block" 
											color="danger" 
											@click="delEntity('saksi',index)" 
										>
											<CIcon name="cil-trash"/>
										</CButton>
									</div>
								</template>
							</MySelectEntitas>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addEntity('saksi')">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<!-- Ahli -->
			<CRow class="sep mt-3">
				<CCol sm="12">
					<CRow>
						<CCol>
							<h4>Ahli:</h4>
						</CCol>
					</CRow>
					<CRow v-for="(ahli, index) in data.ahli" :key="index" :id="`ahli-${index}`">
						<CCol md="12">
							<MySelectEntitas
								:ref="`selectAhli${index}`"
								label="Nama Ahli"
								:id.sync="data.ahli[index]['id']"
							>
								<template #button v-if="index > 0">
									<div class="form-group">
										<label>&nbsp;</label>
										<CButton 
											style="height: calc(1.5em + 0.75rem + 2px);"
											class="w-100 d-block" 
											color="danger" 
											@click="delEntity('ahli',index)" 
										>
											<CIcon name="cil-trash"/>
										</CButton>
									</div>
								</template>
							</MySelectEntitas>
						</CCol>
					</CRow>
					<CRow>
						<CCol>
							<CButton color="primary" @click="addEntity('ahli')">+ Tambah</CButton>
						</CCol>
					</CRow>
				</CCol>
			</CRow>

			<CRow class="sep mt-3">
				<CCol sm="12">
					<CTextarea
						label="Alat Bukti Surat/Dokumen"
						description="Diisi surat atau dokumen yang menjadi alat bukti"
						:value.sync="data.alat_bukti_surat"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Alat Bukti Petunjuk"
						description="Diisi alat bukti petunjuk"
						:value.sync="data.alat_bukti_petunjuk"
					/>
				</CCol>
			</CRow>

			<!-- Uraian -->
			<CRow class="sep mt-3">
				<CCol sm="12">
					<CTextarea
						label="Alternatif Penyelesaian Perkara"
						description="Diisi usulan alternatif penyelesaian perkara"
						:value.sync="data.alternatif_penyelesaian"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Informasi lainnya"
						description="Diisi informasi yang perlu dikembangkan lebih lanjut terkait dengan tindak pidana yang terjadi"
						:value.sync="data.informasi_lain"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol sm="12">
					<CTextarea
						label="Catatan atasan"
						description="Diisi catatan/disposisi atas lembar resume perkara oleh pejabat atasan dari/atasan langsung penyusun Penyidik"
						:value.sync="data.catatan"
					/>
				</CCol>
			</CRow>

			<!-- TTD -->
			<CRow class="sep mt-3">
				<CCol md="12">
					<MySelectPetugas
						ref="selectPenyidik"
						label="Ketua Tim Penyidik"
						description="Nama Ketua Tim Penyidik pembuat LRP/Pejabat Fungsional yang melaksanakan tugas dan fungsi di bidang Penyidikan"
						:id.sync="data.penyidik.user_id"
						role="p2vue.penindakan"
					/>
				</CCol>
			</CRow>
			<CRow>
				<CCol md="12">
					<MySelectPejabat
						ref="selectAtasan1"
						:state.sync="state"
						:label="{jabatan: 'Pejabat Eselon IV yang melaksanakan tugas dan fungsi di Bidang Penyidikan', nama: 'Nama Pejabat'}"
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
						:label="{jabatan: 'Jabatan Atasan dari Pejabat Eselon IV', nama: 'Nama Pejabat'}"
						:selectable_jabatan="['bd.05']"
						:selectable_plh="['bd.0501', 'bd.0502','bd.0503', 'bd.0504','bd.0505', 'bd.0506']"
						:id_pejabat.sync="data.atasan2.user.user_id"
						:jabatan.sync="data.atasan2.jabatan.kode"
						:plh.sync="data.atasan2.plh"
					/>
				</CCol>
			</CRow>

			<!-- Button simpan -->
			<CRow class="mt-4">
				<CCol sm="12">
					<CButton
						color="success"
						@click="saveData()"
					>
						Simpan
					</CButton>
				</CCol>
			</CRow>

			<!-- Alert -->
			<MyAlert ref="alert"></MyAlert>
		</CForm>
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
import MySelectLhp from '../lhp/SelectLhp.vue'

const default_data = {
	id_lhp: null,
	saksi: [{id: null}],
	ahli: [{id: null}],
	penyidik: {user_id: null},
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
	name: 'FormLrp',
	components: {
		DatePicker,
		MyAlert,
		MySelectEntitas,
		MySelectPejabat,
		MySelectPetugas,
		MySelectLhp,
	},
	props: {
		state: String,
		doc_type: String,
		doc_id: Number,
	},
	data() {
		return {
			data: JSON.parse(JSON.stringify(default_data)),
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
			this.$refs.selectLhp.getData(this.data.id_lhp, true)
			this.renderEntities('saksi')
			this.renderEntities('ahli')
			this.$refs.selectPenyidik.getPetugas(this.data.penyidik.user_id, true)
			this.$refs.selectAtasan1.selected_jabatan = this.data.atasan1.jabatan.kode
			this.$refs.selectAtasan1.togglePlh(this.data.atasan1.plh)
			this.$refs.selectAtasan1.getPetugas(this.data.atasan1.user.user_id, true)
			this.$refs.selectAtasan2.selected_jabatan = this.data.atasan2.jabatan.kode
			this.$refs.selectAtasan2.togglePlh(this.data.atasan2.plh)
			this.$refs.selectAtasan2.getPetugas(this.data.atasan2.user.user_id, true)
		},
		renderEntities(type) {
			for (let index = 0; index < this.data[type].length; index++) {
				const selectName = type.charAt(0).toUpperCase() + type.slice(1)
				const refName = `select${selectName}${index}`
				const refs = this.$refs[refName]
				refs[0].getEntitas(this.data[type][index]['id'], true)
			}
		},
		addEntity(type) {
			this.data[type].push({'id': null})
		},
		delEntity(type, id) {
			this.data[type].splice(id,1)
			this.renderEntities(type)
		},
		async saveData() {
			if (this.state == 'insert') {
				try {
					this.data = await api.storeDoc(this.doc_type, this.data)

					this.renderEntities('saksi')
					this.renderEntities('ahli')

					this.$emit('update:doc_id', this.data.id)
					this.$emit('update:state', 'edit')
					this.alert(`Data LRP berhasil disimpan`)
				} catch (error) {
					console.log(`form ${this.doc_type} - save data - error`, error)
				}
			} else if (this.state == 'edit') {
				try {
					await api.updateDoc(this.doc_type, this.data.id, this.data)
					this.alert(`Data LRP berhasil diubah`)
				} catch (error) {
					console.log(`form ${this.doc_type} - update data - error`, error)
				}
			}
		},
		alert(text, color, time) {
			this.$refs.alert.show_alert(text, color, time)
		},
	},
	async mounted() {
		if (this.state == 'edit') {
			await this.getData()
		}
	},
}
</script>

<style>

</style>