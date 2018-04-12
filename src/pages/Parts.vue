<template>
  <div class="parts-page">
    <div v-if="parts && (!loading || isSamePage)" class="content container">
        <h3 class="page-title"><span><template v-if="parts.category.top_id">{{ parts.category['top_name_' + lang] }} - </template>{{ parts.category['name_' + lang] }}</span></h3>
        <div class="clearfix" v-if="parts && parts.parts.length > 0">
            <div id="partsFilter">
                <label>{{ $t('parts.filter.brand') }}</label>
                <select v-model="brandFilter">
                    <option value="">{{ $t('parts.filter.allBrands') }}</option>
                    <option v-for="option in parts.manufacturers"  :value="option" :key="option">
                        {{ option }}
                    </option>
                </select>
                <label>{{ $t('parts.filter.price') }}</label> 
                <select class="price-filter" v-model="priceFilter">
                    <option value="">{{ $t('parts.filter.allPrices') }}</option>
                    <option v-for="option in parts.prices" :value="option" :key="option">
                        {{ option }}
                    </option>
                </select>
            </div>
        </div>
        <div class="parts-container clearfix">
            <div class="no-data" v-if="parts.parts.length == 0">{{ $t('parts.nodata') }}</div>
            <template v-for="part in partsFilter">
                <part :data="part" :key="part.id"></part>
            </template>
        </div>
    </div>
    <div class="topsellers-container">
        <div class="container">
            <h3 class="topsellers-title"><span>{{$t('topSellers')}}</span></h3>
            <div class="parts-container topsellers clearfix">
                <template v-for="part in parts.topsellers">
                    <part :data="part" :topseller="true" :key="part.id"></part>
                </template>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Part from '@/components/Part.vue';
import DataLoader from '@/modules/DataLoader';

export default {
    name: 'Parts',
    components: { Part },
    data () {
        return {
            loading: false,
            isSamePage: false,
            parts: [],
            brandFilter: "",
            priceFilter: ""
        }
    },
    created () {
        this.fetchData();
    },
    beforeRouteUpdate (to, from, next) {
        if(!to.params || !to.params.id || isNaN(to.params.id)) {
            next(false);
        } else {
            if(from.name === to.name) {
                this.isSamePage = true;
            }
            next();
        }
    },
    watch: {
        // call again the method if the route changes
        '$route': 'fetchData',
    },
    methods: {
        fetchData (transition) {
            this.loading = true;

            DataLoader.GetParts(this.$route.params.id).then(response => {
                this.loading = false;
                this.brandFilter = "";
                this.priceFilter = "";
                this.parts = response;
            }, response => {
                this.$router.replace('/404');
            });
        }
    },
    computed: {
        partsFilter: function() {
            let _brandFilter = this.brandFilter.toUpperCase();
            let vm = this;

            return this.parts.parts.filter(function (entry) {
                return ((_brandFilter == '' || entry.firm.toUpperCase() === _brandFilter) && (vm.priceFilter == '' || entry.price <= vm.priceFilter));
            });
        },
        lang: function () {
            return this.$i18n.locale();
        },
        PicturesFolder: function() {
            return this.$config.PicturesUrl;
        }
    }
}
</script>

<style scoped>
#partsFilter {
    height: 40px;
    float: right;
    margin: 5px 0 15px;
    background-color: #f2f2f2;
    padding-top: 8px;
    padding-left: 65px;
    position: relative;
}
    #partsFilter::before {
        content: ' ';
        width: 40px;
        height: 40px;
        background-color: #c0c0c0;
        background-image: url('/static/images/filter_ico.png');
        background-position: 50% 50%;
        background-repeat: no-repeat;
        background-size: 65%;
        position: absolute;
        left: 0;
        top: 0;
    }
    #site-wrapper.heb #partsFilter {
        float: left;
        padding-left: 0;
        padding-right: 65px;
    }
    #site-wrapper.heb #partsFilter::before {
        left: auto;
        right: 0;
    }


#partsFilter label {
    font-weight: 500;
    color: #777;
    margin-right: 10px;
}
    #site-wrapper.heb #partsFilter label {
        margin-right: 0;
        margin-left: 10px;
    }

#partsFilter select {
    border: 1px solid #e4e4e4;
    width: 120px;
    height: 24px;
    outline: none;
    background-color: #fff;
    margin-right: 25px;
}
    #site-wrapper.heb #partsFilter select {
        margin-right: 0;
        margin-left: 25px;
    }

@media (max-width: 540px) {
    #partsFilter {
        padding-left: 10px;
        float: none;
        height: auto;
    }
        #partsFilter::before {
            display: none;
        }
        #site-wrapper.heb #partsFilter {
            padding-left: 0;
            padding-right: 5px;
        }

    #partsFilter label {
        margin-right: 7px;
        width: 105px;
    }
        #site-wrapper.heb #partsFilter label {
            margin-right: 0;
            margin-left: 7px;
        }

    #partsFilter select {
        width: 150px;
        margin-bottom: 10px;
    }
}
</style>
