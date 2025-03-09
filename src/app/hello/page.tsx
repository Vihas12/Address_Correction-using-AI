"use client";

import React,{ useState, useEffect} from 'react'

export default function Hello() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <div>
      {isMobile ? <h1>Mobile</h1> : <h1>Desktop</h1>}
    </div>
  )
}
