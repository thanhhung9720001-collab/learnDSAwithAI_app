import { Step, Algorithm, CodeSnippets } from './types';

const getLines = (codeLang: string | undefined, py: number[], js: number[], cpp: number[], java: number[]) => {
  switch (codeLang) {
    case 'javascript': return js;
    case 'cpp': return cpp;
    case 'java': return java;
    default: return py;
  }
};

// --- Linear Search ---
const linearSearchCodes: CodeSnippets = {
  python: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  javascript: `function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}`,
  cpp: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
  java: `public int linearSearch(int arr[], int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`
};

const generateLinearSearchSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python', target?: number): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let t = target ?? arr[0];

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [2], [2, 3], [2, 3], [2, 3]),
      explanation: textLang === 'en' ? `Comparing element at index ${i} (${arr[i]}) with target ${t}.` : `So sánh phần tử tại vị trí ${i} (${arr[i]}) với mục tiêu ${t}.`
    });

    if (arr[i] === t) {
      steps.push({
        array: [...arr],
        activeIndices: [i],
        foundIndex: i,
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [3, 4], [4], [4], [4]),
        explanation: textLang === 'en' ? `Found target ${t} at index ${i}!` : `Đã tìm thấy ${t} tại vị trí ${i}!`
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [5], [8], [8], [8]),
    explanation: textLang === 'en' ? `Target ${t} not found in the array.` : `Không tìm thấy ${t} trong mảng.`
  });
  return steps;
};

// --- Binary Search ---
const binarySearchCodes: CodeSnippets = {
  python: `def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = l + (r - l) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1`,
  javascript: `function binarySearch(arr, target) {
    let l = 0, r = arr.length - 1;
    while (l <= r) {
        let mid = Math.floor(l + (r - l) / 2);
        if (arr[mid] === target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
  cpp: `int binarySearch(int arr[], int l, int r, int target) {
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`,
  java: `public int binarySearch(int arr[], int target) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int mid = l + (r - l) / 2;
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) l = mid + 1;
        else r = mid - 1;
    }
    return -1;
}`
};

const generateBinarySearchSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python', target?: number): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let t = target ?? arr[0];

  let l = 0;
  let r = arr.length - 1;

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [2], [2], [1], [2]),
    explanation: textLang === 'en' ? `Initialize left pointing to 0, right pointing to end.` : `Khởi tạo con trỏ left ở đầu mảng, right ở cuối mảng.`,
    range: [l, r]
  });

  while (l <= r) {
    let mid = Math.floor(l + (r - l) / 2);

    steps.push({
      array: [...arr],
      activeIndices: [mid],
      pivotIdx: mid,
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [3, 4], [3, 4], [2, 3], [3, 4]),
      explanation: textLang === 'en' ? `Calculate mid = ${mid}. Array[${mid}] is ${arr[mid]}.` : `Tính điểm giữa mid = ${mid}. Tử tại mid là ${arr[mid]}.`,
      range: [l, r]
    });

    if (arr[mid] === t) {
      steps.push({
        array: [...arr],
        activeIndices: [mid],
        foundIndex: mid,
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [5, 6], [5], [4], [5]),
        explanation: textLang === 'en' ? `Found target ${t} at index ${mid}!` : `Đã tìm thấy ${t} tại ví trí ${mid}!`,
        range: [l, r]
      });
      return steps;
    } else if (arr[mid] < t) {
      l = mid + 1;
      steps.push({
        array: [...arr],
        activeIndices: [mid],
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [7, 8], [6], [5], [6]),
        explanation: textLang === 'en' ? `${arr[mid]} < ${t}. Search in the right half (left = ${l}).` : `${arr[mid]} < ${t}. Giới hạn tìm kiếm sang phải (left = ${l}).`,
        range: [l, r]
      });
    } else {
      r = mid - 1;
      steps.push({
        array: [...arr],
        activeIndices: [mid],
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [9, 10], [7], [6], [7]),
        explanation: textLang === 'en' ? `${arr[mid]} > ${t}. Search in the left half (right = ${r}).` : `${arr[mid]} > ${t}. Giới hạn tìm kiếm sang trái (right = ${r}).`,
        range: [l, r]
      });
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [11], [9], [8], [9]),
    explanation: textLang === 'en' ? `Target ${t} not found in the array.` : `Không tìm thấy ${t} trong mảng.`
  });
  return steps;
};

// --- Jump Search ---
const jumpSearchCodes: CodeSnippets = {
  python: `import math
