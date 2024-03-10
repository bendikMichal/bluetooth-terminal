
import { useEffect, useState } from "react"

const useStateAsync = (promise, dataParser = null) => {
  const [ _value, _setValue ] = useState(null);

  useEffect(() => {
    promise.then(resolve => {
      let _res = dataParser ? dataParser(resolve) : resolve;
      _setValue(_res);
    });

  }, [])

  return [ _value, _setValue ];
}

export default useStateAsync;