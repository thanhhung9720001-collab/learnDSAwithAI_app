export interface Step {
  array: number[];
  activeIndices: number[];
  minIdx?: number | null;
  pivotIdx?: number | null;
  sortedIndices: number[];
  isSwapping: boolean;
  activeLines: number[];
  explanation: string;
  auxiliaryArray?: number[]; // For merge sort or counting sort
  range?: [number, number]; // For quick sort or merge sort focus
}

export interface Algorithm {
  id: string;
  name: string;
  pythonCode: string;
  generateSteps: (arr: number[]) => Step[];
}
