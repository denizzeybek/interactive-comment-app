import { ref } from 'vue';
import { useRToast } from '@/composables/useRToast';

export const useTable = () => {
  const tagList = ref<ITags[]>([]);
  const hasError = ref<boolean>(false);
  const whereKey = ref<string | null>();
  const filteredInfo = ref();
  const sortedInfo = ref<any>({
    field: 'id',
    order: 'ascend',
  });
  const updateKey = ref(0);
  const loading = ref(false);
  const pageSize = ref(5);
  const defaultPayload = ref({
    skip: 0,
    take: pageSize.value,
    orderBy: {
      // createdAt: 'desc'
    },
    where: {} as Record<string, any>,
  });
  const payload = ref({ ...defaultPayload.value });

  const toast = useRToast();
  const updateInfo = (prop: string, e: any) => {
    if (prop === 'filteredInfo') {
      filteredInfo.value = e;
    } else if (prop === 'sortedInfo') {
      sortedInfo.value = e;
    }
  };
  const focus = (open: boolean) => {
    setTimeout(() => {
      const filterSearchRef = document.getElementById('customSearchRef');
      if (filterSearchRef && open) {
        filterSearchRef.focus();
      }
    }, 100);
  };

  const resetPayload = () => {
    new Promise((resolve) => {
      setTimeout(() => {
        payload.value = { ...defaultPayload.value };
        resolve(true);
      }, 100);
    });
  };

  const resetAll = () => {
    filteredInfo.value = null;
    sortedInfo.value = null;
    payload.value = defaultPayload.value;
    tagList.value = [];
    payload.value.where = {};
    delete filteredInfo.value;
  };

  const addFormDataToPayload = (formData: formDataType) => {
    // hint: payload.where filtrelenirken name'e göre filtreleniyor
    for (const key in formData) {
      const value = formData[key].value;
      const name = formData[key].name;
      const type = formData[key].type;
      const query = formData[key].query;
      const filterType = formData[key].filterType;
      if (value) {
        if (query) {
          // custom query
          payload.value.where = query;
        } else {
          if (type === 'date') {
            payload.value.where[name] = {
              gte: value![0],
              lte: value![1],
            };
          } else if (filterType && (filterType === 'number' || filterType === 'select')) {
            payload.value.where[name] = value;
          } else {
            payload.value.where[name] = {
              contains: value,
              mode: 'insensitive',
            };
          }
        }
      }
    }
  };

  const addFiltersToTag = (formData: formDataType) => {
    // tagList.value = [];
    for (const key in formData) {
      const value = formData[key].value;
      const name = formData[key].name;
      const label = formData[key].label;
      const type = formData[key].type;
      const filterType = formData[key].filterType;
      if (value) {
        // if tagList includes the key dont add it again
        const tagListKeys = tagList.value.map((tag) => tag.key);
        if (tagListKeys.includes(name)) {
          continue;
        }
        let title;
        if (type === 'date') {
          title = `${value[0]} - ${value[1]}`;
        } else if (filterType && (filterType === 'number' || filterType === 'select')) {
          title = value;
        } else {
          title = value;
        }

        tagList.value.push({
          key: label,
          title: title,
        });
      }
    }
    updateKey.value += 1;
  };

  const onRemoveTag = async (fetchFunc: any, tag: ITags, formData: formDataType) => {
    try {
      loading.value = true;
      delete payload.value.where[tag.key];
      tagList.value = tagList.value.filter((item) => item.key !== tag.key);
      formData[tag.key].value = undefined;
      await fetchFunc(payload.value);
    } catch (error) {
      loading.value = false;
      toast.showErrorMessage('Something went wrong!');
    } finally {
      loading.value = false;
    }
    updateKey.value += 1;
  };

  const onApplyFilters = async (fetchFunc: any, formData: formDataType) => {
    try {
      loading.value = true;
      addFormDataToPayload(formData);
      addFiltersToTag(formData);
      await fetchFunc(payload.value);
    } catch (error) {
      loading.value = false;
      toast.showErrorMessage('Something went wrong!');
      clearFormData(formData);
      resetAll();
      await fetchFunc(payload.value);
    } finally {
      loading.value = false;
    }
  };

  const clearFormData = (formData: formDataType) => {
    for (const key in formData) {
      const value = formData[key].value;
      if (value) {
        formData[key].value = '';
      }
    }
    updateKey.value += 1;
  };

  return {
    tagList,
    hasError,
    whereKey,
    focus,
    updateInfo,
    filteredInfo,
    sortedInfo,
    loading,
    pageSize,
    defaultPayload,
    payload,
    toast,
    resetPayload,
    addFormDataToPayload,
    clearFormData,
    onApplyFilters,
    onRemoveTag,
    updateKey,
    resetAll,
  };
};

export const dateKeysArray = [
  'createdAt',
  'updatedAt',
  'deletedAt',
  'registeredDate',
  'dateOfPayment',
];
export const numberKeysArray = ['id', 'talentId', 'amount', 'toCompanyId'];
export type formDataType = {
  [key: string]: {
    name: string;
    label: string;
    value: any;
    type: string;
    options?: any[];
    filterType?: 'number' | 'select';
    query?: any;
  };
};

export interface ITags {
  key: string;
  title?: string;
}
