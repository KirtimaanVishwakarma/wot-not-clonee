import NodeIcon from "../../public/wotnot/node-tree.svg"
import PageIcon from "../../public/wotnot/pages.svg"
import { SelectionTypeInterface } from './interface'

export const selectionType: SelectionTypeInterface = [{ type: 'Page', icon: PageIcon, bgColor: '#F0FFFF' }, { type: 'Condition', icon: NodeIcon, bgColor: '#FFF8DC' }]

export const selectionIcons: any = {
    'Page': { icon: PageIcon, bgColor: 'bg-blue-400' }, 'Condition': { icon: NodeIcon, bgColor: 'bg-yellow-400' }
}