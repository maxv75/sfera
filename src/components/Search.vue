<template>
    <div class="input-group" :style="{ 'visibility': isHidden ? 'hidden' : 'visible' }">
        <input type="text" class="form-control input-sm" :placeholder="$t('search.placeholder')" v-model="searchValue" @keyup="keyup" />
        <div class="input-group-btn">
            <button class="btn btn-primary btn-sm" type="button" @click="search"><i class="glyphicon glyphicon-search"></i></button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'search',
        props: ['query'],
        data () {
            return {
                searchValue: this.query
            }
        },
        computed: {
            isHidden: function() {
                return this.$route.name === 'SearchPage';
            }
        },
        watch: {
            query: function () {
                this.searchValue = this.query;
            }
        },
        methods: {
            keyup (event) {
                if(event.key == "Enter") {
                    this.search();
                }
            },
            search () {
                let value = $.trim(this.searchValue);
                if(value.length > 2)
                    this.$emit('search', value);
            }
        },
    }
</script>
<<style scoped>
input {
    width: 220px !important;
    display: inline !important;
    outline: none;
    box-shadow:none !important;
    border:1px solid #c2c2c2 !important;
}
.input-group {
    width: 260px;
    display: inline-block !important;
}
/* .input-group button {
    outline: none;
    box-shadow: none !important;
}  */
</style>

