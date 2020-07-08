import marked from 'marked';


const lexer = new marked.Lexer();


export default function parseMarkdown(markdownStr) {
  return lexer.lex(markdownStr);
}
