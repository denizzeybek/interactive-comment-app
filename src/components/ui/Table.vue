<template>
  <Collapse
    v-if="slots.customTableFilters"
    v-model:activeKey="activeCollapseKey"
    expandIconPosition="end"
  >
    <CollapsePanel header="Filters">
      <Row :gutter="[8, 1]">
        <slot name="customTableFilters" />
      </Row>
      <Row :gutter="[8, 16]">
        <Col :span="12">
          <Button @click="$emit('applyFilters')" block>Apply</Button>
        </Col>
        <Col :span="12">
          <Button @click="handleClear" block>Clear</Button>
        </Col>
      </Row>
    </CollapsePanel>
  </Collapse>
  <div v-if="tagList.length" :key="updateKey">
    <Tag v-for="(tag, index) in tagList" :key="index" closable @close="closeTag(tag)" color="blue"
      >{{ `${tag.key}: ${tag.title}` }}
    </Tag>
  </div>
  <div class="relative flex flex-col">
    <AntTable
      :dataSource="dataList"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      :scroll="scroll"
      @change="onChange"
    >
      <template #headerCell="{ column }">
        <slot name="customHeaderCell" :column="column"></slot>
      </template>

      <template v-if="slots.customExpandedRowRender" #expandColumnTitle>
        <slot v-if="slots.customExpandColumnTitle" name="customExpandColumnTitle"></slot>
        <span v-else>More</span>
      </template>
      <template #bodyCell="{ column, text, record }">
        <slot name="customBodyCell" :column="column" :text="text" :record="record"></slot>
      </template>
      <template v-if="slots.customExpandedRowRender" #expandedRowRender="{ record }">
        <slot name="customExpandedRowRender" :record="record"></slot>
      </template>
    </AntTable>
    <Button
      v-if="dataList && dataList?.length > 0 && clearBtn"
      type="default"
      class="absolute left-0 bottom-5"
      @click="handleClear"
      >Clear all filters</Button
    >
  </div>
</template>

<script lang="ts" setup>
import type { ITags } from '@/composables/useTable';
import { useTable } from '@/composables/useTable';
import { useCommonStore } from '@/stores/common';
import type { TableProps } from 'ant-design-vue';
import { Table as AntTable, Button, Col, Collapse, CollapsePanel, Row, Tag } from 'ant-design-vue';
import { computed, ref, useSlots, watch } from 'vue';

type ScrollType = {
  x: number;
  y: number;
};

export interface IProps {
  totalItems: number | undefined;
  dataList: any[] | undefined;
  columns: any[];
  filterKeys?: string[];
  fetchFunction?: (arg: any) => void;
  scroll?: ScrollType;
  paginationProps?: boolean;
  clearBtn?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  paginationProps: true,
  clearBtn: true,
});
const emit = defineEmits([
  'filteredInfo',
  'sortedInfo',
  'applyFilters',
  'clearFormData',
  'onRemoveTag',
]);
const commonStore = useCommonStore();
const slots = useSlots();
const {
  loading,
  pageSize,
  defaultPayload,
  filteredInfo,
  sortedInfo,
  payload,
  tagList,
  hasError,
  whereKey,
  updateKey,
  resetAll,
} = useTable();

const activeCollapseKey = ref(['1']);

const pagination = computed(() => {
  if (!props.paginationProps) {
    return false;
  }
  return {
    defaultPageSize: pageSize.value,
    total: props.totalItems,
    current: commonStore.currentPage,
  };
});

const sendEmitData = () => {
  emit('filteredInfo', filteredInfo.value);
  emit('sortedInfo', sortedInfo.value);
};

const onChange: TableProps['onChange'] = async (pagination, filters, sorter: any) => {
  pageSize.value = pagination.pageSize || 5;
  filteredInfo.value = filters;
  sortedInfo.value = sorter;
  sendEmitData();
  commonStore.setCurrentPage(pagination.current!);

  whereKey.value = null;
  hasError.value = false;

  if (pagination) {
    payload.value.skip = (pagination.current! - 1) * (pagination.pageSize || 1);
  }
  payload.value.orderBy = {
    [sorter.field]: sorter.order === 'ascend' ? 'asc' : 'desc',
  };

  let isInclude: any = null;
  let newTag = {} as ITags;

  try {
    await fetchData(payload.value);
    if (!isInclude && !hasError.value && Object.keys(newTag).length) {
      tagList.value.push(newTag);
    }
  } catch (error) {
    handleClear();
  }
};

const fetchData = async (params: any) => {
  if (!props.fetchFunction) return;
  try {
    loading.value = true;
    await props.fetchFunction(params);
  } catch (error) {
    loading.value = false;
  } finally {
    loading.value = false;
  }
};

const handleClear = () => {
  resetAll();
  setTimeout(() => {
    sendEmitData();
  }, 100);
  emit('clearFormData');
  fetchData(defaultPayload.value);
};

const closeTag = (tag: ITags) => {
  if (slots.customTableFilters) {
    emit('onRemoveTag', tag);
  } else {
    // TODO:: tüm tablolara yeni filtre uygulanınca kaldırılacak
    const removed = tagList.value.filter((element) => element.key !== tag.key);
    tagList.value = removed;
    if (payload?.value?.where) {
      delete payload.value.where[tag.key];
      filteredInfo.value = { ...filteredInfo.value };
      delete filteredInfo.value[tag.key];
    }
    setTimeout(() => {
      sendEmitData();
    }, 100);
    fetchData(payload.value);
  }
};

watch(
  payload,
  () => {
    fetchData(payload.value);
  },
  { immediate: true },
);
watch(
  pageSize,
  () => {
    defaultPayload.value = {
      skip: 0,
      take: pageSize.value,
      orderBy: {
        // createdAt: 'desc'
      },
      where: {} as Record<string, any>,
    };

    payload.value.take = pageSize.value;
  },
  { immediate: true },
);
</script>
