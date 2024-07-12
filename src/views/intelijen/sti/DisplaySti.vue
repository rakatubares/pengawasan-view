<template>
    <div class="wrapper display-sti">
        <CRow>
            <CCol class="mt-3 mx-2" md="12">
                <CRow>
                    <CCol class="pb-1">
                        <h4>{{ disp_no_sti }}</h4>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol class="pt-1 pb-3">
                        <h5>{{ disp_tgl_sti }}</h5>
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Tugas</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        <div 
                            v-for="(tugas, idx_tugas) in document.tugas"
                            :key="`tugas-${idx_tugas}`"
                        >
                            {{ `${idx_tugas+1}. ${tugas}` }}
                        </div>
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
                        <b>Periode Penugasan</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_periode }}
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Sifat Intelijen</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_sifat }}
                    </CCol>
                </CRow>
                <CRow class="mb-1">
                    <CCol md="3" class="py-1">
                        <b>Pakaian</b>
                    </CCol>
                    <CCol md="9" class="py-1">
                        {{ disp_pakaian }}
                    </CCol>
                </CRow>

                <MyDisplayPegawai
                    v-for="(pengendali, idx_pengendali) in document.petugas.pengendali"
                    title="Pengendali Operasi"
                    :data="pengendali"
                    :key="`pengendali-${idx_pengendali}`"
                />
                <MyDisplayPegawai
                    v-for="(tim, idx_tim) in document.petugas.tim"
                    title="Tim Operasi"
                    :data="tim"
                    :key="`tim-${idx_tim}`"
                />
                <MyDisplayPejabat
                    title="Penerbit"
                    :data.sync="document.petugas.penerbit"
                />
            </CCol>
        </CRow>
    </div>
</template>

<script>
import converters from '../../../helpers/converter'
import MyDisplayPegawai from '../../components/DisplayPegawai.vue'
import MyDisplayPejabat from '../../components/DisplayPejabat.vue'

export default {
    name: 'DisplaySti',
    components: {
        MyDisplayPegawai,
        MyDisplayPejabat,
    },
    props: {
        doc_type: String,
        document: Object,
    },
    computed: {
        disp_no_sti() { return this.document.no_dok_lengkap || '-' },
        disp_tgl_sti() { return this.document.tanggal_dokumen || '-' },
        disp_wilayah() { return this.document.wilayah || '-' },
        disp_periode() { 
            return converters.dateRange(this.document.tanggal_mulai, this.document.tanggal_akhir) 
        },
        disp_sifat() { return this.document.sifat || '-' },
        disp_pakaian() { return this.document.pakaian || '-' },
    }
}
</script>