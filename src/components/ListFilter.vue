<template>
  <div class="filter">
    <button
      :class="[{ 'is--active': isPlanned === '1' }, 'button--type--filter']"
      v-text="'Запланированные операции'"
      @click="changeFilter('1')"
    />
    <button
      :class="[{ 'is--active': isPlanned === '0' }, 'button--type--filter']"
      v-text="'Выполненные операции'"
      @click="changeFilter('0')"
    />
  </div>
</template>

<script>
export default {
  name: "ListFilter",
  methods: {
    changeFilter(flag) {
      this.$emit("filter", flag);
    },
  },
  computed: {
    isPlanned() {
      return this.$route.query.isPlanned;
    },
  },
};
</script>

<style lang="scss" scoped>
.button--type--filter {
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-weight: 500;
  margin-right: 18px;
  outline: none;
  padding: 3px 0;
  text-transform: uppercase;
  text-decoration: none;

  &.is--active,
  &.router-link-exact-active {
    color: var(--info);
  }
}
</style>
