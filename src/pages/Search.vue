<template>
  <div class="search-page container">
    <div class="search-input-wrapper center-block">
        <div class="input-group">
            <input type="text" class="form-control" v-bind:placeholder="$t('search.placeholder')" v-model="searchValue" v-on:keyup="keyup" />
            <div class="input-group-btn">
                <button class="btn btn-primary" type="button" v-on:click="search"><i class="glyphicon glyphicon-search"></i></button>
            </div>
        </div> 
    </div>
    
    <h3 class="page-title"><span>{{$t('search.title')}}</span></h3>
    <div class="search-results-info">
        <span v-if="!loading && partsLength > 0">{{ $t('search.results', { 'query': query, count: partsLength }, partsLength) }}</span>
        <span v-if="!loading && partsLength == 0">{{ $t('search.notfound', { 'query': query }) }}</span>
    </div>
    <div v-if="parts && !loading" class="content search-content">
        <div v-for="item in parts">
            <h3>{{ $t('search.category', { 'category': item.category['name_' + lang], 'count': item.parts.length }, item.parts.length) }}</h3>
            <div class="parts-container clearfix">
                <template v-for="part in item.parts">
                    <part v-bind:data="part" :key="part.id"></part>
                </template>
            </div>
        </div>
    </div>
    <div v-if="isError">Error loading search results</div>
  </div>
</template>

<script>
import Part from '@/components/Part.vue';

export default {
    name: 'Search',
    props: ['query'],
    components: { Part },
    data () {
        return {
            loading: false,
            parts: null,
            isError: false,
            searchValue: this.query
        }
    },
    created () {
        // fetch the data when the view is created and the data is
        // already being observed
        this.fetchData();
    },
    watch: {
        // call again the method if the route changes
        '$route': function () {
            this.searchValue = this.query;
            this.fetchData();
        }
    },
    methods: {
        fetchData () {
            this.loading = true;
            console.log(this.searchValue);
            this.$http.get('api/parts/search', {params: {s: this.searchValue}})
                .then(response => {
                    this.loading = false;
                    this.parts = response.data;
                }).catch(error => {
                    this.isError = true;
                });
        },
        keyup (event) {
            if(event.key == "Enter") {
                this.search();
            }
        },
        search () {
            let value = $.trim(this.searchValue);
            if(value.length > 2)
                this.$router.push({ path: '/search', query: { q: value }});
        }
    },
    computed:{
        partsLength () {
            let count = 0;
            if(this.parts && this.parts.length > 0) {
                count = this.parts.reduce(function(count, item) {
                    return count + item.parts.length;
                }, 0);
            }

            return count;
        },
        lang: function () {
            return this.$i18n.locale();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.search-page {
    padding-bottom: 40px;
}
.search-results-info {
    font-size: 1.2em;
    font-weight: 400;
    padding: 10px 0 25px;
    text-align: center;
    color: #333;
}
.search-input-wrapper {
    width: 50%;
    margin: 40px auto 20px;
}

.search-input-wrapper .input-group input {
    height: 40px;
    font-size: 16px;
    outline: none;
    box-shadow:none !important;
    border:1px solid #c2c2c2 !important;
}

.search-input-wrapper .input-group button {
    height: 40px;
}

.search-input-wrapper .input-group button .glyphicon {
    font-size: 21px;
    line-height: 21px;
}
</style>
