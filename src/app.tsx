import { configure } from 'mobx';
import type { FC, PropsWithChildren } from 'react';
import './app.css';

configure({ useProxies: 'never', enforceActions: 'never' });

const App: FC<PropsWithChildren> = ({ children }) => <>{children}</>;

export default App;
