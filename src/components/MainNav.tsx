import Taro from 'virtual:taro/api'
import { View, Text } from 'virtual:taro/components'
import type { FC } from 'react'

import { cn } from '@/lib/utils'

export interface MainNavProps {
    path: string
}

const items = [
    { path: 'home', label: 'MobX' },
    { path: 'component', label: '组件' },
    { path: 'interface', label: '接口' }
] as const

export const MainNav: FC<MainNavProps> = ({ path }) => (
    <View className="fixed inset-x-0 bottom-0 z-50 flex flex-row border-t border-border bg-background">
        {items.map(item => (
            <View
                key={item.path}
                className={cn(
                    'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium',
                    path === item.path ? 'text-primary' : 'text-muted-foreground'
                )}
                onClick={() => Taro.redirectTo({ url: `/pages/${item.path}/index` })}
            >
                <Text>{item.label}</Text>
            </View>
        ))}
    </View>
)
