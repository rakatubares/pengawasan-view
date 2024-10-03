<template>
    <div class="wrapper">
        <CForm>
            <CSelect
                :label="label"
                :options.sync="options"
                :value.sync="selected"
            />
        </CForm>
    </div>
</template>

<script>
export default {
    name: 'SelectDate',
    props: {
        label: {
            type: String,
            default() { return 'Tanggal Dokumen' }
        },
        value: String,
    },
    data() {
        return {
            options: [],
            selected: null,
        }
    },
    watch: {
        value(val) {
            if (!this.options.includes(val)) {
                this.options.push(val)
            }
            this.selected = val
        },
        selected(val) {
            this.$emit('update:value', val)
        }
    },
    methods: {
        generateOptions() {
            // Today
            let date = new Date();
            let d1 = String(date.getDate()).padStart(2, '0');
            let m1 = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let y1 = date.getFullYear();
            let today = d1 + '-' + m1 + '-' + y1;

            // Yesterday
            date.setDate(date.getDate() - 1);
            let d2 = String(date.getDate()).padStart(2, '0');
            let m2 = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let y2 = date.getFullYear();
            let yesterday = d2 + '-' + m2 + '-' + y2;

            // Options
            this.options = [today, yesterday]
        }
    },
    mounted() {
        this.generateOptions()
        if (this.value == null) {
            this.selected = this.options[0]
        }
    }
}
</script>
