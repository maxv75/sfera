
var vm = null;

var checkExpired = function(lastUpdate) {
    let _now = new Date();

    return Math.floor((_now - lastUpdate) / 1000) > (vm.$config.DataCacheExpirationMinutes * 60);
}

export default {

    Init (context) {
        vm = context;
    },
    GetSales () {
        return new Promise((resolve, reject) => {
            let _isCacheExpired = checkExpired(vm.$store.state.parts.sales.lastUpdate);

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
            let _isCacheExpired = checkExpired(vm.$store.state.parts.topsellers.lastUpdate);

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
            let _isCacheExpired = checkExpired(vm.$store.state.parts.parts.lastUpdate);

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