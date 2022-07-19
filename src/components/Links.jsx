import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
    { url: '/search', text: '🔎 All' },
    { url: '/news', text: '📰 News' },
    { url: '/image', text: '📸 Images' },
    { url: '/videos', text: '📺 Videos' },
  ];

export const Links = () => {
  return (
    <div className='flex sm:justify-around justify-between items-center mt-4 space-x-5'>
        {links.map(({url, text})=>(
            
            <NavLink to={url} className ={(navData) => navData.isActive? 'border-b-2 text-blue-700 dark:text-blue-300 border-blue-700 pb-2' : 'mb-0 hover:text-red-500'}  >
                {text}
            </NavLink>
        ))}
    </div>
  )
}
