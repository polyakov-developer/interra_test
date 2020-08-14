import Vue from "vue";
import Vuex from "vuex";
import Operation, { OperationType, Assessment } from "@/models/Operation";
import FieldService from "../FieldService";
import locale from "@/locales/intterra-ru-RU.json";
import moment from "moment";
import { orderBy, isNil } from "lodash";

Vue.use(Vuex);

interface Locale {
  [key: string]: string;
}

interface RootStore {
  operationsList: Array<Operation>;
}

enum RootMutation {
  SAVE_DATA = "SAVE_DATA",
}

export enum RootGetters {
  GET_SORTED_OPERATIONS = "GET_SORTED_OPERATIONS",
}

export enum RootAction {
  GET_DATA = "GET_DATA",
}

const i18n: Locale = { ...locale };

export default new Vuex.Store<RootStore>({
  state: {
    operationsList: [],
  },
  getters: {
    [RootGetters.GET_SORTED_OPERATIONS]: ({ operationsList }) => (
      isPlanned: string | null = null,
      sortedField = "timestamp",
      sortedDirection: any = "asc"
    ): Array<Operation> => {
      const preparedOperationsList = operationsList.map((operation) => {
        const operationName = OperationType[operation.type];
        const preparedDate = moment(operation.date)
          .locale("ru-RU")
          .format("D MMM YYYY")
          .replace(".", "");
        const timestamp = moment(operation.date).unix();
        const culture = "Пшеница озимая";
        const preparedAssessment = isNil(operation.assessment)
          ? ""
          : Assessment[operation.assessment];

        return {
          ...operation,
          name: i18n[operationName],
          preparedDate,
          timestamp,
          icon: "/img/culture.svg",
          culture,
          preparedAssessment: i18n[preparedAssessment] || "Нет оценки",
        };
      });

      if (isPlanned) {
        const filterFunctions: {
          [key: string]: (operation: Operation) => {};
        } = {
          "0": (operation: Operation) => moment().isAfter(operation.date),
          "1": (operation: Operation) => moment().isBefore(operation.date),
        };

        const filteredOperationsList = preparedOperationsList.filter(
          filterFunctions[isPlanned]
        );
        return orderBy(filteredOperationsList, sortedField, sortedDirection);
      }

      return orderBy(preparedOperationsList, sortedField, sortedDirection);
    },
  },
  mutations: {
    [RootMutation.SAVE_DATA](state, payload: Array<Operation>): void {
      state.operationsList = payload;
    },
  },
  actions: {
    [RootAction.GET_DATA]: async ({ commit }) => {
      const fieldService = new FieldService();
      const data = await fieldService.getOperations();
      commit(RootMutation.SAVE_DATA, data);
    },
  },
  modules: {},
});
