import { useState, useRef, useEffect, ReactNode } from 'react';

interface KebabMenuProp {
  children: ReactNode;
}

const KebabMenu = ({ children }: KebabMenuProp) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenuOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
      buttonRef.current?.focus();
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <div className='kebab-menu-container' ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className='kebab-button'
        aria-haspopup='true'
        aria-expanded={menuOpen}
        aria-controls='menu-dropdown'
        aria-label='Menu options'
      >
        &#x22EE;
      </button>

      {menuOpen && (
        <div id='menu-dropdown' className='menu-dropdown' role='menu'>
          {children}
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
