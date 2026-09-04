import debounce from 'lodash.debounce';
import type { TranslationModel } from 'mobx-i18n';
import { observer } from 'mobx-react';
import type { DataObject, Filter, ListModel } from 'mobx-restful';
import { Component, type ReactNode } from 'react';
import { ScrollView } from 'virtual:taro/components';

export interface ScrollListProps<T extends DataObject = DataObject> {
  className?: string;
  style?: Record<string, string | number>;
  translator: TranslationModel<string, 'load_more' | 'no_more'>;
  store: ListModel<T>;
  filter?: Filter<T>;
  renderList(allItems: T[]): ReactNode;
}

@observer
export class ScrollList<T extends DataObject = DataObject> extends Component<
  ScrollListProps<T>
> {
  componentDidMount() {
    this.props.store.getList(this.props.filter, 1);
  }

  componentDidUpdate({ filter: oldFilter }: ScrollListProps<T>) {
    const { filter } = this.props;

    if (JSON.stringify(filter) !== JSON.stringify(oldFilter))
      this.props.store.getList(filter, 1);
  }

  componentWillUnmount() {
    this.props.store.clear();
  }

  loadMore = debounce(() => {
    const { store } = this.props;

    if (store.downloading < 1 && !store.noMore) store.getList();
  });

  render() {
    const { className, style, translator, store, renderList } = this.props;
    const { t } = translator;
    const { noMore, allItems } = store;

    return (
      <ScrollView
        className={className}
        style={style}
        scrollY
        onScrollToLower={this.loadMore}
      >
        {renderList(allItems)}

        <footer className='mt-4 text-center text-sm text-muted-foreground'>
          {noMore || !allItems.length ? t('no_more') : t('load_more')}
        </footer>
      </ScrollView>
    );
  }
}
