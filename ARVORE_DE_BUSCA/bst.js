/*
ARVORE BINARIA DE BUSCA
Nó a esquerda é menor
Nó a direita é maior
*/

class Node {
    //valores padrao de left e right
    constructor(data, left = null, right = null) {
        this.data = data; //informacao contida
        this.left = left; //filho a esquerda
        this.right = right; //filho a direita
    }
}

class BST {
    //arvore inicia com raiz null
    constructor() {
        this.root = null;
    }

    add(data) {
        const node = this.root;
        //ao adicionar pela primeira vez
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            //funcao recursiva para percorrer a arvore
            const searchTree = function (node) {
                //se o que esta inserindo for menor, olha a esquerda
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                    //se o que esta inserindo for menor, olha a direita
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node); //passa a funcao começando pela raiz
        }
    }

    //encontra o menor valor da BST, basta percorrer o lado esquerdo da arvore
    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }

    //encontra o menor valor da BST, basta percorrer o lado direito da arvore
    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }


    
    find(data) {
        let current = this.root;
        //o valor de current é alterado conforme o valor de data
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            //caso chegue no nó folha e nao encontra o valor procurado
            if (current === null) {
                return null;
            }
        }
        //se o current data === data
        return current;
    }

    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }


    remove(data) {
        const removeNode = function (node, data) {
            //se a raiz for vazia, nao tem como remover
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                // nó sem filho
                if (node.left == null && node.right == null) {
                    return null;
                }
                // nó sem filho da esquerda
                if (node.left == null) {
                    return node.right;
                }
                // nó sem o filho da direita
                if (node.right == null) {
                    return node.left;
                }
                // se o nó tem dois filhos, temos que fazer a inversao
                var tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;



            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        }
        this.root = removeNode(this.root, data);
    }

    // uma arvore balanceada possui as alturas de cada subarvore esq e direita com diferença de 1
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }


    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }



    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        };
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        };
    }


    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traverseInOrder(node) {
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        };
    }
    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traversePreOrder(node) {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            };
            traversePreOrder(this.root);
            return result;
        };
    }
    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            var result = new Array();

            function traversePostOrder(node) {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            };
            traversePostOrder(this.root);
            return result;
        }
    }

    //para imprimir em levelOrder, tenho que usar um fila para ir adicionando os elementos
    levelOrder() {
        let result = [];
        let Q = []; //esse aray conterá temporariamente os nós cujas informações serão extraídas
        //verificação se a bst é vazia
        if (this.root != null) {
            Q.push(this.root);
            while (Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                };
                if (node.right != null) {
                    Q.push(node.right);
                };
            };
            return result;
        } else {
            return null;
        };
    };
}



const bst = new BST();

bst.add(9);
bst.add(4);
bst.add(17);
bst.add(3);
bst.add(6);
bst.add(22);
bst.add(5);
bst.add(7);
bst.add(20);

console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());
bst.add(10);
console.log(bst.findMinHeight());
console.log(bst.findMaxHeight());
console.log(bst.isBalanced());


console.log('inOrder: ' + bst.inOrder());
console.log('preOrder: ' + bst.preOrder());
console.log('postOrder: ' + bst.postOrder());

console.log('levelOrder: ' + bst.levelOrder());