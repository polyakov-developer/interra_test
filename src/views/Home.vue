<template>
  <div class="home">
    <Heading>Операции на поле 112</Heading>
    <ListFilter @filter="handleFilter" />
    <ListView :itemsList="preparedOperations" @sort="handleSort" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { RootAction, RootGetters } from "../store";
import ListView from "@/components/ListView.vue";
import ListFilter from "@/components/ListFilter.vue";
import Heading from "@/components/Heading.vue";

export default {
  name: "Home",
  components: {
    ListView,
    ListFilter,
    Heading,
  },
  created() {
    this.getData();
  },
  methods: {
    ...mapActions({
      getData: RootAction.GET_DATA,
    }),
    handleFilter(filter = null) {
      if (this.$route.query.isPlanned === filter) {
        filter = null;
      }

      this.$router.push({
        query: {
          ...this.$route.query,
          isPlanned: filter,
        },
      });
    },
    handleSort(orderBy = null) {
      let orderDirection = "desc";
      if (
        this.$route.query.orderBy === orderBy &&
        this.$route.query.orderDirection === "desc"
      ) {
        orderDirection = "asc";
      }

      this.$router.push({
        query: {
          ...this.$route.query,
          orderBy,
          orderDirection,
        },
      });
    },
  },
  computed: {
    ...mapGetters({
      getSortedOperations: RootGetters.GET_SORTED_OPERATIONS,
    }),
    preparedOperations() {
      return this.getSortedOperations(
        this.$route.query.isPlanned,
        this.$route.query.orderBy,
        this.$route.query.orderDirection
      );
    },
  },
};
</script>
