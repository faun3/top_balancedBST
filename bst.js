const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function uniq(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

const nodeFactory = (val) => {
  data = val;
  left = null;
  right = null;
  return { data, left, right };
};

const treeFactory = (arr) => {
  node = buildTree(arr, 0, arr.length - 1);
  return node;
};

const buildTree = (arr, start, end) => {
  //if array length is 0 i.e. the 2 pointers have crossed over we return
  if (start > end) return null;

  //no overflow method of calculating mid
  let mid = parseInt((start + end) / 2);
  let node = nodeFactory(arr[mid]);
  node.left = buildTree(arr, start, mid - 1);
  node.right = buildTree(arr, mid + 1, end);
  return node;
};

const arraySanitizer = (arr) => {
  //remove duplicates
  arr = uniq(arr);
  //sort array
  //  default sort is using string value comparison; we pass in this function
  //  as an argument to sort to ensure that we sort by numeric value
  arr.sort((a, b) => {
    return a - b;
  });
  return arr;
};

const array1 = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
sanitizedArr = arraySanitizer(array1);
console.log(sanitizedArr);
let tree = treeFactory(sanitizedArr);
prettyPrint(tree);
