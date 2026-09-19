import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';

import { AreaSelect } from '@/components/AreaSelect';
import { MainNav } from '@/components/MainNav';
import { RangeField } from '@/components/RangeField';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

@observer
export default class ComponentPage extends Component {
  @observable
  accessor range: [number, number] = [64, 89];

  @observable
  accessor areaCode = '110101';

  render() {
    const { range, areaCode } = this;

    return (
      <div className='flex h-full flex-col overflow-hidden pb-16'>
        <div className='flex-1 overflow-y-auto p-4'>
          <Card>
            <CardHeader>
              <CardTitle>高级控件</CardTitle>
            </CardHeader>

            <CardContent className='flex flex-col gap-0 p-0'>
              <RangeField
                title='范围'
                unit='mm'
                max={100}
                value={range}
                onChange={value => console.log((this.range = value))}
              />

              <AreaSelect
                title='所在地'
                value={areaCode}
                onChange={value => console.log((this.areaCode = value))}
              />
            </CardContent>
          </Card>
        </div>

        <MainNav path='component' />
      </div>
    );
  }
}
