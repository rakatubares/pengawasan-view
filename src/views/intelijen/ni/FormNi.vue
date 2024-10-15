<template>
    <div class="wrapper my-form">
        <CForm class="pt-3">
            <CRow>
                <CCol md="12">
                    <MySearchDocument
                        ref="SearchLkai"
                        :doc_type="kode_lkai"
                        :label="label_lkai"
                        :description="`Nomor ${label_lkai} sebagai sumber penerbitan ${label_ni}`"
                        :value.sync="data.lkai_id"
                        :exceptions.sync="saved_lkai"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol md="4" sm="12">
                    <CSelect
                        label="Sifat"
                        :description="`Kategori sifat ${label_ni}`"
                        :options="sifat_ni_options"
                        :value.sync="data.sifat"
                    />
                </CCol>
                <CCol md="4" sm="12">
                    <CSelect
                        label="Klasifikasi"
                        :description="`Kategori klasifikasi ${label_ni}`"
                        :options="klasifikasi_ni_options"
                        :value.sync="data.klasifikasi"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol sm="12">
                    <MyComboboxJabatan
                        :label="`Penerima ${label_ni}`"
                        :description="`Tujuan penerima ${label_ni}`"
                        :value.sync="data.tujuan"
                        :default_jabatan="default_tujuan"
                    />
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <CTextarea
                        label="Uraian"
                        :value.sync="data.uraian"
                        rows="10"
                    />
                </CCol>
            </CRow>

            <!-- Pejabat -->
            <CRow class="sep">
                <CCol md="12">
                    <MySelectPejabat
                        ref="selectPejabat"
                        :state.sync="state"
                        :label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Penerbit'}"
                        :default_jabatan.sync="default_penerbit"
                        :jabatan.sync="data.petugas.penerbit.kode_jabatan"
                        :tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
                        :nip.sync="data.petugas.penerbit.nip"
                    />
                </CCol>
            </CRow>

            <!-- Tembusan -->
            <CRow class="sep">
                <CCol md="8">
                    <MyInputTembusan
                        :value.sync="data.tembusan"
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
        </CForm>
    </div>
</template>

<script>
import api from '../../../router/api2.js'
import store from '../../../store'
import validators from '../../../helpers/validator'
import DefaultNi from './DefaultNi'
import MyComboboxJabatan from '../../components/ComboboxJabatan.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySearchDocument from '../../components/SearchDocument.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'

export default {
    name: 'FormNi',
    components: {
        MyComboboxJabatan,
        MyInputTembusan,
        MySearchDocument,
        MySelectPejabat,
    },
    props: {
        state: String,
        doc_type: String,
        document: Object,
        kode_lkai: String,
        label_ni: String,
        label_lkai: String,
    },
    data() {
        return {
            data: JSON.parse(JSON.stringify(this.document)),
            sifat_ni_options: JSON.parse(JSON.stringify(store.getters.sifatSurat)),
            klasifikasi_ni_options: JSON.parse(JSON.stringify(store.getters.klasifikasiSurat)),
            default_tujuan: DefaultNi.data.tujuan,
            default_penerbit: 'bd.05',
            validations: {
                tujuan: false,
            }
        }
    },
    computed: {
        saved_lkai: {
            get() { return this.data.lkai_id },
            set(val) { this.data.lkai_id = val },
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    methods: {
        async mountData() {
            if (this.data.lkai_id) {
                await this.$refs.SearchLkai.getDocument(this.data.lkai_id)	
            }
        },
        async saveData() {
            if (this.state == 'insert') {
                if (this.doc_type == 'ni') {
                    let data = await api.storeDoc(this.doc_type, this.data)
                    this.$emit('save-data', data)
                } else {
                    this.$emit('insert-data', this.data)
                }
                this.$emit('update:state', 'edit')
            } else if (this.state == 'edit') {
                if (this.doc_type == 'ni') {
                    let data = await api.updateDoc(this.doc_type, this.data.id, this.data)
                    this.$emit('save-data', data)
                } else {
                    this.$emit('update-data', this.data)
                }
            }
        },
        validatorRequired(field, val) { 
            let validation = validators.required(val) 
            this.validations[field] = validation
            return validation
        },
    },
}
</script>
