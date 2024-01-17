import RActionButton from '@/components/ui/ActionButton.vue';
import RBreadcrumbList from '@/components/ui/BreadcrumbList.vue';
import RDateRangePicker from '@/components/ui/DateRangePicker.vue';
import RDatePicker from '@/components/ui/DatePicker.vue';
import RDetailCard from '@/components/ui/DetailCard.vue';
import RInput from '@/components/ui/Input.vue';
import RLoading from '@/components/ui/Loading.vue';
import RRadioOption from '@/components/ui/RadioOption.vue';
import RSelect from '@/components/ui/Select.vue';
import RTable from '@/components/ui/Table.vue';
import RCheckbox from '@/components/ui/Checkbox.vue';
import RTableActionCell from '@/components/ui/TableActionCell.vue';
import RTableDateRangeFilter from '@/components/ui/TableDateRangeFilter.vue';
import RTableSearchFilter from '@/components/ui/TableSearchFilter.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RInput: typeof RInput;
    RTableSearchFilter: typeof RTableSearchFilter;
    RTableDateRangeFilter: typeof RTableDateRangeFilter;
    RRadioGroup: typeof RRadioOption;
    RBreadcrumbList: typeof RBreadcrumbList;
    RTable: typeof RTable;
    RTableActionCell: typeof RTableActionCell;
    RActionButton: typeof RActionButton;
    RSelect: typeof RSelect;
    RLoading: typeof RLoading;
    RDetailCard: typeof RDetailCard;
    RDateRangePicker: typeof RDateRangePicker;
    RDatePicker: typeof RDatePicker;
    RCheckbox: typeof RCheckbox;
  }
}
