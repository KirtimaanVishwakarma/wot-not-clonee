import React from 'react'

export type SelectionType = 'Page' | 'Condition'
export type SelectionTypeInterface = { type: SelectionType, icon: any, bgColor: `#${string}` }[]
export interface WotNotDataProviderInterface {
    children: React.ReactNode
}

export type InitialNodeInterface = {
    id: string,
    type?: 'custom',
    data: {
        type?: SelectionType,
        start?: any,
        targetIds?: string[],
    },
    position: { x: number, y: number },
}[]

export type EdgeTypes = {
        id: string,
        source: string,
        target: string,
        label: string,
    }