def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(math.sqrt(n))
        if prev >= n:
            return -1
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    return -1`,
  javascript: `function jumpSearch(arr, target) {
    let n = arr.length;
    let step = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}`,
  cpp: `int jumpSearch(int arr[], int n, int target) {
    int step = sqrt(n);
    int prev = 0;
    while (arr[min(step, n) - 1] < target) {
        prev = step;
        step += sqrt(n);
        if (prev >= n) return -1;
    }
    for (int i = prev; i < min(step, n); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`,
  java: `public int jumpSearch(int arr[], int target) {
    int n = arr.length;
    int step = (int) Math.floor(Math.sqrt(n));
    int prev = 0;
    while (arr[Math.min(step, n) - 1] < target) {
        prev = step;
        step += (int) Math.floor(Math.sqrt(n));
        if (prev >= n) return -1;
    }
    for (int i = prev; i < Math.min(step, n); i++) {
        if (arr[i] == target) return i;
    }
    return -1;
}`
};

const generateJumpSearchSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python', target?: number): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let t = target ?? arr[0];
  let n = arr.length;
  let stepMatch = Math.floor(Math.sqrt(n));
  let prev = 0;

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [3,4,5], [3,4], [2,3], [3,4]),
    explanation: textLang === 'en' ? `Calculate block size (step) = ${stepMatch}.` : `Tính toán bước nhảy (step) = ${stepMatch}.`,
  });

  while (prev < n && arr[Math.min(stepMatch, n) - 1] < t) {
    let checkIdx = Math.min(stepMatch, n) - 1;
    steps.push({
      array: [...arr],
      activeIndices: [checkIdx],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [6], [5], [4], [5]),
      explanation: textLang === 'en' ? `Check arr[${checkIdx}] (${arr[checkIdx]}) < ${t}.` : `Kiểm tra arr[${checkIdx}] (${arr[checkIdx]}) < ${t}.`,
      range: [prev, checkIdx]
    });
    prev = stepMatch;
    stepMatch += Math.floor(Math.sqrt(n));

    steps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [7, 8], [6, 7], [5, 6], [6, 7]),
      explanation: textLang === 'en' ? `Target is greater, jumping to next block (${prev}).` : `Mục tiêu lớn hơn, nhảy đến block tiếp theo (${prev}).`
    });
    if (prev >= n) break;
  }

  let rightBound = Math.min(stepMatch, n);
  if (prev < n) {
      steps.push({
        array: [...arr],
        activeIndices: [],
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [11], [10], [9], [10]),
        explanation: textLang === 'en' ? `Target is in block [${prev} to ${rightBound-1}]. Linear search begins.` : `Mục tiêu nằm trong khoảng [${prev} tới ${rightBound-1}]. Bắt đầu linear search.`,
        range: [prev, rightBound - 1]
      });
  }

  for (let i = prev; i < rightBound; i++) {
    steps.push({
      array: [...arr],
      activeIndices: [i],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [11, 12], [10, 11], [9, 10], [10, 11]),
      explanation: textLang === 'en' ? `Linear check at index ${i} (${arr[i]}).` : `Kiểm tra phần tử tại ${i} (${arr[i]}).`,
      range: [prev, rightBound - 1]
    });

    if (arr[i] === t) {
      steps.push({
        array: [...arr],
        activeIndices: [i],
        foundIndex: i,
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [13], [11], [10], [11]),
        explanation: textLang === 'en' ? `Found target ${t} at index ${i}!` : `Đã tìm thấy ${t} tại vị trí ${i}!`,
        range: [prev, rightBound - 1]
      });
      return steps;
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [14], [13], [12], [13]),
    explanation: textLang === 'en' ? `Target ${t} not found in the array.` : `Không tìm thấy ${t} trong mảng.`
  });
  return steps;
};

// --- Interpolation Search ---
const interpolationSearchCodes: CodeSnippets = {
  python: `def interpolation_search(arr, target):
    lo = 0
    hi = len(arr) - 1
    while lo <= hi and target >= arr[lo] and target <= arr[hi]:
        if lo == hi or arr[lo] == arr[hi]:
            if arr[lo] == target: return lo
            return -1
        pos = lo + int(((hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]))
        if arr[pos] == target:
            return pos
        if arr[pos] < target:
            lo = pos + 1
        else:
            hi = pos - 1
    return -1`,
  javascript: `function interpolationSearch(arr, target) {
    let lo = 0, hi = arr.length - 1;
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo === hi || arr[lo] === arr[hi]) {
            if (arr[lo] === target) return lo;
            return -1;
        }
        let pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]));
        if (arr[pos] === target) return pos;
        if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}`,
  cpp: `int interpolationSearch(int arr[], int n, int target) {
    int lo = 0, hi = (n - 1);
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi || arr[lo] == arr[hi]) {
            if (arr[lo] == target) return lo;
            return -1;
        }
        int pos = lo + (((double)(hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}`,
  java: `public int interpolationSearch(int arr[], int target) {
    int lo = 0, hi = (arr.length - 1);
    while (lo <= hi && target >= arr[lo] && target <= arr[hi]) {
        if (lo == hi || arr[lo] == arr[hi]) {
            if (arr[lo] == target) return lo;
            return -1;
        }
        int pos = lo + (int)(((double)(hi - lo) / (arr[hi] - arr[lo])) * (target - arr[lo]));
        if (arr[pos] == target) return pos;
        if (arr[pos] < target) lo = pos + 1;
        else hi = pos - 1;
    }
    return -1;
}`
};


const generateInterpolationSearchSteps = (initialArr: number[], textLang: string = 'vi', codeLang: string = 'python', target?: number): Step[] => {
  let arr = [...initialArr];
  let steps: Step[] = [];
  let t = target ?? arr[0];

  let lo = 0;
  let hi = arr.length - 1;

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [2, 3], [2], [2], [2]),
    explanation: textLang === 'en' ? `Initialize lo (low) pointing to 0, hi (high) pointing to ${hi}.` : `Khởi tạo con trỏ lo (low/biên thấp) ở đầu mảng, hi (high/biên cao) ở cuối mảng.`,
    range: [lo, hi]
  });

  while (lo <= hi && t >= arr[lo] && t <= arr[hi]) {
    steps.push({
      array: [...arr],
      activeIndices: [],
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [4], [3], [3], [3]),
      explanation: textLang === 'en' ? `Check condition: ${t} is within [${arr[lo]}, ${arr[hi]}].` : `Thỏa điều kiện: ${t} nằm trong biên độ giá trị [${arr[lo]}, ${arr[hi]}].`,
      range: [lo, hi]
    });

    if (lo === hi || arr[lo] === arr[hi]) {
      if (arr[lo] === t) {
            steps.push({
              array: [...arr],
              activeIndices: [lo],
              foundIndex: lo,
              sortedIndices: [],
              isSwapping: false,
              activeLines: getLines(codeLang, [6], [5], [5], [5]),
              explanation: textLang === 'en' ? `Found target ${t} at index ${lo}!` : `Đã tìm thấy ${t} tại ví trí ${lo}!`,
              range: [lo, hi]
            });
            return steps;
      }
      break;
    }

    let pos = lo + Math.floor(((hi - lo) / (arr[hi] - arr[lo])) * (t - arr[lo]));

    steps.push({
      array: [...arr],
      activeIndices: [pos],
      pivotIdx: pos,
      sortedIndices: [],
      isSwapping: false,
      activeLines: getLines(codeLang, [8], [8], [8], [8]),
      explanation: textLang === 'en' ? `Calculate pos using formula = ${pos}. arr[${pos}] is ${arr[pos]}.` : `Toán học nội suy ra vị trí thăm dò pos = ${pos}. arr[${pos}] là ${arr[pos]}.`,
      range: [lo, hi]
    });

    if (arr[pos] === t) {
      steps.push({
        array: [...arr],
        activeIndices: [pos],
        foundIndex: pos,
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [9, 10], [9], [9], [9]),
        explanation: textLang === 'en' ? `Found target ${t} at index ${pos}!` : `Đã tìm thấy ${t} tại ví trí ${pos}!`,
        range: [lo, hi]
      });
      return steps;
    }

    if (arr[pos] < t) {
      lo = pos + 1;
      steps.push({
        array: [...arr],
        activeIndices: [pos],
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [11, 12], [10], [10], [10]),
        explanation: textLang === 'en' ? `${arr[pos]} < ${t}. Search in the right segment (lo = ${lo}).` : `${arr[pos]} < ${t}. Dịch vùng thăm dò sang phải (lo = ${lo}).`,
        range: [lo, hi]
      });
    } else {
      hi = pos - 1;
      steps.push({
        array: [...arr],
        activeIndices: [pos],
        sortedIndices: [],
        isSwapping: false,
        activeLines: getLines(codeLang, [13, 14], [11], [11], [11]),
        explanation: textLang === 'en' ? `${arr[pos]} > ${t}. Search in the left segment (hi = ${hi}).` : `${arr[pos]} > ${t}. Dịch vùng thăm dò sang trái (hi = ${hi}).`,
        range: [lo, hi]
      });
    }
  }

  steps.push({
    array: [...arr],
    activeIndices: [],
    sortedIndices: [],
    isSwapping: false,
    activeLines: getLines(codeLang, [15], [13], [13], [13]),
    explanation: textLang === 'en' ? `Target ${t} not found in the array.` : `Không tìm thấy ${t} trong mảng.`,
    range: [lo, hi]
  });
  return steps;
};

export const SEARCH_ALGORITHMS: Algorithm[] = [
  {
    id: 'linear_search',
    type: 'search',
    name: 'Linear Search',
    complexities: { time: 'O(n)', space: 'O(1)' },
    codes: linearSearchCodes,
    generateSteps: generateLinearSearchSteps
  },
  {
    id: 'binary_search',
    type: 'search',
    requiresSorted: true,
    name: 'Binary Search',
    complexities: { time: 'O(log n)', space: 'O(1)' },
    codes: binarySearchCodes,
    generateSteps: generateBinarySearchSteps
  },
  {
    id: 'jump_search',
    type: 'search',
    requiresSorted: true,
    name: 'Jump Search',
    complexities: { time: 'O(√n)', space: 'O(1)' },
    codes: jumpSearchCodes,
    generateSteps: generateJumpSearchSteps
  },
  {
    id: 'interpolation_search',
    type: 'search',
    requiresSorted: true,
    name: 'Interpolation Search',
    complexities: { time: 'O(log(log n))', space: 'O(1)' },
    codes: interpolationSearchCodes,
    generateSteps: generateInterpolationSearchSteps
  }
];
