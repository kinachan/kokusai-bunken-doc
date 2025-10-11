import { Tokens, TokensList, marked, RendererObject } from 'marked';


interface Toc {
  text: string;
  depth: number;
  children: Toc[];
}

const createTagString = (tagName: string, text: string, attributes: { [key: string]: any } = {}) => {
  const attr = Object.keys(attributes).map(key => {
    const value = attributes[key];
    if (value == null) return '';

    return `${key}="${value}"`
  }).join(' ').trim();

  const tagStart = `${tagName} ${attr}`.trim();

  return `<${tagStart}>${text}</${tagName}>`
}

const createHeadingTagId = (text: string, level: number) => {
  return text.replaceAll(/\s/g, '') + level;
}

const escapeTest = /[&<>"']/;
const escapeReplace = new RegExp(escapeTest.source, 'g');
const escapeReplacements: { [index: string]: string } = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};
const getEscapeReplacement = (ch: string) => escapeReplacements[ch];
const escapeTestNoEncode = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/;
const escapeReplaceNoEncode = new RegExp(escapeTestNoEncode.source, 'g');

const escape = (html: string, encode?: boolean) => {
  if (encode) {
    if (escapeTest.test(html)) {
      return html.replace(escapeReplace, getEscapeReplacement);
    }
  } else {
    if (escapeTestNoEncode.test(html)) {
      return html.replace(escapeReplaceNoEncode, getEscapeReplacement);
    }
  }

  return html;
}

const renderer: RendererObject = {
  text: (text) => {
    return text.replace(/\/\/\s?TODO\s?:(.*)/g, `<span class="todo-highlight has-text-danger has-background-danger-light">!TODO! $1</span>`);
  },
  link: (href, title, text) => {
    const attris: { [key: string]: string | null | undefined } = {
      href: href,
      title: title,
    };

    const isAbsolute = href.indexOf('http') === 0;

    if (isAbsolute) {
      attris.target = '_blank';
    }
    return createTagString('a', text, attris);
  },
  heading: (text, level, raw) => {
    let tagHead = `h${level}`;
    return createTagString(
      tagHead,
      text, { 
        class: `is-size-${level}`, 
        id: createHeadingTagId(text, level),
      }
    );
  },
  checkbox: (checked: boolean) => {
    const checkedAtrrs = checked ? { checked: 'checked' } : {}
    return createTagString('input', '', { type: 'checkbox', class: 'checkbox', ...checkedAtrrs })
  },
  hr: () => {
    return createTagString('hr', '', { class: 'horizontal-rule' })
  },
  image: (href, title, text) => {
    // 非同期で読み込みさせる
    return createTagString('img', '', {
      src: href,
      alt: text,
      decoding: 'async',
    })
  },
  table: (header, body) => {
    return createTagString('div',
      createTagString('table', header + body, { class: 'table is-bordered is-hoverable' }),
      {class: 'table-container'}
    );
  },
  code: (code, infostring, escaped) => {
    const lang = (infostring || '').match(/^\S*/)?.[0];
    const replacedCode = code.replace(/\n$/, '') + '\n';
    if (lang) {
      if (lang === 'mermaid') {
        return `<div class="mermaid">${code}</div>`
      }
    }

    if (!lang) {
      return '<pre><code>'
        + (escaped ? replacedCode : escape(replacedCode, true))
        + '</code></pre>\n';
    }

    return '<pre><code class="language-'
      + escape(lang)
      + '">'
      + (escaped ? replacedCode : escape(replacedCode, true))
      + '</code></pre>\n';
  }
}


const generateHTMLList = (toc: Toc[]): string => {
  if (toc.length === 0) return '';

  return `<ul>` + toc.map(item => `
    <li><a href="#${createHeadingTagId(item.text, item.depth)}">${item.text}
      ${item.children && item.children.length > 0 ? generateHTMLList(item.children) : ''}
    </a></li>`).join('') + `</ul>`;
}


export const toHtml = (file: string) => {

  const headTokens: Tokens.Heading[] = [];

  marked.use({
    renderer: renderer,
    breaks: true,
    walkTokens: (token) => {
      if (token.type === 'heading') {
        const headToken = token as Tokens.Heading;
        headTokens.push(headToken);
      }
    }
  });

  const parsed = marked.parse(file);

  const tocList: Toc[] = [];
  const stack: Toc[] = [];

  headTokens.forEach(({ text, depth }) => {
    const item: Toc = { text, depth, children: [] };
    
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }
    
    if (stack.length === 0) {
      tocList.push(item);
    } else {
      stack[stack.length - 1].children?.push(item);
    }
    
    stack.push(item);
  });


  const tocTag = generateHTMLList(tocList);

  const toc = tocList.length === 0 ? '' : `
  <div class="toc" id="toc">
    <h3>目次</h3>
    ${tocTag}
  </div>
  `
  return toc + parsed;
}