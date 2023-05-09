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

const nodeFactory = (val) => {
  value = val;
  left = null;
  right = null;
  return { value, left, right };
};

const treeFactory = (arr) => {
  root = buildTree(arr);
  return root;
};

const buildTree = (arr) => {
  if (arr.length === 0) return;

  mid = arr.length / 2;
  root = nodeFactory(arr[mid]);
  rightSubtree = arr.splice(0, mid);
  leftSubtree = arr;
  root.left = buildTree(leftSubtree);
  root.right = buildTree(rightSubtree);
  return root;
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

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
sanitizedArr = arraySanitizer(array);
console.log(arraySanitizer(sanitizedArr));
//let bst = treeFactory(sanitizedArr);
//prettyPrint(bst);

function uniq(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}
