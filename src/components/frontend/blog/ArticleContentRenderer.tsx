'use client';

import React, { useMemo } from 'react';

interface ArticleContentRendererProps {
  content: string;
}

export function ArticleContentRenderer({ content }: ArticleContentRendererProps) {
  // Parse markdown into clean semantic HTML sections with anchor IDs
  const parsedElements = useMemo(() => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;
    let tableRows: string[][] = [];
    let inTable = false;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          elements.push(
            <p key={`p-${elements.length}`} className="font-sans text-[16px] sm:text-[17px] leading-[1.85] text-[#3A3530] mb-6 select-text">
              {formatInlineStyles(text)}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList && currentList.items.length > 0) {
        if (currentList.type === 'ul') {
          elements.push(
            <ul key={`ul-${elements.length}`} className="list-disc pl-6 space-y-2 mb-6 font-sans text-[15.5px] sm:text-[16.5px] text-[#3A3530] select-text">
              {currentList.items.map((it, idx) => (
                <li key={idx} className="leading-relaxed">
                  {formatInlineStyles(it)}
                </li>
              ))}
            </ul>
          );
        } else {
          elements.push(
            <ol key={`ol-${elements.length}`} className="list-decimal pl-6 space-y-2 mb-6 font-sans text-[15.5px] sm:text-[16.5px] text-[#3A3530] select-text">
              {currentList.items.map((it, idx) => (
                <li key={idx} className="leading-relaxed">
                  {formatInlineStyles(it)}
                </li>
              ))}
            </ol>
          );
        }
        currentList = null;
      }
    };

    const flushTable = () => {
      if (tableRows.length > 0) {
        const [headers, , ...body] = tableRows;
        elements.push(
          <div key={`table-${elements.length}`} className="w-full overflow-x-auto my-8 border border-[#DDD5C7] rounded-[4px] bg-[#FCFAF6]">
            <table className="w-full text-left font-sans text-[13.5px] border-collapse">
              {headers && (
                <thead className="bg-[#EAE4D9]/60 border-b border-[#DDD5C7]">
                  <tr>
                    {headers.map((h, i) => (
                      <th key={i} className="py-3 px-4 font-semibold text-[#292722] uppercase tracking-[0.12em] text-[11px]">
                        {formatInlineStyles(h.trim())}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-[#EDE7DC]">
                {body.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#F7F4EE]/50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-3 px-4 text-[#4A443E]">
                        {formatInlineStyles(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Empty line breaks paragraphs
      if (!line) {
        flushParagraph();
        flushList();
        if (inTable) flushTable();
        continue;
      }

      // Horizontal Divider
      if (line === '---' || line === '***') {
        flushParagraph();
        flushList();
        if (inTable) flushTable();
        elements.push(<hr key={`hr-${elements.length}`} className="my-10 border-t border-[#DDD5C7]" />);
        continue;
      }

      // Blockquote
      if (line.startsWith('>')) {
        flushParagraph();
        flushList();
        if (inTable) flushTable();
        const quoteText = line.replace(/^>\s*/, '');
        elements.push(
          <blockquote 
            key={`quote-${elements.length}`} 
            className="my-8 py-4 px-6 border-l-2 border-[#8F5E3B] bg-[#FCFAF6] font-serif text-[19px] sm:text-[21px] leading-[1.5] text-[#292722] italic rounded-r-[3px]"
          >
            {formatInlineStyles(quoteText)}
          </blockquote>
        );
        continue;
      }

      // Headings H1, H2, H3
      if (line.startsWith('#')) {
        flushParagraph();
        flushList();
        if (inTable) flushTable();

        const match = line.match(/^(#{1,3})\s+(.*)$/);
        if (match) {
          const level = match[1].length;
          const headingText = match[2];
          const anchorId = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

          if (level === 1) {
            elements.push(
              <h1 key={`h1-${elements.length}`} id={anchorId} className="scroll-mt-28 font-serif text-[28px] sm:text-[34px] text-[#292722] font-normal tracking-tight mt-10 mb-4">
                {headingText}
              </h1>
            );
          } else if (level === 2) {
            elements.push(
              <h2 key={`h2-${elements.length}`} id={anchorId} className="scroll-mt-28 font-serif text-[24px] sm:text-[28px] text-[#292722] font-normal tracking-tight mt-10 mb-4">
                {headingText}
              </h2>
            );
          } else {
            elements.push(
              <h3 key={`h3-${elements.length}`} id={anchorId} className="scroll-mt-28 font-serif text-[20px] sm:text-[23px] text-[#292722] font-normal tracking-tight mt-8 mb-3">
                {headingText}
              </h3>
            );
          }
          continue;
        }
      }

      // Markdown Tables (| ... |)
      if (line.startsWith('|') && line.endsWith('|')) {
        flushParagraph();
        flushList();
        inTable = true;
        const cells = line.slice(1, -1).split('|');
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        flushTable();
      }

      // Unordered list item (- or *)
      if (line.startsWith('- ') || line.startsWith('* ')) {
        flushParagraph();
        const item = line.slice(2);
        if (!currentList || currentList.type !== 'ul') {
          flushList();
          currentList = { type: 'ul', items: [item] };
        } else {
          currentList.items.push(item);
        }
        continue;
      }

      // Ordered list item (1. 2. etc)
      if (/^\d+\.\s+/.test(line)) {
        flushParagraph();
        const item = line.replace(/^\d+\.\s+/, '');
        if (!currentList || currentList.type !== 'ol') {
          flushList();
          currentList = { type: 'ol', items: [item] };
        } else {
          currentList.items.push(item);
        }
        continue;
      }

      // Standard paragraph lines
      currentParagraph.push(line);
    }

    flushParagraph();
    flushList();
    if (inTable) flushTable();

    return elements;
  }, [content]);

  return <div className="article-body select-text">{parsedElements}</div>;
}

// Inline formatting for **bold**, *italic*, and [links](url)
function formatInlineStyles(text: string): React.ReactNode {
  // Simple regex parser for bold, italic, and links
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(<strong key={match.index} className="font-semibold text-[#292722]">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(<em key={match.index} className="italic text-[#94745F]">{token.slice(1, -1)}</em>);
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkMatch = token.match(/\[(.*?)\]\((.*?)\)/);
      if (linkMatch) {
        parts.push(
          <a key={match.index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer" className="text-[#8F5E3B] underline underline-offset-2 hover:text-[#784B2B]">
            {linkMatch[1]}
          </a>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}
