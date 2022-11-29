import React, { memo } from "react";
import { useState } from "react";

const Pagenation = memo(({ length, pagenationFunction }) => {
  const [num] = useState(12);
  let numOfPagenation = [];
  if (length) {
    let x = Math.ceil(length / num);
    for (let i = 0; i < x; i++) {
      numOfPagenation.push(i);
    }
  }
  return (
    <div className="mt-5 pt-5">
      <nav aria-label="Page navigation example">
        <ul className="pagination d-flex gap-4 justify-content-center align-items-center">
          {length &&
            numOfPagenation.length > 1 &&
            numOfPagenation.map((ele) => (
              <li
                className="btn btn-success px-5"
                onClick={() => pagenationFunction(ele)}
                key={ele + 1}
              >
                {ele + 1}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
});

export default Pagenation;
