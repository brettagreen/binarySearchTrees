class Node {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinarySearchTree {
	constructor(root = null) {
		this.root = root;
	}

	/** insert(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses iteration. */

	insert(val) {
		const node = new Node(val);
		if (!this.root) {
			this.root = node;
			return this;
		} else {
			let current = this.root;
			while (current) {
				
				if (node.val < current.val) {
					if (current.left === null) {
						current.left = node;
						return this;
					} else {
						current = current.left;
					}
				} else if (node.val > current.val) {
					if (current.right === null) {
						current.right = node;
						return this;
					} else {
						current = current.right;
					}
				}
			}
		}
	}

	/** insertRecursively(val): insert a new node into the BST with value val.
	 * Returns the tree. Uses recursion. */

	insertRecursively(val) {
		const node = new Node(val);
		if (!this.root) {
			this.root = node;
			return this;
		} else {
			walkTheTree(this.root);
			return this;
		}

		function walkTheTree(current) {
			if (current.val < node.val) {
				if (!current.right) {
					current.right = node;
					return
				} else {
					current = current.right;
					return walkTheTree(current);
				}
			} else {
				if (!current.left) {
					current.left = node;
					return
				} else {
					current = current.left;
					return walkTheTree(current);
				}

			}
		}

	}

	/** find(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses iteration. */

	find(val) {
		let current = this.root;
		while (current) {
			if (current.val === val) {
				return current;
			}
			current = val < current.val ? current.left : current.right;
		}
	}

	/** findRecursively(val): search the tree for a node with value val.
	 * return the node, if found; else undefined. Uses recursion. */

	findRecursively(val) {
		let current = this.root;
		return walkTheTree(current);

		function walkTheTree(current) {
			if (!current) {
				return undefined;
			}
			if (current.val === val) {
				return current;
			}
			return walkTheTree(val < current.val ? current.left : current.right);
		}

	}

	/** dfsPreOrder(): Traverse the array using pre-order DFS.
	 * Return an array of visited node values. */

	dfsPreOrder() {
		const nodes = [this.root.val];
		let node = this.root;
		traverse(node);
		function traverse(node) {
			if (node.left) {
				nodes.push(node.left.val);
				traverse(node.left);
			}
			if (node.right) {
				nodes.push(node.right.val);
				traverse(node.right);
			}
		}
		return nodes;
	}

	/** dfsInOrder(): Traverse the array using in-order DFS.
	 * Return an array of visited node values. */

	dfsInOrder() {
		const nodes =[]
		traverse(this.root);
		function traverse(node) {
			if (node.left) {
				traverse(node.left);
			}
			nodes.push(node.val);
			if (node.right) {
				traverse(node.right);
			}
		}
		return nodes;
	}

	/** dfsPostOrder(): Traverse the array using post-order DFS.
	 * Return an array of visited node values. */

	dfsPostOrder() {
		const nodes =[]

		traverse(this.root);

		function traverse(node) {
			if (node.left) {
				traverse(node.left);
			}
			if (node.right) {
				traverse(node.right);
			}
			nodes.push(node.val);
		}
		return nodes;
	}

	/** bfs(): Traverse the array using BFS.
	 * Return an array of visited node values. */
	//1. root 2. left --> right 3. right --> etc.
	// snake pattern top to bottom.

	bfs() {
		const nodes =[this.root.val];
		traverse(this.root.left, this.root.right, 2);

		function traverse(nodeLeft, nodeRight, level) {
			if (level % 2 === 0) {
				if (nodeLeft) nodes.push(nodeLeft.val);
				if (nodeRight) nodes.push(nodeRight.val);

				if (nodeRight) {
					if (nodeRight.right && nodeRight.left) {
						traverse(nodeRight.left, nodeRight.right, level++);
					} else if (nodeRight.right) {
						traverse(null, nodeRight.right, level++);
					} else if (nodeRight.left) {
						traverse(nodeRight.left, null, level++);
					}
				}

				if (nodeLeft) {
					if (nodeLeft.right && nodeLeft.left) {
						traverse(nodeLeft.left, nodeLeft.right, level++);
					} else if (nodeLeft.right) {
						traverse(null, nodeLeft.right, level++);
					} else if (nodeLeft.left) {
						traverse(nodeLeft.left, null, level++);
					}
				}

			} else {
				if (nodeRight) nodes.push(nodeRight.val);
				if (nodeLeft) nodes.push(nodeLeft.val);

				if (nodeLeft) {
					if (nodeLeft.right && nodeLeft.left) {
						traverse(nodeLeft.left, nodeLeft.right, level++);
					} else if (nodeLeft.right) {
						traverse(null, nodeLeft.right, level++);
					} else if (nodeLeft.left) {
						traverse(nodeLeft.left, null, level++);
					}
				}
				
				if (nodeRight) {
					if (nodeRight.right && nodeRight.left) {
						traverse(nodeRight.left, nodeRight.right, level++);
					} else if (nodeRight.right) {
						traverse(null, nodeRight.right, level++);
					} else if (nodeRight.left) {
						traverse(nodeRight.left, null, level++);
					}
				}

			}

		}
		return nodes;
	}

	/** Further Study!
	 * remove(val): Removes a node in the BST with the value val.
	 * Returns the removed node. */
	// can come back to this one and code an algorithm than more effectively balances out the 
	// tree, but this works for now.

	remove(val) {
		let current = this.root;
		let former = null;
		let aspect = 'head'
		while (current) {
			if (current.val === val) {
				if (aspect === 'head') {
					const left = current.left ? current.left : null;
					const right = current.right ? current.right : null;

					if (left) {
						const leftLeft = left.left ? left.left : null;
						const leftRight = left.right ? left.right : null;
						this.root = left; //arbitrary, could also choose right for new root
						left.right = right;
						if (leftRight) {
							left.left = leftRight;
							leftRight.left = leftLeft;
						} else {
							left.left = leftLeft;
						}
					} else if (right) {
						const rightRight = right.right ? right.right : null;
						const rightLeft = right.left ? right.left : null;
						this.root = right;
						right.left = left;
						if (rightLeft) {
							right.right = rightLeft;
							rightLeft.right = rightRight;
						} else {
							right.right = rightRight;
						}
					} else {
						return current; //one node lol
					}
				} else if (aspect === 'left') {
					const left = current.left ? current.left : null;
					const right = current.right ? current.right : null;
					const leftChild = right.left ? right.left : null;
					if (right) {
						former.left = right;
						right.left = left;
						if (leftChild) right.right.left = leftChild;
					} else {
						former.left = left;
					}
				} else {
					const left = current.left ? current.left : null;
					const right = current.right ? current.right : null;
					const rightChild = left.right ? left.right : null;
					if (left) {
						former.right = left
						left.right = right; 
						if (rightChild) left.left.right = rightChild;
					} else {
						former.right = right;
					}
				}
				return current;
			} else {
				former = current;
				[current, aspect] = val < current.val ? [current.left, 'left'] : [current.right, 'right'];
			}
		}
	}

	/** Further Study!
	 * isBalanced(): Returns true if the BST is balanced, false otherwise. */
	//springboard never defined what a balanced binary search tree looks like. here is the definition:
	//A balanced binary tree is the binary tree where the depth of the two subtrees of every node never differ by more than 1

	isBalanced() {
		if (!this.root) return 'lolwut';
		const nodeLeft = this.root.left;
		const nodeRight = this.root.right;
		if (!nodeLeft && !nodeRight) return true;
		const leftCount = nodeLeft ? traverse(nodeLeft, 1) : 0;
		const rightCount = nodeRight ? traverse(nodeRight, 1) : 0;

		function traverse(node, level) {
			let count1;
			let count2;

			if (node.right) {
				count1 = traverse(node.right, level+1);
			}

			if (node.left) {
				count2 = traverse(node.left, level+1);
			}

			if (!node.left && !node.right) {
				return level;
			}

			count1 = count1 ? count1 : 0;
			count2 = count2 ? count2 : 0;
			return count1 > count2 ? count1 : count2;
		}

		return leftCount === rightCount || leftCount + 1 === rightCount || leftCount - 1 === rightCount;
	}

	/** Further Study!
	 * findSecondHighest(): Find the second highest value in the BST, if it exists.
	 * Otherwise return undefined. */

	findSecondHighest() {
		if (!this.root || (!this.root.left && !this.root.right)) return;
		let node = this.root;
		let highestVal = node.val;
		let secondHighestVal = node.val;

		traverse(node);

		function traverse(node) {
			if (node.val > secondHighestVal) {
				if (node.val > highestVal) {
					secondHighestVal = highestVal;
					highestVal = node.val;
				} else {
					secondHighestVal = node.val;
				}
			}

			if (node.left) {
				traverse(node.left);
			}

			if (node.right) {
				traverse(node.right);
			}

		}
		return secondHighestVal;
	}
}

module.exports = BinarySearchTree;
