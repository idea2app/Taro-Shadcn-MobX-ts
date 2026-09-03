import '@/store/service'

import { RepositoryModel } from 'mobx-github'
import { View, Text } from 'virtual:taro/components'

import { MainNav } from '@/components/MainNav'
import { ScrollList } from '@/components/ScrollList'
import { Card, CardContent } from '@/components/ui/card'
import { i18n } from '@/store/Translation'

const repositoryStore = new RepositoryModel('idea2app')

function InterfacePage() {
    return (
        <View className="flex h-full flex-col overflow-hidden pb-16">
            <ScrollList
                className="flex-1"
                translator={i18n}
                store={repositoryStore}
                renderList={allItems => (
                    <View className="flex flex-col gap-2 p-4">
                        {allItems.map(({ full_name, description }) => (
                            <Card key={full_name}>
                                <CardContent className="flex flex-col gap-1 p-4">
                                    <Text className="text-sm font-semibold text-foreground">{full_name}</Text>

                                    {description && (
                                        <Text className="text-xs text-muted-foreground">{description}</Text>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </View>
                )}
            />

            <MainNav path="interface" />
        </View>
    )
}

export default InterfacePage
