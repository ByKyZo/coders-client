import { Menu as LibMenu, MenuItem } from '@szhsin/react-menu';
// import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import React from 'react';

//? La configuration du style se trouve dans le dossier styles/components/elements/_menu.scss

const Menu = () => {
  return (
    <LibMenu
      arrow
      menuButton={<button className="bg-blue-400">test</button>}
      transition
    >
      <MenuItem className="text-red-500 py-6 h-20">Test</MenuItem>
      <MenuItem>Test</MenuItem>
      <MenuItem>Test</MenuItem>
    </LibMenu>
  );
};

export default Menu;
