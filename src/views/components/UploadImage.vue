<template>
	<div class="row upload-image">
		<CCol>
			<label class="w-100">Foto Barang</label>
			<div class="image-container" v-for="(img, id) in previewImage" :key="id">
				<img :src="previewImage[id]['content']" class="image" />
				<div class="overlay" @click="deleteImage(id)">
					<CIcon class="btn-text" name="cil-trash" :height="25"/>
				</div>
			</div>
			<input type="file" ref="file" accept="image/jpeg,image/jpg,image/png" style="display: none" @change=uploadImage>
			<div class="btn-file" @click="$refs.file.click()">
				<CIcon class="btn-text" name="cil-image-plus" :height="25"/>
			</div>
		</CCol>
	</div>
</template>

<script>
export default {
	name: 'UploadImage',
	props: {
		images: Array
	},
	data(){
		return{
			previewImage: this.images
		}
	},
	methods:{
		uploadImage(e){
			const image = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(image);
			reader.onload = e =>{
				this.previewImage.push({content: e.target.result})
				this.$emit('update:images', this.previewImage)
			};
		},
		deleteImage(id) {
			this.previewImage.splice(id,1)
			this.$emit('update:images', this.previewImage)
		}
	},
}
</script>

<style>
.upload-image .btn-file {
	background-color: rgb(175, 175, 175);
	height: 75px;
	width: 75px;
	margin: 0.5rem;
	border: 1px rgb(175, 175, 175) solid;
	border-radius: 15%;
	transition: .5s ease;
	float: left;
	justify-content: center;
	display: flex;
	cursor: pointer;
}

.upload-image .btn-file:hover {
	background-color: rgb(150, 150, 150);
}

.upload-image .btn-text {
	color: azure;
	font-size: 20px;
	margin: 25px;
}

.upload-image .image-container {
	float: left;
	margin: 0.5rem;
	border: 1px rgb(175, 175, 175) solid;
	border-radius: 15%;
}

.upload-image .image {
	float: left;
	width: 75px;
	height: 75px;
	transition: .5s ease;
	border-radius: 15%;
}

.upload-image .overlay {
	position: absolute;
	float: left;
	transition: .5s ease;
	opacity: 0;
	height: 75px;
	width: 75px;
	background-color: rgb(100, 100, 100);
	border-radius: 15%;
	cursor: pointer;
}

.upload-image .image-container:hover .image {
	opacity: 0.2;
}

.upload-image .image-container:hover .overlay {
	opacity: 0.6;
}
</style>