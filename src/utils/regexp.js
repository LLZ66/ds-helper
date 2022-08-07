function getDsPart(text) {
  // ds 分割后字符串
  const dsList = [];
  // dsReg match搜索字符串
  const dsRegList = [...text.matchAll(/new\s+DataSet/g)];
  dsRegList.reduce((pre, cur, index) => {
    if (pre) {
      dsList.push(text.slice(pre, cur.index));
    }
    if (index === dsRegList.length - 1) {
      dsList.push(text.slice(cur.index, text.length));
    }
    return cur.index;
  }, 0);
  for (let ds of dsList) {
    getRequireFields(ds);
  }
};

function getRequireFields(dsPart) {
  const required = [];
  const requiredFields = [{
    name: 'name',
    start: ["'", '"'],
    end: ["'", '"'],
  }, {
    name: "fields",
    start: "[",
    end: "]"
  }];
  const partLength = dsPart.length;
  requiredFields.forEach((pattern) => {
    let start, end;
    // const stack = [];
    const tempReg = new RegExp(`${pattern.name}\s*:\s*`);
    //匹配开始位置
    const index = dsPart.match(tempReg).index;
    // 匹配字段
    const patternPart = dsPart.slice(index, partLength);
    for (let strIndex in patternPart) {
      if(Array.isArray(pattern.start)) {
        if(pattern.start.includes(patternPart[strIndex]) && !start){
          start = Number(strIndex);
          continue;
        }else if(pattern.end.includes(patternPart[strIndex])) {
          end = Number(strIndex);
          if(start && end) {
            required.push([
              pattern.name,
              patternPart.slice(start, end+1)
            ])
            break;
          }
        };
      }else {
        if(pattern.start === patternPart[strIndex] && !start){
          start = Number(strIndex);
          continue;
        }else if(pattern.end === patternPart[strIndex]) {
          end = Number(strIndex);
          if(start && end) {
            required.push([
              pattern.name,
              patternPart.slice(start, end+1)
            ])
            break;
          }
        };
      }
    };
  });
  console.log(required);
}

module.exports = {
  getDsPart,
}