<script>
export default {
    name: 'AppHeader',
    methods: {
        createImagePath(img_name) {
            const url = new URL(`../assets/${img_name}`, import.meta.url);
            return url.href
        }
    }
}
</script>

<template>
    <header class="d-flex justify-content-evenly align-items-center py-3">
        <img :src="createImagePath('d20.png')" alt="d20">
        <h1>Testing Boardgames</h1>
        <img :src="createImagePath('d20.png')" alt="d20">
    </header>

</template>

<style scoped>
header {
    height: 100px;
    color: #f9f8f4;
    background-color: #2f3132;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    bottom: 100px;
}

img {
    height: 100%;
}
</style>
