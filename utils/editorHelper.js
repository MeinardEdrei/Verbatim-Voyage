export const edjsParser = {
  parse: (blocks) => {
    return blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return `<p>${block.data.text}</p>`;
        case 'header':
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case 'list':
          const listItems = block.data.items
            .map(item => `<li>${item.content}</li>`)
            .join('');
          return block.data.style === 'ordered' 
            ? `<ol>${listItems}</ol>` 
            : `<ul>${listItems}</ul>`;
        case 'image':
          return `<figure>
            <img src="${block.data.file.url}" alt="${block.data.caption || ''}" />
            ${block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : ''}
          </figure>`;
        case 'delimiter':
          return '<div id="delimiter">* * *</div>';
        default:
          return 'This line is not currently supported';
      }
    }).join('');
  }
};