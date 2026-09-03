import { configure } from 'mobx'
import type { PropsWithChildren } from 'react'
import './app.css'

configure({ useProxies: 'never', enforceActions: 'never' })

const App = ({ children }: PropsWithChildren) => <>{children}</>

export default App
