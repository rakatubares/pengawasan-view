<template>
    <div class="wrapper display-lpti">
        <CRow>
            <CCol class="mt-3 mx-2" md="12">
                <CRow>
                    <CCol class="pb-1">
                        <h4>{{ disp_no_lpti }}</h4>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol class="pt-1 pb-3">
                        <h5>{{ disp_tgl_lpti }}</h5>
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>No ST</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_st }}
                    </CCol>
                </CRow>
				<CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Wilayah Penugasan</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_wilayah }}
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Tanggal Mulai</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_tgl_mulai }}
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Tanggal Akhir</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_tgl_akhir }}
                    </CCol>
                </CRow>

                <!-- Pengumpulan -->
                <div class="sep">
                    <CRow class="mt-2">
                        <CCol>
                            <h4><b>Kegiatan Pengumpulan dan Penilaian Informasi</b></h4>
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Tempat Pengumpulan</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_tempat_pengumpulan }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Sumber Informasi</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_sumber_informasi }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Metode Pengumpulan</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_metode_pengumpulan }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Ikhtisar Informasi</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_ikhtisar_informasi }}
                        </CCol>
                    </CRow>
                </div>

                <!-- Analisis -->
                <div class="sep">
                    <CRow class="mt-2">
                        <CCol>
                            <h4><b>Kegiatan Analisis Intelijen</b></h4>
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Dok. Pabean</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_dok_pabean }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Metode Analisis Intelijen</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_metode_analisis }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Ikhtisar Analisis</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_ikhtisar_analisis }}
                        </CCol>
                    </CRow>
                </div>

                <!-- Pelanggaran -->
                <div class="sep">
                    <CRow class="mt-2">
                        <CCol>
                            <h4><b>Indikasi Pelanggaran</b></h4>
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
                            <b>Modus Pelanggaran</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_modus_pelanggaran }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Perkiraan Tempat Pelanggaran</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_tempat_pelanggaran }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Perkiraan Waktu Pelanggaran</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_waktu_pelanggaran }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Perkiraan Pelaku Pelanggaran</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_pelaku }}
                        </CCol>
                    </CRow>
                </div>

                <!-- Dokumentasi -->
                <div class="sep">
                    <CRow class="mt-2">
                        <CCol>
                            <h4><b>Dokumentasi Kegiatan Intelijen</b></h4>
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Foto</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_foto }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Rekaman Audio</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_audio }}
                        </CCol>
                    </CRow>
                    <CRow class="mb-1">
                        <CCol md="3" class="py-1">
                            <b>Rekaman Video</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_video }}
                        </CCol>
                    </CRow>
                </div>

                <!-- Informasi lain -->
                <div class="sep">
                    <CRow class="mt-2 mb-1">
                        <CCol md="3" class="py-1">
                            <b>Informasi Lainnya</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_informasi_lain }}
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
                            <b>Rekomendasi</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_rekomendasi }}
                        </CCol>
                    </CRow>
                </div>

                <MyDisplayPegawai
                    title="Ketua Tim"
                    :data.sync="document.petugas.pembuat"
                />

                <div class="sep mt-4">
                    <CRow class="mb-1 mt-2">
                        <CCol md="3" class="py-1">
                            <b>Tembusan</b>
                        </CCol>
                        <CCol md="9" class="py-1" v-if="data_tembusan != null">
                            <div v-if="data_tembusan.length > 0">
                                <p class="mb-1" v-for="(txt,id) in data_tembusan" :key="id">- {{txt}}</p>
                            </div>
                            <div v-else>
                                -
                            </div>
                        </CCol>
                        <CCol md="9" class="py-1" v-else>
                            -
                        </CCol>
                    </CRow>
                </div>

            </CCol>
        </CRow>
    </div>
</template>

<script>
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'

export default {
    name: 'DisplayLpti',
    components: {
        MyDisplayPegawai,
    },
    props: {
        doc_type: String,
        document: Object,
    },
    computed: {
        disp_no_lpti() { return this.document.no_dok_lengkap || '-' },
        disp_tgl_lpti() { return this.document.tanggal_dokumen || '-' },
        disp_st() { 
            let st = '-'
            if (
                (this.document.nomor_st != null) &&
                (this.document.tanggal_st != null)
            ) {
                let no_st = this.document.nomor_st || '-'
                let tgl_st = this.document.tanggal_st || '-'
                st = `${no_st} tanggal ${tgl_st}`
            }
            return st
        },
		disp_wilayah() { return this.document.wilayah || '-' },
		disp_tgl_mulai() { return this.document.tanggal_mulai || '-' },
		disp_tgl_akhir() { return this.document.tanggal_akhir || '-' },
        disp_tempat_pengumpulan() { return this.document.tempat_pengumpulan || '-'},
        disp_sumber_informasi() { return this.document.sumber_informasi || '-'},
        disp_metode_pengumpulan() { return this.document.metode_pengumpulan || '-'},
        disp_ikhtisar_informasi() { return this.document.ikhtisar_informasi || '-'},
        disp_dok_pabean() {
            let dok = ''

            if (this.document.jenis_dok_pabean) {
                dok = this.document.jenis_dok_pabean
            }

            if (this.document.nomor_dok_pabean) {
                dok = `${dok} ${this.document.nomor_dok_pabean}`.trim()
            }

            if (this.document.tanggal_dok_pabean) {
                dok = `${dok} tanggal ${this.document.tanggal_dok_pabean}`.trim()
            }

            return dok
        },
        disp_metode_analisis() { return this.document.metode_analisis || '-'},
        disp_ikhtisar_analisis() { return this.document.ikhtisar_analisis || '-'},
        disp_jenis_pelanggaran() { return this.document.jenis_pelanggaran || '-'},
        disp_modus_pelanggaran() { return this.document.modus_pelanggaran || '-'},
        disp_tempat_pelanggaran() { return this.document.tempat_pelanggaran || '-'},
        disp_waktu_pelanggaran() { return this.document.waktu_pelanggaran || '-'},
        disp_pelaku() { return this.document.pelaku.data.nama || '-' },
        disp_foto() { return this.document.dokumentasi_foto || '-'},
        disp_audio() { return this.document.dokumentasi_audio || '-'},
        disp_video() { return this.document.dokumentasi_video || '-'},
        disp_informasi_lain() { return this.document.informasi_lain || '-'},
        disp_kesimpulan() { return this.document.kesimpulan || '-'},
        disp_rekomendasi() { return this.document.rekomendasi || '-'},
        data_tembusan() { return  this.document.tembusan || null },
    },
}
</script>
