import { useToast } from 'vue-toastification'

export const useRToast = () => {
  const toast = useToast()

  const showSuccessMessage = (message: string) => {
    toast.success(message, {
      icon: {
        iconClass: 'material-symbols-rounded',
        iconChildren: 'check_circle',
        iconTag: 'span'
      }
    })
  }

  const showErrorMessage = (message: string, timeout: number = 3000) => {
    toast.error(message, {
      icon: {
        iconClass: 'material-symbols-rounded',
        iconChildren: 'error',
        iconTag: 'span'
      },
      timeout
    })
  }

  const showInfoMessage = (message: string) => {
    toast.warning(message, {
      icon: {
        iconClass: 'material-symbols-rounded',
        iconChildren: 'warning',
        iconTag: 'span'
      }
    })
  }

  return {
    showSuccessMessage,
    showErrorMessage,
    showInfoMessage
  }
}
