walk(document.body);

if (window.MutationObserver) {
  let observer = new MutationObserver(function (mutations) {
    Array.prototype.forEach.call(mutations, function (m) {
      if (m.type === 'childList') {
        walk(m.target);
      } else if (m.target.nodeType === 3) {
        handleText(m.target);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    attributes: false,
    characterData: true,
    subtree: true
  });
};

// Original credits: http://is.gd/mwZp7E
function walk(node) {
  let child, next;

  if (node.tagName === 'INPUT' || node.tagName == 'TEXTAREA') {
    return;
  }

  switch ( node.nodeType ) {
    case 1:  // Element
    case 9:  // Document
    case 11: // Document fragment
      child = node.firstChild;
      while ( child )
      {
        next = child.nextSibling;
        walk(child);
        child = next;
      }
      break;

    case 3: // Text node
      handleText(node);
      break;
  }
};

function handleText(textNode) {
  let oldValue = textNode.nodeValue;
  let replaced = oldValue.replace(/\b(going|join)\b/ig, "Partikip");;

  replaced = replaced

  if (replaced !== oldValue) {
    textNode.nodeValue = replaced;
  }
};
