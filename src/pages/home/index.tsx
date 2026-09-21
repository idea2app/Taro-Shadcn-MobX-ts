import { observer } from 'mobx-react';

import { MainNav } from '@/components/MainNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import counterStore from '@/store/counter';

const HomePage = observer(() => (
  <div className='flex h-full flex-col overflow-hidden pb-16'>
    <div className='flex flex-1 flex-col items-center justify-center gap-6 p-6'>
      <Card className='w-full max-w-sm'>
        <CardHeader>
          <CardTitle>MobX Counter</CardTitle>
        </CardHeader>

        <CardContent className='flex flex-row items-center justify-center gap-6'>
          <Button variant='outline' onClick={() => counterStore.reduceCount()}>
            -
          </Button>

          <span className='w-10 text-center text-2xl font-semibold text-foreground'>
            {counterStore.counter}
          </span>

          <Button onClick={() => counterStore.addCount()}>+</Button>
        </CardContent>
      </Card>
    </div>

    <MainNav path='home' />
  </div>
));

export default HomePage;
