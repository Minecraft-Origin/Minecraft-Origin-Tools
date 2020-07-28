/**
 * 自定义延迟函数
 * @param {number} timeout 需要延迟的时间 (ms)
 */
export default function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
