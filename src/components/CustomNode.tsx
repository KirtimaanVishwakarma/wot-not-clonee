import React, { memo } from 'react';
import { Handle, Position, ViewportPortal } from '@xyflow/react';
import Image from 'next/image';

function CustomNode(props: any) {
  console.log(props);
  const { data, selected } = props;

  return (
    <div
      className={`px-4 border ${
        selected ? 'border-blue-600' : ''
      } !pl-8 py-2 shadow-md rounded bg-white relative before:content-[""] before:absolute before:h-full before:w-2 before:rounded-l before:bg-red-500 before:top-0 before:-left-1 before:-z-10`}
    >
      {data?.start && (
        <div
          style={{
            transform: 'translate(-8rem, -3rem)',
            position: 'absolute',
          }}
        >
          <Image src={data?.start} alt='start here' />
        </div>
      )}

      <div className='flex'>
        <div className='rounded-full w-12 h-12 flex justify-center items-center bg-gray-100'>
          {data.emoji}
        </div>
        <div className='ml-2'>
          <div className='text-lg font-bold'>{data.name}</div>
          <div className='text-gray-500'>{data.job}</div>
        </div>
      </div>

      {!data?.start && (
        <Handle
          type='target'
          position={Position.Top}
          className='h-3 w-3 rounded-full !bg-teal-500'
        ></Handle>
      )}
      <Handle
        type='source'
        position={Position.Bottom}
        className='w-6 h-6 rounded-full flex justify-center items-center border-none !bg-blue-500'
      >
        <div className='text-white'>+</div>
      </Handle>
    </div>
  );
}

export default memo(CustomNode);
