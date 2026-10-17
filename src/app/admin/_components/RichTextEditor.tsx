"use client";
import { useEffect, useRef } from 'react';

function escapeHtml(text: string) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Converts WhatsApp-style plain text (*bold*, _italic_, ~strike~) into paragraphs of HTML. */
export function whatsappToHtml(text: string) {
  const inline = (line: string) =>
    escapeHtml(line)
      .replace(/\*([^*\n]+)\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,!?:;]|$)/g, '$1<em>$2</em>')
      .replace(/~([^~\n]+)~/g, '<s>$1</s>');
  return text
    .replace(/\r\n?/g, '\n')
    .split(/\n{2,}/)
    .map(block => block.trim())
    .filter(Boolean)
    .map(block => `<p>${block.split('\n').map(inline).join('<br>')}</p>`)
    .join('');
}

const TOOLS: Array<{ label: string; title: string; run: () => void; className?: string }> = [
  { label: 'B', title: 'Bold', run: () => document.execCommand('bold'), className: 'font-bold' },
  { label: 'I', title: 'Italic', run: () => document.execCommand('italic'), className: 'italic' },
  { label: 'U', title: 'Underline', run: () => document.execCommand('underline'), className: 'underline' },
  { label: 'H2', title: 'Heading', run: () => document.execCommand('formatBlock', false, 'h2') },
  { label: 'H3', title: 'Subheading', run: () => document.execCommand('formatBlock', false, 'h3') },
  { label: '¶', title: 'Normal paragraph', run: () => document.execCommand('formatBlock', false, 'p') },
  { label: '• List', title: 'Bulleted list', run: () => document.execCommand('insertUnorderedList') },
  { label: '1. List', title: 'Numbered list', run: () => document.execCommand('insertOrderedList') },
  { label: '“ ”', title: 'Quote', run: () => document.execCommand('formatBlock', false, 'blockquote') },
  {
    label: 'Link',
    title: 'Add link',
    run: () => {
      const url = window.prompt('Link address (https://…)');
      if (url) document.execCommand('createLink', false, url);
    },
  },
  { label: '—', title: 'Divider', run: () => document.execCommand('insertHorizontalRule') },
  { label: 'Clear', title: 'Clear formatting', run: () => document.execCommand('removeFormat') },
];

interface RichTextEditorProps {
  /** Initial HTML. The editor re-reads it only when `resetKey` changes. */
  value: string;
  resetKey: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, resetKey, onChange, placeholder }: RichTextEditorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.innerHTML = value;
    // Only reset content when switching documents, not on every keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const emit = () => onChange(ref.current?.innerHTML ?? '');

  return (
    <div className="overflow-hidden rounded-xl border border-gray-300 bg-white focus-within:border-[#FF602E] focus-within:ring-2 focus-within:ring-[#FF602E]/20">
      <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1.5">
        {TOOLS.map(tool => (
          <button
            key={tool.title}
            type="button"
            title={tool.title}
            onMouseDown={e => e.preventDefault()}
            onClick={() => {
              ref.current?.focus();
              tool.run();
              emit();
            }}
            className={`rounded-md px-2 py-1 text-xs text-gray-700 hover:bg-white hover:shadow-sm ${tool.className ?? ''}`}
          >
            {tool.label}
          </button>
        ))}
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        onInput={emit}
        onBlur={emit}
        onPaste={e => {
          const html = e.clipboardData.getData('text/html');
          const text = e.clipboardData.getData('text/plain');
          if (html && !/\*[^*\n]+\*/.test(text)) return;
          e.preventDefault();
          document.execCommand('insertHTML', false, whatsappToHtml(text));
          emit();
        }}
        className="rich-content rich-content--light min-h-[320px] max-h-[60vh] overflow-y-auto px-4 py-3 text-base"
      />
    </div>
  );
}
