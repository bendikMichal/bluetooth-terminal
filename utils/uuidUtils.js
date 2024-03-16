import { _retrieveData, _storeData } from "./asyncStorage"

let UUID;
const __UUID__ = "__UUID__";

const init = async () => {
  UUID = await _retrieveData(__UUID__, "0");
}


export const getNewUUID = () => {
  // there is a bug w/ it being NaN
  UUID = `${(parseFloat(UUID) ?? 0) + 1}`;
  _storeData(__UUID__, UUID);

  return UUID
}

init();