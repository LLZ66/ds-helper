/*
 * @Author: 刘涟洲 1228429427@qq.com
 * @Date: 2022-09-23 15:31:18
 * @LastEditors: 刘涟洲 1228429427@qq.com
 * @LastEditTime: 2022-09-23 15:55:48
 * @FilePath: \ds-helper\src\regexp.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
function getDsPart (text) {
  const queue = [];
  let start,end;
  for(let strIndex in text) {
    if(text[strIndex] === "{") {
      queue.push("{");
      if(!start) {
        start = strIndex;
      }
      continue;
    }else if(text[strIndex] === "}") {
      queue.pop();
      if(!queue.length && start) {
        end = strIndex;
        break;
      };
    }
  };
  return text.slice(start, Number(end)+1);
};

module.exports = {
  getDsPart,
}