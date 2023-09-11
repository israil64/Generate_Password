import React from "react";

function CopyButton(prop) {
  console.log(prop);
  return (
    <>
      {/* <button onClick={handleCopyClick}>Copy</button> */}

      <button
        onClick={prop.CopyClip}
        className=" outline-none uppercase font-serif bg-[#832591] text-white px-3 py-0.5 shrink-0 hover:bg-[#83259168] font-thin"
      >
        Copy
      </button>
    </>
  );
}

export default CopyButton;
