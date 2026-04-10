import { Step, Algorithm } from './types';

// --- Selection Sort ---
const selectionSortCode = `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]`;

const generateSelectionSortSteps = (initialArr: number[]): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let n = arr.length;
  let sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [...sortedIndices],
    isSwapping: false,
    activeLines: [1, 2],
    explanation: "Khởi tạo mảng và xác định số lượng phần tử (n)."
  });

  for (let i = 0; i < n; i++) {
    let min_idx = i;
    steps.push({
      array: [...arr],
      activeIndices: [i],
      minIdx: min_idx,
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: [3, 4],
      explanation: `Bắt đầu vòng lặp thứ ${i + 1}. Giả sử phần tử nhỏ nhất nằm ở [${i}] (Giá trị: ${arr[i]}).`
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, min_idx],
        minIdx: min_idx,
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: [5, 6],
        explanation: `So sánh [${j}] (${arr[j]}) với phần tử nhỏ nhất hiện tại [${min_idx}] (${arr[min_idx]}).`
      });

      if (arr[j] < arr[min_idx]) {
        min_idx = j;
        steps.push({
          array: [...arr],
          activeIndices: [j],
          minIdx: min_idx,
          sortedIndices: [...sortedIndices],
          isSwapping: false,
          activeLines: [7],
          explanation: `Tìm thấy phần tử nhỏ hơn! Cập nhật min_idx = ${min_idx}.`
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
        activeLines: [8],
        explanation: `Hoán đổi phần tử nhỏ nhất [${min_idx}] (${arr[min_idx]}) với vị trí đầu tiên chưa sắp xếp [${i}] (${arr[i]}).`
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
      explanation: `Phần tử ${arr[i]} đã ở đúng vị trí.`
    });
  }
  return steps;
};

// --- Insertion Sort ---
const insertionSortCode = `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key`;

const generateInsertionSortSteps = (initialArr: number[]): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let n = arr.length;
  let sortedIndices: number[] = [0];

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [0],
    isSwapping: false,
    activeLines: [1],
    explanation: "Coi phần tử đầu tiên là đã sắp xếp."
  });

  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [...sortedIndices],
      isSwapping: false,
      activeLines: [2, 3, 4],
      explanation: `Lấy phần tử [${i}] (${key}) làm 'key' để chèn vào phần đã sắp xếp.`
    });

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        activeIndices: [j, j + 1],
        sortedIndices: [...sortedIndices],
        isSwapping: true,
        activeLines: [5, 6, 7],
        explanation: `Vì ${arr[j]} > ${key}, dịch chuyển ${arr[j]} sang phải.`
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
      activeLines: [8],
      explanation: `Chèn 'key' (${key}) vào vị trí thích hợp [${j + 1}].`
    });
  }
  return steps;
};

// --- Bubble Sort ---
const bubbleSortCode = `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]`;

const generateBubbleSortSteps = (initialArr: number[]): Step[] => {
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
        activeLines: [3, 4],
        explanation: `So sánh cặp phần tử [${j}] (${arr[j]}) và [${j + 1}] (${arr[j + 1]}).`
      });

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          array: [...arr],
          activeIndices: [j, j + 1],
          sortedIndices: [...sortedIndices],
          isSwapping: true,
          activeLines: [5],
          explanation: `${arr[j + 1]} > ${arr[j]}, tiến hành hoán đổi.`
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
      explanation: `Phần tử lớn nhất trong lượt này (${arr[n - i - 1]}) đã nổi lên vị trí cuối.`
    });
  }
  return steps;
};

// --- Quick Sort ---
const quickSortCode = `def quick_sort(arr, low, high):
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
    return i + 1`;

const generateQuickSortSteps = (initialArr: number[]): Step[] => {
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
      activeLines: [7, 8],
      explanation: `Chọn pivot là phần tử cuối cùng: ${pivot} tại [${high}].`,
      range: [low, high]
    });

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, high],
        pivotIdx: high,
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: [10, 11],
        explanation: `So sánh [${j}] (${arr[j]}) với pivot (${pivot}).`,
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
          activeLines: [12, 13],
          explanation: `${arr[i]} < pivot, đưa nó về phía bên trái vùng đang xét.`,
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
      activeLines: [14],
      explanation: `Đưa pivot (${pivot}) về đúng vị trí phân tách [${i + 1}].`,
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
    explanation: "Quick Sort hoàn tất!"
  });
  return steps;
};

// --- Merge Sort ---
const mergeSortCode = `def merge_sort(arr):
    if len(arr) > 1:
        mid = len(arr) // 2
        L = arr[:mid]
        R = arr[mid:]
        merge_sort(L)
        merge_sort(R)
        # Merge logic...`;

const generateMergeSortSteps = (initialArr: number[]): Step[] => {
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
      activeLines: [],
      explanation: `Đang trộn vùng [${l}-${m}] và [${m+1}-${r}].`,
      range: [l, r]
    });

    let i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
      steps.push({
        array: [...arr],
        activeIndices: [l + i, m + 1 + j],
        sortedIndices: [...sortedIndices],
        isSwapping: false,
        activeLines: [],
        explanation: `So sánh ${L[i]} và ${R[j]}.`,
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
        activeLines: [],
        explanation: `Đưa giá trị nhỏ hơn vào vị trí [${k - 1}].`,
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
        activeLines: [],
        explanation: `Đưa phần còn lại của mảng trái vào mảng chính.`,
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
        activeLines: [],
        explanation: `Đưa phần còn lại của mảng phải vào mảng chính.`,
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
    explanation: "Merge Sort hoàn tất!"
  });
  return steps;
};

// --- Counting Sort ---
const countingSortCode = `def counting_sort(arr):
    max_val = max(arr)
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    # Reconstruct array...`;

const generateCountingSortSteps = (initialArr: number[]): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let maxVal = Math.max(...arr);
  let count = new Array(maxVal + 1).fill(0);

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: [1, 2, 3],
    explanation: `Tìm giá trị lớn nhất (${maxVal}) và khởi tạo mảng đếm.`,
    auxiliaryArray: [...count]
  });

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++;
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [],
      isSwapping: false,
      activeLines: [4, 5],
      explanation: `Đếm phần tử ${arr[i]}. count[${arr[i]}] = ${count[arr[i]]}.`,
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
        activeLines: [],
        explanation: `Đưa giá trị ${i} trở lại mảng chính.`,
        auxiliaryArray: [...count]
      });
    }
  }

  return steps;
};

export const ALGORITHMS: Algorithm[] = [
  {
    id: 'selection',
    name: 'Selection Sort',
    pythonCode: selectionSortCode,
    generateSteps: generateSelectionSortSteps
  },
  {
    id: 'insertion',
    name: 'Insertion Sort',
    pythonCode: insertionSortCode,
    generateSteps: generateInsertionSortSteps
  },
  {
    id: 'bubble',
    name: 'Bubble Sort',
    pythonCode: bubbleSortCode,
    generateSteps: generateBubbleSortSteps
  },
  {
    id: 'quick',
    name: 'Quick Sort',
    pythonCode: quickSortCode,
    generateSteps: generateQuickSortSteps
  },
  {
    id: 'merge',
    name: 'Merge Sort',
    pythonCode: mergeSortCode,
    generateSteps: generateMergeSortSteps
  },
  {
    id: 'counting',
    name: 'Counting Sort',
    pythonCode: countingSortCode,
    generateSteps: generateCountingSortSteps
  }
];
