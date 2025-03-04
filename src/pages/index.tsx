import React, { useCallback } from 'react';
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
} from '@xyflow/react';
import StartHere from '../../public/start-here.svg';
import CustomNode from '@/components/CustomNode';

const initNodes = [
  {
    id: '1',
    type: 'custom',
    data: { name: 'Jane Doe', job: 'CEO', emoji: '😎', start: StartHere },
    position: { x: 0, y: 50 },
  },
  {
    id: '2',
    type: 'custom',
    data: { name: 'Tyler Weary', job: 'Designer', emoji: '🤓' },
    position: { x: -200, y: 200 },
  },
  {
    id: '3',
    type: 'custom',
    data: { name: 'Kristi Price', job: 'Developer', emoji: '🤩' },
    position: { x: 200, y: 200 },
  },
];

const initEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
  },
];
const nodeTypes = {
  custom: CustomNode,
};
const Index = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initEdges);

  const onConnect = useCallback(
    (params:any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  return (
    <div className='h-screen w-screen bg-[#E5E4E2]'>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
      >
        <MiniMap />
        <Controls />
        <Panel position='bottom-center'>
          <Controls
            orientation='horizontal'
            className='border border-red-500 center text-xl'
          />
        </Panel>
        <Background color='blue' variant={BackgroundVariant.Dots} gap={12} />
      </ReactFlow>
    </div>
  );
};

export default Index;
