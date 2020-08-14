<template>
  <div class="badge" :class="badgeColor" />
</template>

<script>
import { BaseBadgeType } from "./types";

export default {
  name: "BaseBadge",
  props: {
    status: {
      type: Number,
      default: null,
      validator: (type) =>
        type === null || Object.values(BaseBadgeType).includes(type),
    },
  },
  computed: {
    badgeColor() {
      return BaseBadgeType[this.status]
        ? BaseBadgeType[this.status].toLowerCase()
        : "default";
    },
  },
};
</script>

<style lang="scss" scoped>
.badge {
  border-radius: 5px;
  height: 10px;
  width: 20px;

  &.warning {
  }
}
</style>
