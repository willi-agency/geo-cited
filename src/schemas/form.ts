// src/schemas/form.ts

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'tel' 
  | 'number'
  | 'url'
  | 'textarea' 
  | 'radio' 
  | 'checkbox' 
  | 'select';

export type FormFieldOption = {
  label: string;
  value: string;
};

export type FormField = {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required?: boolean;
  dataMask?: string;
  dataField: string;
  options?: FormFieldOption[];
  hasOtherOption?: boolean;
  otherPlaceholder?: string;
  description?: string;
  rows?: number; // para textarea
  customClass?: string;
};

export type FormSection = {
  id: string;
  title?: string;
  description?: string;
  fields: FormField[];
  customClass?: string;
};

export type FormSubmitButton = {
  label: string;
  variant?: string;
  size?: string;
  customClass?: string;
  icon?: string;
};

export type FormConfig = {
  formId: string;
  title?: string;
  description?: string;
  sections: FormSection[];
  submitButton: FormSubmitButton;
  variant?: 'white' | 'dark' | 'primary';
  customClass?: string;
};