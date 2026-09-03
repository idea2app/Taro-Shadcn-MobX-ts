import { makeAutoObservable } from 'mobx'

export class CounterStore {
    counter = 1

    constructor() {
        makeAutoObservable(this)
    }

    addCount() {
        this.counter++
    }

    reduceCount() {
        this.counter--
    }
}

export default new CounterStore()
