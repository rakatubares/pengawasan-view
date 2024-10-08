<template>
    <div class="wrapper">
        <CRow>
            <CCol class="mt-3 mx-2" md="12">
                <CRow>
                    <CCol class="pb-1">
                        <h4>{{ disp_no_lptin }}</h4>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol class="pt-1 pb-3">
                        <h5>{{ disp_tgl_lptin }}</h5>
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

                <div class="sep">
                    <CRow class="mt-2 mb-1">
                        <CCol md="3" class="py-1">
                            <b>Uraian</b>
                        </CCol>
                        <CCol md="9" class="py-1">
                            {{ disp_uraian }}
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
                    title="Pelaksana Tugas"
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
    name: 'DisplayLptiN',
    components: {
        MyDisplayPegawai,
    },
    props: {
        doc_type: String,
        document: Object,
    },
    computed: {
        disp_no_lptin() { return this.document.no_dok_lengkap || '-' },
        disp_tgl_lptin() { return this.document.tanggal_dokumen || '-' },
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
        disp_uraian() { return this.document.uraian || '-'},
        disp_kesimpulan() { return this.document.kesimpulan || '-'},
        disp_rekomendasi() { return this.document.rekomendasi || '-'},
        data_tembusan() { return  this.document.tembusan || null },
    }
}
</script>
