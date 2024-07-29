<template>
    <div class="wrapper my-form">
        <CForm class="pt-3">
            <!-- Pengendali Operasi -->
            <CRow class="pb-3">
                <CCol sm="12">
                    <CRow>
                        <CCol>
                            <h4>Pengendali Operasi:</h4>
                        </CCol>
                    </CRow>

                    <CRow v-for="(petugas, index) in data.petugas.pengendali" :key="index" :id="`pengendali-${index}`">
                        <CCol md="12">
                            <MySelectPetugas
                                :ref="`selectPengendali${index}`"
                                label="Nama Petugas"
                                :nip.sync="data.petugas.pengendali[index]['nip']"
                            >
                                <template #button>
                                    <div class="form-group">
                                        <label for="DelPengendali">&nbsp;</label>
                                        <CButton 
                                            style="height: calc(1.5em + 0.75rem + 2px);"
                                            class="w-100 d-block" 
                                            color="danger" 
                                            @click="delOfficer('pengendali', index)" 
                                        >
                                            <CIcon name="cil-trash"/>
                                        </CButton>
                                    </div>
                                </template>
                            </MySelectPetugas>
                        </CCol>
                    </CRow>
                    
                    <CRow>
                        <CCol>
                            <CButton color="primary" @click="addOfficer('pengendali')">+ Tambah</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <!-- Tim Operasi -->
            <CRow class="sep pb-3">
                <CCol sm="12">
                    <CRow>
                        <CCol>
                            <h4>Tim Operasi:</h4>
                        </CCol>
                    </CRow>

                    <CRow v-for="(petugas, index) in data.petugas.tim" :key="index" :id="`tim-${index}`">
                        <CCol md="12">
                            <MySelectPetugas
                                :ref="`selectTim${index}`"
                                label="Nama Petugas"
                                :nip.sync="data.petugas.tim[index]['nip']"
                            >
                                <template #button>
                                    <div class="form-group">
                                        <label for="DelTim">&nbsp;</label>
                                        <CButton 
                                            style="height: calc(1.5em + 0.75rem + 2px);"
                                            class="w-100 d-block" 
                                            color="danger" 
                                            @click="delOfficer('tim', index)" 
                                        >
                                            <CIcon name="cil-trash"/>
                                        </CButton>
                                    </div>
                                </template>
                            </MySelectPetugas>
                        </CCol>
                    </CRow>
                    
                    <CRow>
                        <CCol>
                            <CButton color="primary" @click="addOfficer('tim')">+ Tambah</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <!-- Tugas -->
            <CRow class="sep pb-3">
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

            <CRow class="sep">
                <CCol md="12">
                    <MyComboboxLokasi
                        label="Wilayah Penugasan"
                        :value.sync="data.wilayah"
                    />
                </CCol>
            </CRow>
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
            <CRow>
                <label class="w-100 pl-3 pt-2 mb-0" for="RadioSifat">Sifat Intelijen</label>
                <CInputRadioGroup
                    id="RadioSifat"
                    class="col-sm-9"
                    :options="['tertutup', 'terbuka']"
                    :checked.sync="data.sifat"
                    :inline="true"
                />
            </CRow>
            <CRow class="pt-3">
                <label class="w-100 pl-3 pt-2 mb-0" for="RadioPakaian">Pakaian</label>
                <CInputRadioGroup
                    id="RadioPakaian"
                    class="col-sm-9"
                    :options="['Non-PDH', 'PDH']"
                    :checked.sync="data.pakaian"
                    :inline="true"
                />
            </CRow>

            <!-- Pejabat -->
            <CRow class="sep mt-4">
                <CCol>
                    <h4>Penerbit:</h4>
                </CCol>
            </CRow>
            <CRow>
                <CCol md="12">
                    <MySelectPejabat
                        :state.sync="state"
                        :label="{'jabatan': 'Jabatan Penerbit', 'nama': 'Nama Pejabat Penerbit'}"
                        :default_jabatan.sync="default_pejabat"
                        :jabatan.sync="data.petugas.penerbit.kode_jabatan"
                        :tipe_ttd.sync="data.petugas.penerbit.tipe_ttd"
                        :nip.sync="data.petugas.penerbit.nip"
                    />
                </CCol>
            </CRow>

            <!-- Tembusan -->
            <CRow class="sep pb-3">
                <CCol md="8">
                    <label for="Tembusan">Tembusan</label>
                    <CRow>
                        <CCol>
                            <div class="input-container" v-for="(val,id) in data.tembusan" :key="id">
                                <MyComboboxTembusan
                                    id="Tembusan"
                                    :value.sync="data.tembusan[id]"
                                    :except.sync="data.tembusan"
                                    @delete-data="delCc(id)"
                                />
                            </div>
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol>
                            <CButton color="primary" @click="addCc">+ Tambah</CButton>
                        </CCol>
                    </CRow>
                </CCol>
            </CRow>

            <!-- Button simpan -->
            <CRow class="sep">
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
import MyComboboxTembusan from '../../components/ComboboxTembusan.vue'
import MySelectPejabat from '../../components/SelectPejabat.vue'
import MySelectPetugas from '../../components/SelectPetugas.vue'

export default {
    name: 'FormSti',
    components: {
        DatePicker,
        MyComboboxLokasi,
        MyComboboxTembusan,
        MySelectPejabat,
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
            default_pejabat: 'bd.0501',
            labelIcon: {
                labelOn: '\u2713',
                labelOff: '\u2715'
            },
        }
    },
    watch: {
        document(val) { 
            this.data = val 
            this.$nextTick(() => {
                this.renderOfficers()
            })
        },
    },
    methods: {
        renderOfficers() {
            for (let index = 0; index < this.data.petugas.pengendali.length; index++) {
                const refName = `selectPengendali${index}`
                const refs = this.$refs[refName]
                refs[0].changeOfficer(this.data.petugas.pengendali[index]['nip'], true)
            }

            for (let index = 0; index < this.data.petugas.tim.length; index++) {
                const refName = `selectTim${index}`
                const refs = this.$refs[refName]
                refs[0].changeOfficer(this.data.petugas.tim[index]['nip'], true)
            }
        },
        async saveData() {
            let data = null
            if (this.state == 'insert') {
                data = await api.storeDoc(this.doc_type, this.data)
                this.renderOfficers()
                this.$emit('update:state', 'edit')
            } else if (this.state == 'edit') {
                data = await api.updateDoc(this.doc_type, this.data.id, this.data)
            }
            this.$emit('save-data', data)
        },
        addOfficer(jenis) {
            this.data.petugas[jenis].push({'user_id': null})
        },
        delOfficer(jenis, id) {
            this.data.petugas[jenis].splice(id,1)
            this.renderOfficers()
        },
        addTask() {
            this.data.tugas.push(null)
        },
        delTask(id) {
            this.data.tugas.splice(id,1)
        },
        addCc() {
            this.data.tembusan.push(null)
        },
        delCc(id) {
            this.data.tembusan.splice(id,1)
        },
    },
}
</script>
