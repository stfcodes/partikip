let WORDS = [
  'Join',
  'Going',
  'Particip',
  'Participa',
  'Participă',
  'Merg',
  'Ma duc',
  'Mă duc'
];

const upperRegex = new RegExp(`\\b(${WORDS.join('|')})\\b`);
const lowerRegex = new RegExp(`\\b(${WORDS.map(word => word.toLowerCase()).join('|')})\\b`);

// Original credits: http://is.gd/mwZp7E
let walk = (node) => {
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

let handleText = (textNode) => {
  let oldValue = textNode.nodeValue;
  let replaced = oldValue;

  replaced = replaced.replace(upperRegex, "Partikip");
  replaced = replaced.replace(lowerRegex, "partikip");
  if (replaced !== oldValue) {
    textNode.nodeValue = replaced;
  }
};

walk(document.body);

if (window.MutationObserver) {
  let observer = new MutationObserver(function (mutations) {
    Array.prototype.forEach.call(mutations, (m) => {
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
