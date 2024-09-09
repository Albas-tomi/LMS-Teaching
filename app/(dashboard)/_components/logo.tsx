import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <>
      <Image src="/images/logo.svg" alt="logo" width={40} height={40} />
    </>
  );
};

export default Logo;
