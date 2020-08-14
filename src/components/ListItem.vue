<template>
  <td>
    <span :class="[value, additionalClass]">
      <component
        v-if="additionalComponent"
        :is="additionalComponent"
        v-bind="additionalComponentProps"
      />
      {{ item[value] }}
    </span>
  </td>
</template>

<script>
import { isNull } from "lodash";
import BaseIcon from "@/components/BaseIcon";
import BaseBadge from "@/components/BaseBadge";

export default {
  name: "ListItem",
  components: {
    BaseIcon,
    BaseBadge,
  },
  props: {
    item: {
      type: Object,
    },
    value: {
      type: String,
      required: true,
    },
  },
  computed: {
    additionalClass() {
      return isNull(this.item.assessment) ? "is--default" : null;
    },
    additionalComponent() {
      switch (this.value) {
        case "culture":
          return BaseIcon;
        case "preparedAssessment":
          return BaseBadge;
        default:
          return null;
      }
    },
    additionalComponentProps() {
      switch (this.value) {
        case "culture":
          return { imageSrc: this.item.icon };
        case "preparedAssessment":
          return { status: this.item.assessment };
        default:
          return {};
      }
    },
  },
};
</script>

<style lang="scss" scoped>
td {
  border-bottom: 1px solid var(--secondary);
  color: var(--primary);
  padding: 16px 9px 20px 9px;
  text-align: left;

  .preparedDate {
    font-weight: 500;
    opacity: 0.8;
    text-transform: uppercase;
  }

  .name {
    font-size: 13px;
  }

  .culture {
    align-items: center;
    display: flex;

    img {
      margin-right: 10px;
      width: 29px;
    }
  }

  .preparedAssessment {
    align-items: center;
    display: flex;

    .badge {
      margin-right: 10px;
    }

    &.is {
      &--success {
        .badge {
          background-color: var(--success);
        }
      }
      &--warning {
        .badge {
          background-color: var(--warning);
        }
      }
      &--error {
        .badge {
          background-color: var(--error);
        }
      }
      &--default {
        .badge {
          background-color: var(--secondary);
        }

        color: rgba(51, 51, 51, 0.7);
      }
    }
  }
}
</style>
