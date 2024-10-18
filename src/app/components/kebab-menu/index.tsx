import { useState, useRef, useEffect } from 'react';

const KebabMenu = () => {
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
        &#x22EE; {/* Unicode for vertical ellipsis */}
      </button>

      {menuOpen && (
        <div className='menu-dropdown'>
          <ul>
            <li onClick={() => console.log('Option 1 clicked')}>Option 1</li>
            <li onClick={() => console.log('Option 2 clicked')}>Option 2</li>
            <li onClick={() => console.log('Option 3 clicked')}>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
