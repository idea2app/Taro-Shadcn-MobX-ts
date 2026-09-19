import '@/store/service';

import { RepositoryModel } from 'mobx-github';

import { MainNav } from '@/components/MainNav';
import { ScrollList } from '@/components/ScrollList';
import { Card, CardContent } from '@/components/ui/card';
import { i18n } from '@/store/Translation';

const repositoryStore = new RepositoryModel('idea2app');

const InterfacePage = () => (
  <ul className='flex h-screen flex-col overflow-hidden pb-16'>
    <ScrollList
      className='min-h-0 flex-1'
      translator={i18n}
      store={repositoryStore}
      renderList={allItems => (
        <li className='flex flex-col gap-2 p-4'>
          {allItems.map(({ full_name, description, html_url }) => (
            <Card key={full_name}>
              <CardContent className='flex flex-col gap-1 p-4'>
                <a
                  className='text-sm font-semibold text-foreground'
                  href={html_url}
                  target='_blank'
                >
                  {full_name}
                </a>

                {description && (
                  <span className='text-xs text-muted-foreground'>
                    {description}
                  </span>
                )}
              </CardContent>
            </Card>
          ))}
        </li>
      )}
    />
    <MainNav path='interface' />
  </ul>
);

export default InterfacePage;
