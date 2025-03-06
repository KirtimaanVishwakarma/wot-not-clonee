import React, { useCallback, useEffect } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Panel,
  EdgeTypes,
} from '@xyflow/react';
import StartHere from '../../public/start-here.svg';
import CustomNode from '@/components/CustomNode';
import Button from '@/components/button';
import CustomEdge from '@/components/customEdge';
import WotNotContextData from '@/context/wotnotData';

const initEdges = [
  {
    // type: 'straight',
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'edge label',
    type: 'custom',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    label: 'default',
  },
];
const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes: EdgeTypes = {
  custom: CustomEdge,
};
const Index = () => {
  const { initNodes } = WotNotContextData();
  console.log('test', initNodes);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);
  useEffect(() => {
    if (!initNodes) return;
    setNodes(initNodes);
  }, [initNodes]);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className='flex flex-col h-screen'>
      <div className='flex gap-4 justify-end bg-white p-4 h-fit'>
        <Button
          btnName='Save'
          btnType='primary'
          onClick={() => console.log('test')}
        />
        <Button
          btnName='Publish'
          btnType='secondary'
          onClick={() => console.log('test')}
        />
      </div>

      <div className='h-full w-screen bg-[#E5E4E2]'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <MiniMap />
          <Controls />
          <Panel position='top-left' className='text-blue-400'>
            Flow
          </Panel>
          <Panel position='bottom-center'>
            <Controls
              orientation='horizontal'
              className='border border-red-500 center text-xl'
            />
          </Panel>
          <Background color='blue' variant={BackgroundVariant.Dots} gap={12} />
        </ReactFlow>
      </div>
      <div className='drawer drawer-end'>
        <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
        <div className='drawer-side  '>
          <label
            htmlFor='my-drawer-4'
            aria-label='close sidebar'
            className='drawer-overlay'
          ></label>
          <ul className='menu bg-base-200 text-base-content min-h-full w-1/4 p-4 !bg-white'>
            {/* Sidebar content here */}
            <li>
              <a>Sidebar Item 1</a>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
