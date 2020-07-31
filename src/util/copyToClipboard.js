import Clipboard from 'clipboard';


export function copyInnerHTMLToClipboard(event) {
  const clipboard = new Clipboard(event.target);

  clipboard.on('success', () => {
    this.$message.success('复制成功 !');
    clipboard.destroy();
  });

  clipboard.on('error', () => {
    this.$message.error('复制失败 !');
    clipboard.destroy();
  });

  clipboard.onClick(event);
}
