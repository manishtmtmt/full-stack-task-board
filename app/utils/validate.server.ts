export const validateInput = (value: string): string | undefined => {
  if (!value.length) return `Please enter a value`;
};

export const validateSelectOption = (value: string, label: string): string | undefined => {
  if (!value.length) return `Please select ${label}`;
};
