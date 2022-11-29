import React, { memo } from 'react';
import "./ImgLoad.css"
const ImgLoad = memo(() => {
    return (
      <div className="ImgLoadControl">
        <span className="ImgLoad"></span>
      </div>
    );
});

export default ImgLoad;