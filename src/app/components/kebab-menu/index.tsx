import { useState, useRef, useEffect, ReactNode } from 'react';

interface KebabMenuProp {
  children: ReactNode;
}

const KebabMenu = ({ children }: KebabMenuProp) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className='kebab-menu-container' ref={menuRef}>
      <button onClick={toggleMenu} className='kebab-button'>
        &#x22EE;
      </button>

      {menuOpen && (
        <div className='menu-dropdown'>
          {children}
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
