import RButton from '@/components/ui/Button.vue';
import RTextarea from '@/components/ui/Textarea.vue';
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RButton: typeof RButton;
    RTextarea: typeof RTextarea;
  }
}
