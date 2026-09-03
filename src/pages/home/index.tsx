import { observer } from 'mobx-react'
import { View, Text } from 'virtual:taro/components'

import { MainNav } from '@/components/MainNav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import counterStore from '@/store/counter'

function HomePage() {
    const { counter } = counterStore

    return (
        <View className="flex h-full flex-col overflow-hidden pb-16">
            <View className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>MobX Counter</CardTitle>
                    </CardHeader>

                    <CardContent className="flex flex-row items-center justify-center gap-6">
                        <Button variant="outline" onClick={() => counterStore.reduceCount()}>
                            -
                        </Button>

                        <Text className="w-10 text-center text-2xl font-semibold text-foreground">{counter}</Text>

                        <Button onClick={() => counterStore.addCount()}>+</Button>
                    </CardContent>
                </Card>
            </View>

            <MainNav path="home" />
        </View>
    )
}

export default observer(HomePage)
