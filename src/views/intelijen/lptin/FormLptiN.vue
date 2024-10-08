<template>
    <div class="wrapper my-form">
        <CForm>
            <div>
                <!-- No ST -->
                <CRow class="mt-0">
                    <CCol sm="12" md="8">
                        <CInput
                            :label="`Nomor ST`"
                            :value.sync="data.nomor_st"
                        />
                    </CCol>
                    <CCol sm="12" md="4">
                        <div class="form-group">
                            <label class="w-100" for="tanggal_st">Tgl. ST</label>
                            <date-picker
                                v-model="data.tanggal_st"
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
                            </date-picker>
                        </div>
                    </CCol>
                </CRow>

                <!-- Tugas -->
                <CRow class="pb-3">
                    <CCol md="12">
                        <CRow>
                            <CCol>
                                <h4>Tugas:</h4>
                            </CCol>
                        </CRow>

                        <CRow v-for="(tugas, index) in data.tugas" :key="index">
                            <CCol md="11">
                                <CTextarea
                                    :value.sync="data.tugas[index]"
                                />	
                            </CCol>
                            <CCol md="1">
                                <CButton 
                                    style="height: calc(1.5em + 0.75rem + 2px);"
                                    class="w-100 d-block" 
                                    color="danger" 
                                    @click="delTask(index)" 
                                >
                                    <CIcon name="cil-trash"/>
                                </CButton>
                            </CCol>
                        </CRow>

                        <CRow>
                            <CCol>
                                <CButton color="primary" @click="addTask">+ Tambah</CButton>
                            </CCol>
                        </CRow>
                    </CCol>
                </CRow>

                <!-- Wilayah -->
                <CRow>
                    <CCol md="12">
                        <MyComboboxLokasi
                            label="Wilayah Penugasan"
                            :value.sync="data.wilayah"
                        />
                    </CCol>
                </CRow>

                <!-- Periode -->
                <CRow>
                    <label class="w-100 pl-3 pt-2 mb-0" for="DatePenugasan">
                        Periode Penugasan
                    </label>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <date-picker 
                                v-model="data.tanggal_mulai"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                            <small class="form-text text-muted w-100">Tanggal Mulai</small>
                        </div>
                    </CCol>
                    <CCol md="4" sm="12">
                        <div class="form-group">
                            <date-picker 
                                v-model="data.tanggal_akhir"
                                format="DD-MM-YYYY" 
                                value-type="format"
                                type="date"
                                class="w-100"
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
                            <small class="form-text text-muted w-100">Tanggal Akhir</small>
                        </div>
                    </CCol>
                </CRow>
            </div>

            <CRow>
                <CCol md="12">
                    <CTextarea
                        label="Uraian"
                        :value.sync="data.uraian"
                        rows="10"
                    />
                </CCol>
            </CRow>

            <CRow>
                <CCol md="12">
                    <CTextarea
                        label="Kesimpulan"
                        :value.sync="data.kesimpulan"
                        rows="5"
                    />
                </CCol>
            </CRow>

            <CRow>
                <CCol md="12">
                    <CTextarea
                        label="Rekomendasi"
                        :value.sync="data.rekomendasi"
                        rows="5"
                    />
                </CCol>
            </CRow>

            <!-- Pembuat -->
            <CRow>
                <CCol md="12">
                    <MySelectPetugas
                        ref="selectPembuat"
                        label="Pelaksana Tugas"
                        :currentUser="true"
                        :nip.sync="data.petugas.pembuat.nip"
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
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

import api from '../../../router/api2.js'
import MyComboboxLokasi from '../../components/ComboboxLokasi.vue'
import MyInputTembusan from '../../components/InputTembusan.vue'
import MySelectEntitas from '../../components/SelectEntitas.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

export default {
    name: 'FormLptiN',
    components: {
        DatePicker,
        MyComboboxLokasi,
        MyInputTembusan,
        MySelectEntitas,
        MySelectPetugas,
    },
    props: {
        state: String,
        doc_type: String,
        document: Object,
    },
    data() {
        return {
            data: JSON.parse(JSON.stringify(this.document)),
        }
    },
    watch: {
        document(val) { this.data = val },
    },
    methods: {
        async saveData() {
            let data = null
            if (this.state == 'insert') {
                data = await api.storeDoc(this.doc_type, this.data)
                this.$emit('update:state', 'edit')
            } else if (this.state == 'edit') {
                data = await api.updateDoc(this.doc_type, this.data.id, this.data)
            }
            this.$emit('save-data', data)		
        },
        addTask() {
            this.data.tugas.push(null)
        },
        delTask(id) {
            this.data.tugas.splice(id,1)
        },
    }
}
</script>
