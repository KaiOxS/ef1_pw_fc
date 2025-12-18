<template>
  <div>
    <img :src="imagenUrl" alt="No se puede visualizar la imagen" />
    <p>{{ texto }}</p>
  </div>
</template>

<script>
export default {
  props: ["imagenUrl", "texto"],
};
</script>

<style>
img {
  width: 250px;
  height: 250px;
}
</style>