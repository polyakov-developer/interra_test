<template>
  <table v-if="itemsList && itemsList.length">
    <thead>
      <tr>
        <th
          v-for="({ label, value, orderBy, style }, idx) in tableModel"
          :key="idx"
          @click="changeSort(orderBy)"
          v-bind="style"
        >
          <span
            :class="[
              orderBy == orderedBy ? ['is--active', orderedDirection] : '',
            ]"
          >{{ label }}</span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in itemsList" :key="item.id">
        <ListItem v-for="({ value }, idx) in tableModel" :key="idx" :value="value" :item="item" />
      </tr>
    </tbody>
  </table>
  <p v-else-if="itemsList && itemsList.length < 1" v-text="'Данные загружаются'" />
  <p v-else v-text="'Данные не найдены'" />
</template>

<script>
import ListItem from "@/components/ListItem.vue";

export default {
  name: "ListView",
  props: {
    itemsList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    ListItem,
  },
  created() {
    this.tableModel = [
      {
        label: "Дата",
        value: "preparedDate",
        orderBy: "timestamp",
        style: {
          width: "14%",
        },
      },
      {
        label: "Операция",
        value: "name",
        orderBy: "name",
        style: {
          width: "40%",
        },
      },
      {
        label: "Культура",
        value: "culture",
        orderBy: "culture",
        style: {
          width: "23%",
        },
      },
      {
        label: "Качество",
        value: "preparedAssessment",
        orderBy: "assessment",
        style: {
          width: "23%",
        },
      },
    ];
  },
  methods: {
    changeSort(sortedField = null) {
      this.$emit("sort", sortedField);
    },
  },
  computed: {
    orderedBy() {
      return this.$route.query.orderBy;
    },
    orderedDirection() {
      return this.$route.query.orderDirection;
    },
  },
};
</script>

<style lang="scss">
table {
  border-spacing: 0;
  margin-top: 24px;
  width: 100%;

  th {
    background-color: var(--secondary);
    font-weight: 500;
    padding: 12px 9px 15px 9px;
    text-align: left;

    span {
      cursor: pointer;
      position: relative;

      &::after {
        content: "▼";
        color: #a7a9ac;
        display: inline-block;
        margin-left: 4px;
      }

      &.desc::after {
        content: "▼";
      }

      &.asc::after {
        content: "▲";
      }

      &.is--active {
        &::after {
          color: var(--info);
        }
      }
    }
  }
}
</style>
