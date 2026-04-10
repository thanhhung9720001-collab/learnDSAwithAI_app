import { Step, Algorithm, CodeSnippets } from './types';
import { SEARCH_ALGORITHMS } from './searchAlgorithms';

const getLines = (codeLang: string | undefined, py: number[], js: number[], cpp: number[], java: number[]) => {
  switch (codeLang) {
    case 'javascript': return js;
    case 'cpp': return cpp;
    case 'java': return java;
    default: return py;
  }
};

// --- Selection Sort ---
const selectionSortCodes: CodeSnippets = {
  python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`,
  javascript: `function selectionSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
}`,
  cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        swap(arr[min_idx], arr[i]);
    }
}`,
  java: `public void selectionSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
};

const generateSelectionSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let n = arr.length;
  let sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [...sortedIndices],
    isSwapping: false,
    activeLines: getLines(codeLang, [1, 2], [1, 2], [1], [1, 2]),
    explanation: textLang === 'en' ? "Initialize array and determine number of elements (n)." : "Khởi tạo mảng và xác định số lượng phần tử (n)."
  });

  for (let i = 0; i < n; i++) {
    let min_idx = i;
    steps.push({
      array: [...arr],
      activeIndices: [i],
      minIdx: min_idx,
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: getLines(codeLang, [3, 4], [3, 4], [2, 3], [3, 4]),
      explanation: textLang === 'en' ? `Start loop ${i + 1}. Assume minimum is at [${i}] (Value: ${arr[i]}).` : `Bắt đầu vòng lặp thứ ${i + 1}. Giả sử phần tử nhỏ nhất nằm ở [${i}] (Giá trị: ${arr[i]}).`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, min_idx],
        minIdx: min_idx,
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: getLines(codeLang, [5, 6], [5, 6], [4, 5], [5, 6]),
        explanation: textLang === 'en' ? `Compare [${j}] (${arr[j]}) with current minimum [${min_idx}] (${arr[min_idx]}).` : `So sánh [${j}] (${arr[j]}) với phần tử nhỏ nhất hiện tại [${min_idx}] (${arr[min_idx]}).`
      });

      if (arr[j] < arr[min_idx]) {
        min_idx = j;
        steps.push({
          array: [...arr],
          activeIndices: [j],
          minIdx: min_idx,
          sortedIndices: [...sortedIndices],
          isSwapping: false,
          activeLines: getLines(codeLang, [7], [7], [6], [7]),
          explanation: textLang === 'en' ? `Found smaller element! Update min_idx = ${min_idx}.` : `Tìm thấy phần tử nhỏ hơn! Cập nhật min_idx = ${min_idx}.`
        });
      }
    }

    if (min_idx !== i) {
      steps.push({
        array: [...arr],
        activeIndices: [i, min_idx],
        minIdx: min_idx,
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: getLines(codeLang, [8], [10], [9], [10, 11, 12]),
        explanation: textLang === 'en' ? `Swap minimum [${min_idx}] (${arr[min_idx]}) with unsorted position [${i}] (${arr[i]}).` : `Hoán đổi phần tử nhỏ nhất [${min_idx}] (${arr[min_idx]}) với vị trí [${i}] (${arr[i]}).`
      });
      [arr[i], arr[min_idx]] = [arr[min_idx], arr[i]];
    }
    sortedIndices.push(i);
    steps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: [],
      explanation: textLang === 'en' ? `Element ${arr[i]} is now purely sorted.` : `Phần tử ${arr[i]} đã ở đúng vị trí.`
    });
  }
  return steps;
};

// --- Insertion Sort ---
const insertionSortCodes: CodeSnippets = {
  python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`,
  javascript: `function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
  cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
  java: `public void insertionSort(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
};

const generateInsertionSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let n = arr.length;
  let sortedIndices: number[] = [0];

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [0],
    isSwapping: false,
    activeLines: getLines(codeLang, [1], [1], [1], [1]),
    explanation: textLang === 'en' ? "Assume the first element is already sorted." : "Coi phần tử đầu tiên là đã sắp xếp."
  });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: getLines(codeLang, [2, 3, 4], [2, 3, 4], [2, 3, 4], [3, 4, 5]),
      explanation: textLang === 'en' ? `Take [${i}] (${key}) as 'key' to insert into sorted part.` : `Lấy phần tử [${i}] (${key}) làm 'key' để chèn vào phần đã sắp xếp.`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: getLines(codeLang, [5, 6, 7], [5, 6, 7], [5, 6, 7], [6, 7, 8]),
        explanation: textLang === 'en' ? `Since ${arr[j]} > ${key}, shift ${arr[j]} right.` : `Vì ${arr[j]} > ${key}, dịch chuyển ${arr[j]} sang phải.`
      });
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
    sortedIndices = Array.from({length: i + 1}, (_, k) => k);
    steps.push({
      array: [...arr],
      activeIndices: [j + 1],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: getLines(codeLang, [8], [9], [9], [10]),
      explanation: textLang === 'en' ? `Insert 'key' (${key}) into suitable position [${j + 1}].` : `Chèn 'key' (${key}) vào vị trí thích hợp [${j + 1}].`
    });
  }
  return steps;
};

// --- Bubble Sort ---
const bubbleSortCodes: CodeSnippets = {
  python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`,
  javascript: `function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
  cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
  java: `public void bubbleSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
};

const generateBubbleSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let n = arr.length;
  let sortedIndices: number[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: getLines(codeLang, [3, 4], [4, 5], [3, 4], [4, 5]),
        explanation: textLang === 'en' ? `Compare pair [${j}] (${arr[j]}) and [${j + 1}] (${arr[j + 1]}).` : `So sánh cặp phần tử [${j}] (${arr[j]}) và [${j + 1}] (${arr[j + 1]}).`
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          isSwapping: true,
          activeLines: getLines(codeLang, [5], [6, 7, 8], [5], [6, 7, 8]),
          explanation: textLang === 'en' ? `${arr[j + 1]} > ${arr[j]}, perform swap.` : `${arr[j + 1]} > ${arr[j]}, tiến hành hoán đổi.`
        });
      }
    }
    sortedIndices.push(n - i - 1);
    steps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: [],
      explanation: textLang === 'en' ? `Largest element of this pass (${arr[n - i - 1]}) bubbled up.` : `Phần tử lớn nhất trong lượt chạy (${arr[n - i - 1]}) nổi lên cuối.`
    });
  }
  return steps;
};

// --- Quick Sort ---
const quickSortCodes: CodeSnippets = {
  python: `def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
  javascript: `function quickSort(arr, low, high) {
    if (low < high) {
        let pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}`,
  cpp: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return (i + 1);
}`,
  java: `public void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
