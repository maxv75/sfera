
var vm = null;

export default {

    Init (context) {
        vm = context;
    },
    GetSales () {
        return new Promise((resolve, reject) => {
            let _lastUpdate = vm.$store.state.parts.sales.lastUpdate;
            let _now = new Date();
            let _isCacheExpired = Math.floor((_now - _lastUpdate) / 1000) > (vm.$config.DataCacheExpirationMinutes * 60);

            if(vm.$store.state.parts.sales.data && vm.$store.state.parts.sales.data.length > 0 && !_isCacheExpired) {
                resolve(vm.$store.state.parts.sales.data);
            } else {
                vm.$http.get('api/parts/sales')
                    .then(response => {
                        vm.$store.dispatch('setSales', response.data); 
                        resolve(response.data);
                    })
                    .catch(() => reject)
            }
        });

        
    },
    GetTopSellers () {
        return new Promise((resolve, reject) => {
            let _lastUpdate = vm.$store.state.parts.topsellers.lastUpdate;
            let _now = new Date();
            let _isCacheExpired = Math.floor((_now - _lastUpdate) / 1000) > (vm.$config.DataCacheExpirationMinutes * 60);

            if(vm.$store.state.parts.topsellers.data && vm.$store.state.parts.topsellers.data.length > 0 && !_isCacheExpired) {
                resolve(vm.$store.state.parts.topsellers.data);
            } else {
                vm.$http.get('api/parts/topsellers')
                    .then(response => {
                        vm.$store.dispatch('setTopSellers', response.data); 
                        resolve(response.data);
                    })
                    .catch(() => reject)
            }
        });
    },

    GetParts (id) {
        return new Promise((resolve, reject) => {
            let _lastUpdate = vm.$store.state.parts.parts.lastUpdate;
            let _now = new Date();
            let _isCacheExpired = Math.floor((_now - _lastUpdate) / 1000) > (vm.$config.DataCacheExpirationMinutes * 60);

            if(vm.$store.state.parts.parts.data[id] && !_isCacheExpired) {
                resolve(vm.$store.state.parts.parts.data[id]);
            } else {
                if(_isCacheExpired)
                    vm.$store.dispatch('clearPartsCache');

                vm.$http.get('api/categories/' + id +  '/parts')
                    .then(response => {
                        vm.$store.dispatch('setCategoryParts', { id: id, data: response.data }); 
                        resolve(response.data);
                    })
                    .catch(() => reject)
            }
        });
    }
}