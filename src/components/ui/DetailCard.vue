<template>
  <Card>
    <Row class="mb-3">
      <Col :span="12">
        <h3>{{ title }}</h3>
      </Col>
    </Row>
    <Card v-if="data" class="w-full">
      <CardGrid v-for="(value, key) in data" :key="key" style="width: 50%; text-align: center">
        <Row>
          <Col :span="12" class="flex justify-items-start">
            <span v-if="key" class="text-start text-base capitalize font-bold">{{ key }}</span>
          </Col>
          <Col :span="12" class="flex justify-items-start">
            <span class="text-start text-base font-light truncate">{{
              convertValue(key, value)
            }}</span>
          </Col>
        </Row>
      </CardGrid>
    </Card>
    <RLoading v-else :no-empty="data?.length" :no-spin="!data?.length"/>
  </Card>
</template>

<script lang="ts" setup>
import { Card, CardGrid, Col, Row } from 'ant-design-vue';

export interface IProps {
  convertValue(key: any, value: any): any;
  data: any;
  title: string;
}

withDefaults(defineProps<IProps>(), {});
</script>
