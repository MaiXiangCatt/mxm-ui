import type { Component, Ref } from "vue";

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'default' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  tag?: string | Component
  type?: ButtonType;
  size?: ButtonSize;
  nativeType?: NativeType;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  loading?: boolean;
  autofocus?: boolean;
  icon?: string;
  loadingIcon?: string;
  useThrottle?: boolean;
  throttleDuration?: number;
}

export interface ButtonEmits {
  (e: "click", val: MouseEvent): void;
}

export interface ButtonInstance {
  ref: Ref<HTMLButtonElement | void>
}