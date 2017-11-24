<template>
    <div id="site-wrapper" v-bind:class="{ 'heb': lang == 'he' }">
        <header>
            <nav class="navbar navbar-default container">
                <div class="nav-container">
                    <ul class="nav navbar-nav">
                        <li><router-link to="/">{{$t('menu.home')}}</router-link></li>
                        <li><router-link to="/about">{{$t('menu.about')}}</router-link></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="search">
                            <search v-bind:query="searchValue" v-on:search="search"></search>
                        </li>
                        <li class="language-select">
                            <ol class="breadcrumb">
                                <li><a href="#" v-bind:class="{ 'lang-active': lang == 'en' }" v-on:click.stop.prevent="changeLanguage('en')">EN</a></li>
                                <li><a href="#" v-bind:class="{ 'lang-active': lang == 'ru' }" v-on:click.stop.prevent="changeLanguage('ru')">РУ</a></li>
                                <li><a href="#" class="he" v-bind:class="{ 'lang-active': lang == 'he' }" v-on:click.stop.prevent="changeLanguage('he')">ע</a></li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="logo"></div>
        <div id="categoriesMenu">
            <categories></categories>
        </div>
        <div class="site-pages">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <footer>
            <div class="container">
                <div>
                &copy;2005-{{ (new Date()).getFullYear() }} {{$t('title')}}
                </div>
                <div class="footer-address">
                    <label>{{$t('about.shopInfo.addressTitle')}}:</label><span>{{$t('about.shopInfo.address')}}</span>
                </div>
                <div class="footer-phone">
                    <label>{{$t('about.shopInfo.phone')}}:</label><span>03-5042253</span>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
    import Categories from '@/components/Categories.vue';
    import Search from '@/components/Search.vue';
    import { mapGetters } from 'vuex';

    export default {
        components: { 'categories': Categories, 'search': Search },
        name: 'app',
        data () {
            return {
                searchValue: this.$route.query.q
            }
        },
        computed: {
            lang: function () {
                return this.$i18n.locale();
            },
            ...mapGetters({
                loading: 'getLoader'
            }),
        },
        watch: {
            // Update searchValue parameter on route query change
            '$route.query': function () { 
                this.searchValue = this.$route.query.q;
            },
        },
        methods: {
            changeLanguage (lng) {
                this.$http.get('api/language/' + lng).then(response => {
                    this.$i18n.set(lng);
                });
            },
            search (value) {
                this.$router.push({ path: '/search', query: { q: value }})
            }

        },
    }
</script>

<style>
    @import './assets/css/common.css';
</style>

<style>
#loading {
    position: fixed;
    top: 0;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    background-color: rgba(0, 0, 0, 0.7);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    z-index: 999;
    text-align: center;
    font-size: 1em;
    line-height: 2em;
}
header {
    background-color: #f3f3f3;
    border-bottom: 1px solid #0096DB;
}
.navbar-default {
    border-radius: 0 !important;
    border: none;
    background-color: #f3f3f3;
    margin-bottom: 0;
}
.navbar-default .navbar-nav {

}
    .navbar-default .navbar-nav a.router-link-exact-active,
    .navbar-default .navbar-nav a.router-link-exact-active:active,
    .navbar-default .navbar-nav a.router-link-exact-active:visited {
        color: #0096DB;
    }
    #site-wrapper.heb .navbar-nav {
        padding: 0;
    }

.navbar-default .navbar-nav.navbar-right {
    margin-right: 0;
}
    #site-wrapper.heb .navbar-default .navbar-nav.navbar-right {
        margin-left: 0;
        margin-right: 0;
    }

.navbar-default .navbar-right .search {
    padding-top: 15px;
    margin-right: 10px;
}
    #site-wrapper.heb .navbar-default .navbar-right .search {
        margin-right: 0;
        margin-left: 10px;
    }

.navbar-default .navbar-nav > li > a {
    padding-top: 20px;
    padding-bottom: 20px;
}
.navbar-default .navbar-nav > li.language-select .breadcrumb {
    margin: 11px 0 0;
    background-color: #f3f3f3;
}

.navbar-default .navbar-nav > li.language-select .breadcrumb>li+li:before {
    padding: 0 2px;
}

.navbar-default .navbar-nav > li.language-select .breadcrumb a {
    color: #777;
    text-decoration: none;
    font-size: 1em;
    line-height: 1.1em;
}
.navbar-default .navbar-nav > li.language-select .breadcrumb a.he {
    font-size: 1.2em;
}
.navbar-default .navbar-nav > li.language-select .breadcrumb a.lang-active {
    color: #0096DB;
}

#categoriesMenu {
    background-image: url('/static/images/menu_bg.jpg');
    background-position: 50% 0;
    background-repeat: no-repeat;
}
</style>
