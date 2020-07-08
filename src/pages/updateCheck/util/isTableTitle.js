/**
 * 判断名称是否和传入 HTML 结构及内容匹配
 * @param {*} title 名称
 * @param {*} htmlStr HTML 字符串
 */
export default function isTableTitle(title, htmlStr) {
  const template = document.createElement('template'); // eslint-disable-next-line indent
        template.innerHTML = htmlStr;
  const fragment = document.importNode(template.content, true);

  if (fragment.firstElementChild.nodeName.toUpperCase() === 'H3' && fragment.firstElementChild.textContent.trim() === title) {
    return true;
  }
}
