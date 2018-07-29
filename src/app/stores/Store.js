import { observable, computed, action, toJS } from 'mobx'; // runInAction

export class Store {

    @observable version = '0.1';
    
    @observable project = null;
    @observable modules = [];
    @observable entities = [];

    @observable data = observable.map({
        
    });

} 

export default Store;