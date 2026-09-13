// 本地 Remark 插件：支持高亮、上标、下标（无外部依赖）

function visitNode(node, type, callback) {
  if (node.type === type) {
    callback(node);
  }
  if (node.children) {
    node.children.forEach(child => visitNode(child, type, callback));
  }
}

// ==高亮文本== → <mark>高亮文本</mark>
export function remarkMark() {
  return (tree) => {
    visitNode(tree, 'text', (node) => {
      if (!node.value || !node.value.includes('==')) return;
      node.value = node.value.replace(/==([^=]+)==/g, '<mark>$1</mark>');
      node.type = 'html';
    });
  };
}

// X^2^ → <sup>2</sup>  和  H~2~O → H<sub>2</sub>O
export function remarkSubSuper() {
  return (tree) => {
    visitNode(tree, 'text', (node) => {
      if (!node.value) return;
      if (!node.value.includes('^') && !node.value.includes('~')) return;
      
      node.value = node.value
        .replace(/\^([^^]+)\^/g, '<sup>$1</sup>')
        .replace(/~([^~]+)~/g, '<sub>$1</sub>');
      
      if (node.value.includes('<su')) {
        node.type = 'html';
      }
    });
  };
}
