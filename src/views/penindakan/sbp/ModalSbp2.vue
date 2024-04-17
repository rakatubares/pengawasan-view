<template>
	<div class="wrapper">
		<MyModalPenindakan
			ref="ModalPenindakan"
			:title="`Data SBP`"
			:state.sync="local_state"
			:doc_type="doc_type"
			:doc_id.sync="id"
			@close-modal="closeModal"
		>
			<template #uraian>
				<MyDisplaySbp 
					v-if="local_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="id"
				/>
				<MyFormSbp 
					v-else-if="['insert','edit'].includes(local_state)"
					:state.sync="local_state"
					:doc_type="doc_type"
					:tipe_surat="tipe_surat"
					:doc_id.sync="doc_id"
					@save-data="emitUpdateData"
				/>
			</template>
		</MyModalPenindakan>
	</div>
</template>

<script>
import MyDisplaySbp from './DisplaySbp.vue'
import MyFormSbp from './FormSbp.vue'
import MyModalPenindakan from '../../components/ModalPenindakan.vue'

export default {
	name: 'ModalSbp',
	components: {
		MyDisplaySbp,
		MyFormSbp,
		MyModalPenindakan,
	},
	props: {
		state: String,
		doc_type: String,
		tipe_surat: String,
		id: Number,
	},
	data() {
		return {
			local_state: this.state,
			doc_id: this.id,
		}
	},
	watch: {
		state(val) {
			this.local_state = val
		},
		local_state(val) {
			this.$emit('update:state', val)
		},
		id(val) {
			this.doc_id = val
		},
		doc_id(val) {
			this.$emit('update:id', val)
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
		emitUpdateData(penindakan) {
			this.$refs.ModalPenindakan.setPenindakan(penindakan)
		}
	},
}
</script>

<style>

</style>