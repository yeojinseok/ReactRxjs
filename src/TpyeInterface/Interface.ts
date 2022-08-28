// export interface InputInterFace {
//   handle: React.ChangeEventHandler<HTMLInputElement>
//   value: string
//   type: string
//   placeholder: string
//   children: string
// }

export interface InputInterface {
  onFocus?: React.FocusEventHandler<HTMLInputElement>
  refs?: any
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  value?: string
  placeholder?: string
  onBlur?: any
  register: any
}
