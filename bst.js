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
  data = parseInt(val);
  left = null;
  right = null;
  return { data, left, right };
};

const treeFactory = (arr) => {
  let rootNode = buildTree(arr, 0, arr.length - 1);

  const insert = (value, searcher = rootNode) => {
    value = parseInt(value);
    if (searcher === null) {
      searcher = nodeFactory(value);
      return searcher;
    }

    if (searcher.data < value) {
      searcher.right = insert(value, searcher.right);
    } else if (searcher.data > value) {
      searcher.left = insert(value, searcher.left);
    }
    return searcher;
  };

  const remove = (value, searcher = rootNode) => {
    //removal of a node has two cases
    // 1) the node has only one child
    //  -we copy the child to the node and delete the node
    //  2) the node has 2 children
    //  -we find the inorder predecessor of the node
    //  -we find the inorder successor of the node (if the right child is not null)
    //  -copy the value of this inorder successor to the node we want to delete
    //  -delete the inorder successor
    function minValue(node) {
      let minValue = node.data;
      while (node.left !== null) {
        minValue = node.left.data;
        node = node.left;
      }
      return minValue;
    }

    value = parseInt(value);
    //base case
    if (searcher === null) return searcher;

    if (searcher.data > value) {
      //delete into the left subtree
      searcher.left = remove(value, searcher.left);
    } else if (searcher.data < value) {
      //delete into the right subtree
      searcher.right = remove(value, searcher.right);
      //if both previous checks failed, we found the node we want to remove
    } else {
      //checks for 0 or 1 children node types
      if (searcher.left === null) return searcher.right;
      else if (searcher.right === null) return searcher.left;

      //for a node with 2 children - we get its inorder successor
      //  which is the smalles value in the node's right subtree
      searcher.data = minValue(searcher.right);

      //remove the node's inorder successor
      searcher.right = remove(searcher.data, searcher.right);
    }
    return searcher;
  };

  const find = (value, searcher = rootNode) => {
    value = parseInt(value);
    if (searcher === null || searcher.data === value) {
      return searcher;
    }

    if (searcher.data < value) {
      return find(value, searcher.right);
    }

    return find(value, searcher.left);
  };
  return { rootNode, insert, find, remove };
};

const buildTree = (arr, start, end) => {
  //if array length is 0 i.e. the 2 pointers have crossed over we return
  if (start > end) return null;

  //no overflow method of calculating mid
  let mid = parseInt((start + end) / 2);
  let node = nodeFactory(parseInt(arr[mid]));
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

const smallArr = [100, 20, 500, 10, 30];

sanitizedArr = arraySanitizer(smallArr);
console.log(sanitizedArr);

let tree = treeFactory(sanitizedArr);
prettyPrint(tree.rootNode);
console.log();
console.log();

tree.insert(40);
prettyPrint(tree.rootNode);

console.log();
console.log();

tree.remove(100);
prettyPrint(tree.rootNode);
