import { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  const onTop = () => {
    if (isAtTop) {
      window.scrollTo({
        top: document.body.scrollHeight, // Scroll to the bottom
        behavior: 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0, // Scroll to the top
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <button
      className="rounded-full bg-primary md:p-4 p-3 w-fit aspect-square fixed bottom-[10%] right-[3%] z-50 cursor-pointer"
      onClick={onTop}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className={`md:size-6 size-5 transform transition-transform ${
          isAtTop ? 'rotate-0' : '-rotate-180'
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </button>
  );
};

export default ScrollButton;
