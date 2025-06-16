export type AlertType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

export interface AlertProps {
  title?: string;
  description?: string;
  type?: AlertType;
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
  effect?: 'light' | 'dark'
}

export interface AlertEmits {
  (e: 'close'): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}