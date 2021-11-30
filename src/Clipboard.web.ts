declare var navigator: {
  clipboard: {
    readText(): Promise<string>;
    writeText(data: string): Promise<void>;
  };
};

declare var document: any;

type ContentType = 'text' | 'html';

/**
 * Set content on the Clipboard.
 * @param {ContentType} type - type of the content
 * @param {string} content - Context to be copied
 */
function copyContent(type: ContentType, content: string) {
  // add the text to a hidden node
  const node = document.createElement(type === 'text' ? 'span' : 'div');
  if (type === 'text') {
    node.value = content;
  } else {
    node.innerHTML = content;
    // Reset box-model
    node.style.margin = '0';
    node.style.padding = '0';
    node.style.border = '0';
    // No touches.
    node.style.pointerEvents = 'none';
  }
  node.style.opacity = '0';
  node.style.position = 'absolute';
  node.style.whiteSpace = 'pre-wrap';
  node.style.userSelect = 'auto';
  document.body.appendChild(node);

  // select the text
  const selection = window.getSelection();
  selection.removeAllRanges();
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
  try {
    document.execCommand('copy');
  } catch {}
  // remove selection and node
  selection.removeAllRanges();
  document.body.removeChild(node);
}

export const Clipboard = {
  getString(): Promise<string> {
    if (navigator && navigator.clipboard) {
      return navigator.clipboard.readText();
    } else {
      const el = document.createElement('textarea');
      document.body.appendChild(el);
      el.select();
      document.execCommand('paste');
      const value = el.innerText;
      document.body.removeChild(el);
      return Promise.resolve(value);
    }
  },

  setString(content: string) {
    if (navigator && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      copyContent('text', content);
    }
  },

  setHTML(content: string) {
    copyContent('html', content);
  },
};
