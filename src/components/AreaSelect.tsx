import { areaList } from '@vant/area-data';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Component } from 'react';
import { View, Text } from 'virtual:taro/components';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer';

export interface AreaSelectProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

type AreaMap = Record<string, string>;

const provinceList: AreaMap = areaList.province_list;
const cityList: AreaMap = areaList.city_list;
const countyList: AreaMap = areaList.county_list;
const areaNameMap: AreaMap = { ...provinceList, ...cityList, ...countyList };

function childrenOf(map: AreaMap, parentCode: string, level: 1 | 2) {
  const prefix = level === 1 ? parentCode.slice(0, 2) : parentCode.slice(0, 4);

  return Object.entries(map).filter(
    ([code]) => code.startsWith(prefix) && code !== '000000'
  );
}

@observer
export class AreaSelect extends Component<AreaSelectProps> {
  @observable
  accessor open = false;

  @observable
  accessor provinceCode = '';

  @observable
  accessor cityCode = '';

  get displayName() {
    const { value } = this.props;

    if (!value) return '';

    const province = areaNameMap[value.slice(0, 2).padEnd(6, '0')] || '';
    const city = areaNameMap[value.slice(0, 4).padEnd(6, '0')] || '';
    const county = areaNameMap[value] || '';

    return [province, city, county].filter(Boolean).join(' ');
  }

  show = () => {
    this.open = true;
    this.provinceCode = '';
    this.cityCode = '';
  };

  close = () => (this.open = false);

  pickProvince = (code: string) => (this.provinceCode = code);
  pickCity = (code: string) => (this.cityCode = code);

  pickCounty = (code: string) => {
    this.close();
    this.props.onChange(code);
  };

  render() {
    const { title } = this.props;
    const { open, provinceCode, cityCode } = this;

    return (
      <>
        <View className='flex flex-row items-center justify-between border-b border-border px-4 py-3'>
          <Text className='text-sm font-medium text-foreground'>{title}</Text>

          <Button variant='ghost' size='sm' onClick={this.show}>
            {this.displayName || '请选择地区'}
          </Button>
        </View>

        <Drawer open={open} onOpenChange={value => (this.open = value)}>
          <DrawerContent className='max-h-[70vh]'>
            <DrawerHeader>
              <DrawerTitle>{title}</DrawerTitle>
            </DrawerHeader>

            <View className='flex max-h-[50vh] flex-col gap-1 overflow-y-auto px-4 pb-4'>
              {!provinceCode &&
                Object.entries(provinceList).map(([code, name]) => (
                  <View
                    key={code}
                    className='rounded-md px-3 py-2 text-sm hover:bg-accent'
                    onClick={() => this.pickProvince(code)}
                  >
                    <Text>{name}</Text>
                  </View>
                ))}

              {provinceCode &&
                !cityCode &&
                childrenOf(cityList, provinceCode, 1).map(([code, name]) => (
                  <View
                    key={code}
                    className='rounded-md px-3 py-2 text-sm hover:bg-accent'
                    onClick={() => this.pickCity(code)}
                  >
                    <Text>{name}</Text>
                  </View>
                ))}

              {provinceCode &&
                cityCode &&
                childrenOf(countyList, cityCode, 2).map(([code, name]) => (
                  <View
                    key={code}
                    className='rounded-md px-3 py-2 text-sm hover:bg-accent'
                    onClick={() => this.pickCounty(code)}
                  >
                    <Text>{name}</Text>
                  </View>
                ))}
            </View>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
}
