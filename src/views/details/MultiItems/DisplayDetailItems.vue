<template>
  <div class="wrapper">

	  <!-- Button tambah data -->
		<CRow 
			v-if="(state==='insert') || (state==='edit')"
			class="mt-3"
		>
			<CCol md="3" sm="12">
				<CButton 
					block 
					color="primary"
					@click="showModalNewDetail()"	
				>
					<CIcon name="cil-plus"/>
					Tambah objek
				</CButton>
			</CCol>
		</CRow>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>