int partition(int arr[], int low, int high) {
    int pivot = arr[high];
    int i = (low - 1);
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`
};

const generateQuickSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let sortedIndices: number[] = [];

  const partition = (low: number, high: number) => {
    let pivot = arr[high];
    let i = low - 1;
    
    steps.push({
      array: [...arr],
      activeIndices: [high],
      pivotIdx: high,
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: getLines(codeLang, [7, 8], [9, 10], [9, 10], [9, 10]),
      explanation: textLang === 'en' ? `Choose pivot as the last element: ${pivot} at [${high}].` : `Chọn pivot là phần tử cuối cùng: ${pivot} tại [${high}].`,
      range: [low, high]
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, high],
        pivotIdx: high,
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: getLines(codeLang, [10, 11], [11, 12], [11, 12], [11, 12]),
        explanation: textLang === 'en' ? `Compare [${j}] (${arr[j]}) with pivot (${pivot}).` : `So sánh [${j}] (${arr[j]}) với pivot (${pivot}).`,
        range: [low, high]
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push({
          array: [...arr],
          activeIndices: [i, j],
          pivotIdx: high,
          sortedIndices: [...sortedIndices],
          isSwapping: true,
          activeLines: getLines(codeLang, [12, 13], [13, 14], [13, 14], [13, 14, 15, 16]),
          explanation: textLang === 'en' ? `${arr[i]} < pivot, move it left.` : `${arr[i]} < pivot, đưa nó về phía bên trái vùng đang xét.`,
          range: [low, high]
        });
      }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      array: [...arr],
      activeIndices: [i + 1, high],
      pivotIdx: i + 1,
      sortedIndices: [...sortedIndices],
      isSwapping: true,
      activeLines: getLines(codeLang, [14], [17], [17], [18, 19, 20]),
      explanation: textLang === 'en' ? `Move pivot (${pivot}) to correct split position [${i + 1}].` : `Đưa pivot (${pivot}) về đúng vị trí phân tách [${i + 1}].`,
      range: [low, high]
    });
    return i + 1;
  };

  const quickSort = (low: number, high: number) => {
    if (low < high) {
      let pi = partition(low, high);
      sortedIndices.push(pi);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    } else if (low === high) {
      sortedIndices.push(low);
    }
  };

  quickSort(0, arr.length - 1);
  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: Array.from({length: arr.length}, (_, k) => k),
    isSwapping: false,
    activeLines: [],
    explanation: textLang === 'en' ? "Quick Sort completed!" : "Quick Sort hoàn tất!"
  });
  return steps;
};


// --- Merge Sort ---
const mergeSortCodes: CodeSnippets = {
  python: `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # Merge algorithm (omitted for brevity)
        i = j = k = 0
        while i < len(L) and j < len(R): ...
        while i < len(L): ...
        while j < len(R): ...`,
  javascript: `function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const L = arr.slice(0, mid);
    const R = arr.slice(mid);
    mergeSort(L); mergeSort(R);
    // Merge process...
}`,
  cpp: `void mergeSort(int arr[], int l, int r) {
    if (l >= r) return;
    int mid = l + (r - l) / 2;
    mergeSort(arr, l, mid);
    mergeSort(arr, mid + 1, r);
    // merge(arr, l, mid, r);
}`,
  java: `public void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        // merge(arr, l, m, r);
    }
}`
};

const generateMergeSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let sortedIndices: number[] = [];

  const merge = (l: number, m: number, r: number) => {
    let n1 = m - l + 1;
    let n2 = r - m;
    let L = arr.slice(l, m + 1);
    let R = arr.slice(m + 1, r + 1);

    steps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: getLines(codeLang, [9], [7], [6], [6]),
      explanation: textLang === 'en' ? `Merging region [${l}-${m}] and [${m+1}-${r}].` : `Đang trộn vùng [${l}-${m}] và [${m+1}-${r}].`,
      range: [l, r]
    });

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      steps.push({
        array: [...arr],
        activeIndices: [l + i, m + 1 + j],
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: getLines(codeLang, [10], [7], [6], [6]),
        explanation: textLang === 'en' ? `Compare ${L[i]} and ${R[j]}.` : `So sánh ${L[i]} và ${R[j]}.`,
        range: [l, r]
      });

      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      steps.push({
        array: [...arr],
        activeIndices: [k - 1],
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: getLines(codeLang, [10], [7], [6], [6]),
        explanation: textLang === 'en' ? `Place smaller value down to position [${k - 1}].` : `Đưa giá trị nhỏ hơn vào vị trí [${k - 1}].`,
        range: [l, r]
      });
    }

    while (i < n1) {
      arr[k] = L[i];
      i++; k++;
      steps.push({
        array: [...arr],
        activeIndices: [k - 1],
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: getLines(codeLang, [11], [7], [6], [6]),
        explanation: textLang === 'en' ? `Merge remaining from left.` : `Đưa lượng còn lại của mảng trái vào mảng chính.`,
        range: [l, r]
      });
    }
    while (j < n2) {
      arr[k] = R[j];
      j++; k++;
      steps.push({
        array: [...arr],
        activeIndices: [k - 1],
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: getLines(codeLang, [12], [7], [6], [6]),
        explanation: textLang === 'en' ? `Merge remaining from right.` : `Đưa lượng còn lại của mảng phải vào mảng chính.`,
        range: [l, r]
      });
    }
  };

  const sort = (l: number, r: number) => {
    if (l < r) {
      let m = Math.floor((l + r) / 2);
      sort(l, m);
      sort(m + 1, r);
      merge(l, m, r);
    }
  };

  sort(0, arr.length - 1);
  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: Array.from({length: arr.length}, (_, k) => k),
    isSwapping: false,
    activeLines: [],
    explanation: textLang === 'en' ? "Merge Sort completed!" : "Merge Sort hoàn tất!"
  });
  return steps;
};

// --- Counting Sort ---
const countingSortCodes: CodeSnippets = {
  python: `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    k = 0
    for i in range(len(count)):
        while count[i] > 0:
            arr[k] = i
            k += 1
            count[i] -= 1`,
  javascript: `function countingSort(arr) {
    let maxVal = Math.max(...arr);
    let count = new Array(maxVal + 1).fill(0);
    for (let x of arr) {
        count[x]++;
    }
    let k = 0;
    for (let i = 0; i < count.length; i++) {
        while (count[i] > 0) {
            arr[k++] = i;
            count[i]--;
        }
    }
}`,
  cpp: `void countingSort(int arr[], int n) {
    int maxVal = *max_element(arr, arr + n);
    int count[maxVal + 1] = {0};
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }
    int k = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i] > 0) {
            arr[k++] = i;
            count[i]--;
        }
    }
}`,
  java: `public void countingSort(int arr[]) {
    int n = arr.length;
    int maxVal = Arrays.stream(arr).max().getAsInt();
    int[] count = new int[maxVal + 1];
    for (int x : arr) {
        count[x]++;
    }
    int k = 0;
    for (int i = 0; i <= maxVal; i++) {
        while (count[i] > 0) {
            arr[k++] = i;
            count[i]--;
        }
    }
}`
};


const generateCountingSortSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python'): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let maxVal = Math.max(...arr);
  let count = new Array(maxVal + 1).fill(0);

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [1, 2, 3], [1, 2, 3], [1, 2, 3], [1, 2, 3, 4]),
    explanation: textLang === 'en' ? `Find maximum value (${maxVal}) and initialized count array.` : `Tìm giá trị lớn nhất (${maxVal}) và khởi tạo mảng đếm.`,
    auxiliaryArray: [...count]
  });

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [4, 5], [4, 5], [4, 5], [5, 6]),
      explanation: textLang === 'en' ? `Count element ${arr[i]}. count[${arr[i]}] = ${count[arr[i]]}.` : `Đếm phần tử ${arr[i]}. count[${arr[i]}] = ${count[arr[i]]}.`,
      auxiliaryArray: [...count]
    });
  }

  let k = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[k] = i;
      count[i]--;
      k++;
      steps.push({
        array: [...arr],
        activeIndices: [k - 1],
        sortedIndices: Array.from({length: k}, (_, idx) => idx),
        isSwapping: true,
        activeLines: getLines(codeLang, [7, 8, 9, 10, 11], [8, 9, 10, 11], [8, 9, 10, 11], [9, 10, 11, 12]),
        explanation: textLang === 'en' ? `Put value ${i} back to main array.` : `Đưa giá trị ${i} trở lại mảng chính.`,
        auxiliaryArray: [...count]
      });
    }
  }

  return steps;
};

export const ALGORITHMS: Algorithm[] = [
  {
    id: 'selection',
    type: 'sort',
    name: 'Selection Sort',
    complexities: { time: 'O(n²)', space: 'O(1)' },
    codes: selectionSortCodes,
    generateSteps: generateSelectionSortSteps
  },
  {
    id: 'insertion',
    type: 'sort',
    name: 'Insertion Sort',
    complexities: { time: 'O(n²)', space: 'O(1)' },
    codes: insertionSortCodes,
    generateSteps: generateInsertionSortSteps
  },
  {
    id: 'bubble',
    type: 'sort',
    name: 'Bubble Sort',
    complexities: { time: 'O(n²)', space: 'O(1)' },
    codes: bubbleSortCodes,
    generateSteps: generateBubbleSortSteps
  },
  {
    id: 'quick',
    type: 'sort',
    name: 'Quick Sort',
    complexities: { time: 'O(n log n)', space: 'O(log n)' },
    codes: quickSortCodes,
    generateSteps: generateQuickSortSteps
  },
  {
    id: 'merge',
    type: 'sort',
    name: 'Merge Sort',
    complexities: { time: 'O(n log n)', space: 'O(n)' },
    codes: mergeSortCodes,
    generateSteps: generateMergeSortSteps
  },
  {
    id: 'counting',
    type: 'sort',
    name: 'Counting Sort',
    complexities: { time: 'O(n + k)', space: 'O(k)' },
    codes: countingSortCodes,
    generateSteps: generateCountingSortSteps
  }
];

// Search codes will be appended here.
ALGORITHMS.push(...SEARCH_ALGORITHMS);
