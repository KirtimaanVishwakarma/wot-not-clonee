import React from 'react'

export type SelectionType = 'Page' | 'Condition'
export type SelectionTypeInterface = { type: SelectionType, icon: any, bgColor: `#${string}` }[]
export interface WotNotDataProviderInterface {
    children: React.ReactNode
}