import React from "react";

export const PrettyImage = React.memo(() => {
  return (
    <div className={"container"}>
      <div className={"wrap"}>
          <img className={"flower-image"} src={"./Flowers-1.jpg"} alt=""/>
      </div>  
    </div>
  )
  
});
