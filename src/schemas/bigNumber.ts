// src/schemas/bigNumber.ts

export type BigNumber = {
  title: string;
  bigNumbers: {
    number: number;
    detail: string;
    label: string;
    border?: string;
  }[];
};