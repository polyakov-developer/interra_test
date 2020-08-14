<template functional>
  <img :src="props.imageSrc" alt />
</template>

<script>
export default {
  name: "BaseIcon",
  props: {
    imageSrc: {
      type: String,
      required: true,
    },
  },
};
</script>
