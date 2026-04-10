export interface Step {
  array: number[];
  activeIndices: number[];
  minIdx?: number | null;
  pivotIdx?: number | null;
  foundIndex?: number | null;
  sortedIndices: number[];
  isSwapping: boolean;
  activeLines: number[];
  explanation: string;
  auxiliaryArray?: number[]; // For merge sort or counting sort
  range?: [number, number]; // For quick sort or merge sort focus
}

export interface CodeSnippets {
  python: string;
  javascript: string;
  cpp: string;
  java: string;
}

export interface Algorithm {
  id: string;
  name: string;
  type: 'sort' | 'search';
  requiresSorted?: boolean;
  complexities?: {
    time: string;
    space: string;
  };
  codes: CodeSnippets;
  generateSteps: (arr: number[], textLang?: string, codeLang?: string, target?: number) => Step[];
}
