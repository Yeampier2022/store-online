<template>
    <div class="ctn">
        <h1>Tienda Online</h1>
        <img :src="imgUrl" />
    </div>
</template>
<style scoped>
.ctn {
    display: grid;
    place-content: center;
    place-items: center;
    width: 100%;
    height: 100%;

}
h1 {
    padding: 2vw 0;
}
</style>
<script setup>
const imgUrl = "https://conviertemas.com/wp-content/uploads/2022/06/Tienda-online-CMAS-3.png"
</script>