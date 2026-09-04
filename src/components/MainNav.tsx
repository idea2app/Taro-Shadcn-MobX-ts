import Taro from 'virtual:taro/api';
import { View, Text } from 'virtual:taro/components';
import { ArrowLeftRight, Ellipsis, Network } from 'lucide-react-taro';
import type { FC } from 'react';

import { cn } from '@/lib/utils';

export interface MainNavProps {
  path: string;
}

const items = [
  { path: 'home', label: 'MobX', icon: Ellipsis },
  { path: 'component', label: '组件', icon: Network },
  { path: 'interface', label: '接口', icon: ArrowLeftRight }
] as const;

export const MainNav: FC<MainNavProps> = ({ path: currentPath }) => (
  <View className='fixed inset-x-0 bottom-0 z-50 flex flex-row border-t border-border bg-background'>
    {items.map(({ path, label, icon: Icon }) => (
      <View
        key={path}
        className={cn(
          'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium',
          path === currentPath ? 'text-primary' : 'text-muted-foreground'
        )}
        onClick={() => Taro.redirectTo({ url: `/pages/${path}/index` })}
      >
        <Icon size={20} />
        <Text>{label}</Text>
      </View>
    ))}
  </View>
);
