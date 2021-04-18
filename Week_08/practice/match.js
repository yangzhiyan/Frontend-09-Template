function match (string) {
  let state = start;
  for (let c of string) {
    state = state(c);
  }
  return state === end;
}

function start (c) {
  if (c === 'a')
    return foundA;
  else
    return start;
}
// end 状态永远返回end 这样这个状态叫做一个trap（陷阱），一旦进入end状态，就再也不会进入别的状态
// 如果找到 abcdef 不管后面有多少字符，都是已经找到的状态
function end (c) {
  return end;
}

function foundA (c) {
  if (c === 'b')
    return foundB;
  else
    return start(c);
}

function foundB (c) {
  if (c === 'c')
    return foundC;
  else
    return start(c);
}

function foundC (c) {
  if (c === 'd')
    return foundD;
  else
    return start(c);
}

function foundD (c) {
  if (c === 'e')
    return foundE;
  else
    return start(c);
}

function foundE (c) {
  if (c === 'f')
    return end;
  else
    return start(c);
}

