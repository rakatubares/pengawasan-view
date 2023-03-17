<template>
	<div class="wrapper">
		<CRow>
			<CCol class="mt-3 mx-2" md="12">
				<CRow>
					<CCol class="pb-1">
						<h4>{{ disp_no_lhp }}</h4>
					</CCol>
				</CRow>
				<CRow>
					<CCol class="pt-1 pb-3">
						<h5>{{ disp_tgl_lhp }}</h5>
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
						<b>SPLIT</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_split }}
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
						<b>Tempat Pelanggaran</b>
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
						<b>Pemenuhan Unsur Pasal</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_pasal }}
					</CCol>
				</CRow>
				<CRow class="mb-1">
					<CCol md="3" class="py-1">
						<b>Kesimpulan</b>
					</CCol>
					<CCol md="9" class="py-1">
						{{ disp_kesimpulan }}
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
				<div v-if="data_lhp.penyidikan.sarkut != null">
					<MyDisplaySarkut 
						:data_objek="{data: data_lhp.penyidikan.sarkut}"
					/>
				</div>
				<MyDisplayEntitas
					title="Pelaku"
					:data.sync="data_lhp.penyidikan.pelaku"
				/>
				<div v-if="data_lhp.saksi.length > 0">
					<MyDisplayEntitas
						v-for="(saksi, index) in data_lhp.saksi"
						:title="`Saksi ` + (index+1)"
						:data="saksi"
						:key="index"
					/>
				</div>
				<MyDisplayPegawai
					title="Peneliti"
					:data.sync="data_lhp.peneliti"
				/>
				<MyDisplayPejabat
					title="Atasan 1"
					:data.sync="data_lhp.atasan1"
				/>
				<MyDisplayPejabat
					title="Atasan 2"
					:data.sync="data_lhp.atasan2"
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
	saksi: [],
	dokumen: {
		lp: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
		split: {
			no_dok_lengkap: null,
			tanggal_dokumen: null,
		},
	},
	penyidikan: {
		jenis_penindakan: null,
		modus: null,
		tempat_pelanggaran: null,
		waktu_pelanggaran: null,
		pelaku: { jenis_kelamin: { uraian: null }},
	},
}

export default {
	name: 'DisplayLhp',
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
			data_lhp: JSON.parse(JSON.stringify(default_data))
		}
	},
	computed: {
		disp_no_lhp() { return this.data_lhp.no_dok_lengkap || '-' },
		disp_tgl_lhp() { return this.data_lhp.tanggal_dokumen || '-' },
		disp_lp() { return `${this.data_lhp.dokumen.lp.no_dok_lengkap} tanggal ${this.data_lhp.dokumen.lp.tanggal_dokumen}`},
		disp_split() { return `${this.data_lhp.dokumen.split.no_dok_lengkap} tanggal ${this.data_lhp.dokumen.split.tanggal_dokumen}`},
		disp_jenis_pelanggaran() { return this.data_lhp.penyidikan.jenis_pelanggaran || '-' },
		disp_tempat_pelanggaran() { return this.data_lhp.penyidikan.tempat_pelanggaran || '-' },
		disp_waktu_pelanggaran() { return this.data_lhp.penyidikan.waktu_pelanggaran || '-' },
		disp_modus() { return this.data_lhp.penyidikan.modus || '-' },
		disp_pasal() { return this.data_lhp.penyidikan.pasal || '-' },
		disp_kesimpulan() { return this.data_lhp.kesimpulan || '-' },
		disp_alternatif() { return this.data_lhp.alternatif_penyelesaian || '-' },
		disp_informasi() { return this.data_lhp.informasi_lain || '-' },
		disp_catatan() { return this.data_lhp.catatan || '-' },
	},
	methods: {
		async getData() {
			let response = await api.getDisplayDataById(this.doc_type, this.doc_id)
			this.data_lhp = response.data.data
		}
	},
	async mounted() {
		await this.getData()
	},
}
</script>

<style>

</style>