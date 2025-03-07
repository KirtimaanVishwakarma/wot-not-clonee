import WotNotContextData from '@/context/wotnotData';
import { selectionIcons } from '@/utils/constants';
import Image from 'next/image';
import React from 'react';

const SideDrawer = () => {
  const { selectedNodeData } = WotNotContextData();
  console.log('selectedNodeData', selectedNodeData);

  return (
    <div className='drawer drawer-end'>
      <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
      <div className='drawer-side  '>
        <label
          htmlFor='my-drawer-4'
          aria-label='close sidebar'
          className='drawer-overlay'
        ></label>
        {/* <ul className=''> */}
        {/* Sidebar content here */}
        <div className='menu text-black min-h-full w-1/4 p-8 bg-white'>
          <div className='flex items-center gap-3'>
            <Image
              src={selectionIcons[selectedNodeData?.data?.type]?.icon}
              alt='start here'
              height={30}
            />
            <header className='font-normal text-lg'>Select Page</header>
          </div>
        </div>
        {/* </ul> */}
      </div>
    </div>
  );
};

export default SideDrawer;
