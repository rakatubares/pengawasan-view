<template>
	<div class="wrapper">
		<MyModalDoc
			title="Data BA Pemeriksaan"
			:state.sync="modal_state"
			@close-modal="closeModal"
		>
			<template #tab-uraian>
				<MyFormRiksa
					v-if="['insert','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_id.sync="doc_id"
				/>
				<MyDisplayRiksa
					v-else-if="modal_state == 'show'"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-object>
				<MyFormDetail 
					v-if="modal_state == 'edit'"
					:available_details="['sarkut', 'barang', 'bangunan']"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
				<MyDisplayDetail 
					v-else-if="modal_state == 'show'"
					:doc_type="doc_type"
					:doc_id.sync="doc_id"
				/>
			</template>
			<template #tab-pdf>
				<MyDisplayPdf 
					v-if="['show','edit'].includes(modal_state)"
					:state.sync="modal_state"
					:doc_type="doc_type" 
					:doc_id.sync="doc_id"
				/>
			</template>
		</MyModalDoc>
	</div>
</template>

<script>
import MyDisplayDetail from '../../details/displays/DisplayDetail.vue'
import MyDisplayPdf from '../../pdf/DisplayPdf.vue'
import MyDisplayRiksa from './DisplayRiksa.vue'
import MyFormDetail from '../../details/Options/FormDetail.vue'
import MyFormRiksa from './FormRiksa.vue'
import MyModalDoc from '../../components/ModalDoc2.vue'

export default {
	name: 'ModalRiksa',
	components: {
		MyDisplayDetail,
		MyDisplayPdf,
		MyDisplayRiksa,
		MyFormDetail,
		MyFormRiksa,
		MyModalDoc,
	},
	props: {
		state: String,
		id: Number
	},
	data() {
		return {
			doc_type: 'riksa',
			doc_id: this.id,
			modal_state: this.state
		}
	},
	methods: {
		closeModal() {
			this.$emit('close-modal')
		},
	},
	watch: {
		modal_state: function(val) {
			this.$emit('update:state', val)
		}
	},
}
</script>

<style>
</style>