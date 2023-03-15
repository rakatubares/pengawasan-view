<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lrp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lrp }}</h5>
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LHP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lhp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>LK</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_lk }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SPTP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_sptp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>SPDP</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_spdp }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Jenis Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_jenis_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Pasal Yang Dilanggar</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pasal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Locus</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_tempat_pelanggaran }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Waktu Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_waktu_pelanggaran }}
					</CCol>
				</CRow>
				<MyDisplayEntitas
					title="Pelaku"
					:data.sync="data_lrp.penyidikan.pelaku"
				/>
				<div class="sep">
					<div v-if="data_lrp.saksi.length > 0">
						<MyDisplayEntitas
							v-for="(saksi, index) in data_lrp.saksi"
							:title="`Saksi ` + (index+1)"
							:data="saksi"
							:key="index"
						/>
					</div>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Surat/Dokumen</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_bukti_surat }}
						</CCol>
					</CRow>
					<CRow class="mb-1">
						<CCol md="3" class="py-1">
							<b>Petunjuk</b>
						</CCol>
						<CCol md="9" class="py-1">
							{{ disp_bukti_petunjuk }}
						</CCol>
					</CRow>
					<div v-if="data_lrp.ahli.length > 0">
						<MyDisplayEntitas
							v-for="(ahli, index) in data_lrp.ahli"
							:title="`Ahli ` + (index+1)"
							:data="ahli"
							:key="index"
						/>
					</div>
				</div>
				<div v-if="data_lrp.penyidikan.sarkut != null">
					<MyDisplaySarkut 
						:data_objek="{data: data_lrp.penyidikan.sarkut}"
					/>
				</div>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Modus Pelanggaran</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_modus }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Alternatif Penyelesaian</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_alternatif }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Informasi Lainnya</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_informasi }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Catatan Atasan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_catatan }}
					</CCol>
				</CRow>
				<MyDisplayPegawai
					title="Penyidik"
					:data.sync="data_lrp.penyidik"
				/>
				<MyDisplayPejabat
					title="Atasan 1"
					:data.sync="data_lrp.atasan1"
				/>
				<MyDisplayPejabat
					title="Atasan 2"
					:data.sync="data_lrp.atasan2"
				/>
			</CCol>
		</CRow>
	</div>
</template>

<script>
import api from '../../../router/api2.js'
import MyDisplayEntitas from '../../components/DisplayEntitas.vue'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'
import MyDisplaySarkut from '../../details/displays/DisplaySarkut.vue'

const default_data = {
	no_dok_lengkap: null,
	tanggal_dokumen: null,
	dokumen: {
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		lhp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
	},
	saksi: [],
	ahli: [],
	penyidikan: {
		jenis_penindakan: null,
		modus: null,
		tempat_pelanggaran: null,
		waktu_pelanggaran: null,
		pelaku: { jenis_kelamin: { uraian: null }},
	},
}

export default {
	name: 'DisplayLrp',
	components: {
		MyDisplayEntitas,
		MyDisplayPegawai,
		MyDisplayPejabat,
		MyDisplaySarkut,
	},
	props: {
		doc_type: String,
		doc_id: Number
	},
	data() {
		return {
			data_lrp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lrp() { return this.data_lrp.no_dok_lengkap || '-' },
		disp_tgl_lrp() { return this.data_lrp.tanggal_dokumen || '-' },
		disp_lp() { return `${this.data_lrp.dokumen.lp.no_dok_lengkap} tanggal ${this.data_lrp.dokumen.lp.tanggal_dokumen}`},
		disp_lhp() { return `${this.data_lrp.dokumen.lhp.no_dok_lengkap} tanggal ${this.data_lrp.dokumen.lhp.tanggal_dokumen}`},
		disp_lk() { return `${this.data_lrp.no_lk} tanggal ${this.data_lrp.tanggal_lk}`},
		disp_sptp() { return `${this.data_lrp.no_sptp} tanggal ${this.data_lrp.tanggal_sptp}`},
		disp_spdp() { return `${this.data_lrp.no_spdp} tanggal ${this.data_lrp.tanggal_spdp}`},
		disp_jenis_pelanggaran() { return this.data_lrp.penyidikan.jenis_pelanggaran || '-' },
		disp_pasal() { return this.data_lrp.penyidikan.pasal || '-' },
		disp_tempat_pelanggaran() { return this.data_lrp.penyidikan.tempat_pelanggaran || '-' },
		disp_waktu_pelanggaran() { return this.data_lrp.penyidikan.waktu_pelanggaran || '-' },
		disp_bukti_surat() { return this.data_lrp.alat_bukti_surat || '-' },
		disp_bukti_petunjuk() { return this.data_lrp.alat_bukti_petunjuk || '-' },
		disp_modus() { return this.data_lrp.penyidikan.modus || '-' },
		disp_alternatif() { return this.data_lrp.alternatif_penyelesaian || '-' },
		disp_informasi() { return this.data_lrp.informasi_lain || '-' },
		disp_catatan() { return this.data_lrp.catatan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lrp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	},
}
</script>

<style>

</style>