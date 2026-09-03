import { useState } from 'react'
import { View } from 'virtual:taro/components'

import { AreaSelect } from '@/components/AreaSelect'
import { MainNav } from '@/components/MainNav'
import { RangeField } from '@/components/RangeField'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

function ComponentPage() {
    const [range, setRange] = useState<[number, number]>([4, 6])
    const [areaCode, setAreaCode] = useState('')

    return (
        <View className="flex h-full flex-col overflow-hidden pb-16">
            <View className="flex-1 overflow-y-auto p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>高级控件</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-0 p-0">
                        <RangeField title="范围" unit="mm" max={100} value={range} onChange={setRange} />

                        <AreaSelect title="所在地" value={areaCode} onChange={setAreaCode} />
                    </CardContent>
                </Card>
            </View>

            <MainNav path="component" />
        </View>
    )
}

export default ComponentPage
