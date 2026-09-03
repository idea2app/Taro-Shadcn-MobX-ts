import { configure } from 'mobx'
import type { PropsWithChildren } from 'react'
import './app.css'

configure({ useProxies: 'never', enforceActions: 'never' })

function App({ children }: PropsWithChildren) {
    return <>{children}</>
}

export default App
