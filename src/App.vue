<template>
    <div id="site-wrapper" v-bind:class="{ 'heb': lang == 'he' }">
        <div id="loading" v-if="loading">{{$t('loading')}}</div>
        <header>
            <nav class="navbar navbar-default container">
                <div class="nav-container">
                    <div id="hamburger" @click="showMenu"></div>
                    <ul class="nav navbar-nav">
                        <li class="navbar-main">
                            <ol class="breadcrumb">
                                <li><router-link to="/">{{$t('menu.home')}}</router-link></li>
                                <li><router-link to="/about">{{$t('menu.about')}}</router-link></li>
                            </ol>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li class="search">
                            <search v-bind:query="searchValue" v-on:search="search"></search>
                        </li>
                        <li class="language-select">
                            <ol>
                                <li><i class="glyphicon glyphicon-chevron-down"></i>{{lang.toUpperCase()}}</li>
                                <li v-for="ln in languages" :key="ln">
                                    <a href="#" v-on:click.stop.prevent="changeLanguage(ln)">{{ln.toUpperCase()}}</a>
                                </li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="logo"></div>
        <div id="categoriesMenu">
            <div id="mobileSearch">
               <search v-bind:query="searchValue" v-on:search="search"></search> 
            </div>
            <categories ref="catMenu"></categories>
        </div>
        <div class="site-pages">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <footer>
            <div class="container">
                <div class="footer-col footer-copyright">
                    &copy;2005-{{ (new Date()).getFullYear() }} {{$t('title')}}
                </div>
                <div class="footer-col footer-designer" v-html="$t('footer.designedby')"></div>
                <div class="width-100"></div>
                <div class="footer-col footer-address">
                    <div>
                        <label>{{$t('about.shopInfo.addressTitle')}}:</label><span>{{$t('about.shopInfo.address')}}</span>
                    </div>
                </div>
                <div class="footer-col footer-phone">
                    <div>
                        <label>{{$t('about.shopInfo.phone')}}:</label><span>03-5042253</span>
                    </div>
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
                searchValue: this.$route.query.q,
                isMenuFixed: false,
                menuTop: 0,
                menuHeight: 0,
                menuFullHeight: 0,
                isMenuAutoCollapse: true
            }
        },
        mounted () {
            let vm = this;
            let $_catMenu = $('#categoriesMenu');
            this.menuTop = $_catMenu.offset().top;
            this.menuHeight = $_catMenu.outerHeight(true);
            this.menuFullHeight = $_catMenu.outerHeight(true);
            this.isMenuAutoCollapse = $(window).width() > $(window).height();
            $(window).on('scroll', () => {
<<<<<<< cc181ad12cd780efc70818ce90079d6ce6e01080
<<<<<<< 58840c08f6ebfe468fce03c0e8775bc84d8ee4ff
                let scrollTop = $(window).scrollTop();
                if(this.isMenuAutoCollapse) {
=======
                if (window.matchMedia("(min-width: 541px)").matches) {
=======
                if (this.isMenuAutoCollapse && window.matchMedia("(min-width: 541px)").matches) {
>>>>>>> Menu behaviour
                    let scrollTop = $(window).scrollTop();
>>>>>>> Mobile version
                    if(vm.isMenuFixed === false && scrollTop > vm.menuTop) {
                        // Fix menu
                        vm.isMenuFixed = true;
                        // Add menu placeholder to avoid overall page height shrinking
                        $('<div>')
                            .attr('id', 'catMenuPlaceholder')
                            .height(this.menuHeight)
                            .insertBefore($_catMenu);

                        $_catMenu.addClass('fixed');
<<<<<<< cc181ad12cd780efc70818ce90079d6ce6e01080
<<<<<<< 58840c08f6ebfe468fce03c0e8775bc84d8ee4ff
                        if(vm.$refs.catMenu && !vm.$refs.catMenu.closed) {
=======
                        if(!vm.$refs.catMenu.closed) {
>>>>>>> Mobile version
=======
                        if(vm.$refs.catMenu && !vm.$refs.catMenu.closed) {
>>>>>>> Menu behaviour
                            // Collapse menu on scroll
                            vm.$refs.catMenu.toggleMenu();
                        }
                    } else if(vm.isMenuFixed === true && scrollTop <= vm.menuTop) {
                        // Restore menu to its initial position (non fixed)
                        vm.isMenuFixed = false;
                        $_catMenu.removeClass('fixed');
                        $('#catMenuPlaceholder').remove();

<<<<<<< cc181ad12cd780efc70818ce90079d6ce6e01080
<<<<<<< 58840c08f6ebfe468fce03c0e8775bc84d8ee4ff
                        if(vm.$refs.catMenu && vm.$refs.catMenu.closed && !vm.$refs.catMenu.isClosedByUser) {
=======
                        if(vm.$refs.catMenu.closed && !vm.$refs.catMenu.isClosedByUser) {
>>>>>>> Mobile version
=======
                        if(vm.$refs.catMenu && vm.$refs.catMenu.closed && !vm.$refs.catMenu.isClosedByUser) {
>>>>>>> Menu behaviour
                            // Open menu on scroll to top only if its not be collapsed by user
                            vm.$refs.catMenu.toggleMenu();
                        }
                    }
                }
            });
            $(window).on('resize', () => {
<<<<<<< cc181ad12cd780efc70818ce90079d6ce6e01080
<<<<<<< 58840c08f6ebfe468fce03c0e8775bc84d8ee4ff
                this.isMenuAutoCollapse = $(window).width() > $(window).height();
                if(this.isMenuAutoCollapse) {
=======
                if (window.matchMedia("(min-width: 541px)").matches) {
>>>>>>> Mobile version
=======
                this.isMenuAutoCollapse = $(window).width() > $(window).height();
                if (this.isMenuAutoCollapse && window.matchMedia("(min-width: 541px)").matches) {
>>>>>>> Menu behaviour
                    this.menuHeight = $_catMenu.outerHeight(true);
                    this.menuFullHeight = $_catMenu.outerHeight(true);
                    if(vm.isMenuFixed) {
                        $('#catMenuPlaceholder').height(this.menuHeight);
                    }
                }
            });
        },
        computed: {
            lang: function () {
                return this.$i18n.locale();
            },
            languages: function() {
                let lang = this.$i18n.locale();
                return ['en', 'ru', 'he'].filter(function (ln) {
                    return ln != lang;
                });
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
                if(window.matchMedia("(max-width: 540px)").matches) {
                    $('#categoriesMenu').hide();
                    $('#hamburger').removeClass('active');
                }
            },
            showMenu () {
                $('#categoriesMenu').toggle();
                $('#hamburger').toggleClass('active');
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

.navbar-default .nav-container #hamburger {
    display: none;
}

.navbar-default .navbar-nav li.navbar-main {
    padding: 20px 0;
}
    .navbar-default .navbar-nav li.navbar-main .breadcrumb {
        margin: 0;
        padding: 0;
        background-color: #f3f3f3;
    }
        .navbar-default .navbar-nav li.navbar-main .breadcrumb > li {
            padding-left: 3px;
        }
            .navbar-default .navbar-nav li.navbar-main .breadcrumb>li+li:before {
                color: #777;
            }
            #site-wrapper.heb .navbar-default .navbar-nav li.navbar-main .breadcrumb > li {
                padding-left: 0;
                padding-right: 0;
            }
            .navbar-default .navbar-nav li.navbar-main .breadcrumb > li:first-child {
                padding-left: 0;
            }
                #site-wrapper.heb .navbar-default .navbar-nav li.navbar-main .breadcrumb > li:first-child {
                    padding-left: 0;
                    padding-right: 0;
                }
            .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a {
                color: #777;
                text-decoration: none;
            }
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active,
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active:active,
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active:visited {
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
    margin-right: 15px;
}
    #site-wrapper.heb .navbar-default .navbar-right .search {
        margin-right: 0;
        margin-left: 15px;
    }

.navbar-default .navbar-nav > li > a {
    padding-top: 20px;
    padding-bottom: 20px;
}

.navbar-default .navbar-nav > li.language-select {
    margin-top: 15px;
    width: 56px;
    height: 30px;
    position: relative;
}
.navbar-default .navbar-nav > li.language-select ol {
    list-style: none;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #0096DB;
    margin: 0;
    padding: 0;
    width: 56px;
    max-height: 30px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    -webkit-transition: max-height 0.2s ease-in-out; 
    -moz-transition: max-height 0.2s ease-in-out; 
    -ms-transition: max-height 0.2s ease-in-out; 
    -o-transition: max-height 0.2s ease-in-out; 
    transition: max-height 0.2s ease-in-out;  
    cursor: pointer;
}
.navbar-default .navbar-nav > li.language-select ol:hover {
    max-height: 90px;
}
.navbar-default .navbar-nav > li.language-select ol li {
    height: 30px;
    font-size: 1em;
    line-height: 29px;
    text-align: right;
    padding-left: 8px;
    padding-right: 9px;
    color: #333;
}
    #site-wrapper.heb .navbar-default .navbar-nav > li.language-select ol li {
        text-align: left;
        padding-left: 9px;
        padding-right: 8px;
    }
.navbar-default .navbar-nav > li.language-select ol li:first-child {
    color: #0096DB;
}
.navbar-default .navbar-nav > li.language-select ol li .glyphicon {
    font-size: 12px;
    margin-right: 5px;
}
    #site-wrapper.heb .navbar-default .navbar-nav > li.language-select ol li .glyphicon {
        margin-right:0;
        margin-left: 5px;
    }
.navbar-default .navbar-nav > li.language-select ol li a {
    text-decoration: none;
    color: #777;
    display: block;
}
.navbar-default .navbar-nav > li.language-select ol li a:hover {
    text-decoration: none;
    color: #333;
}

#categoriesMenu {
    background-image: url('/static/images/menu_bg.jpg');
    background-position: 50% 0;
    background-repeat: no-repeat;
}
#categoriesMenu.fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
}

#mobileSearch {
    display: none;
    z-index: 4;
    padding: 7px 15px 0;
}
    #mobileSearch > .input-group {
        z-index: 4;
        border: 1px solid #fff;
        display: flex !important;
        width: auto;
    }
    #mobileSearch input {
        border: none !important;
        background-color: transparent;
        color: #fff !important;
        width: auto !important;
        padding: 2px 10px;
        height: 24px;
        flex-grow: 1;
    }
    #mobileSearch .input-group-btn {
        width: 34px;
    }
        #mobileSearch .input-group-btn button {
            padding: 2px 10px;
            background-color: transparent;
            border-color: transparent;
        }
        #site-wrapper #mobileSearch .input-group-btn button:hover,
        #site-wrapper #mobileSearch .input-group-btn button:active,
        #site-wrapper #mobileSearch .input-group-btn button:active:hover {
            background-color: transparent;
            border-color: transparent;
        }

    #mobileSearch input::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #ededed;
        opacity: 1; /* Firefox */
    }

    #mobileSearch input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #ededed;
    }

    #mobileSearch input::-ms-input-placeholder { /* Microsoft Edge */
        color: #ededed;
    }

@media (max-width: 540px) {
    .navbar-default .nav-container {
        display: flex;
        margin: 0 -15px;
        background: #0096DB url('/static/images/logo-mobile.png') no-repeat;
        background-position: right 10px center;
        background-size: auto 85%;
    }
        #site-wrapper.heb .navbar-default .nav-container {
            background-position: 10px center;
        }

    .navbar-default .nav-container #hamburger {
        display: block;
        width: 16px;
        height: 11px;
        background: url('/static/images/menu-close.png') center center no-repeat;
        margin: 23px 15px 0;
    }
    .navbar-default .nav-container #hamburger.active {
        background: url('/static/images/menu-x.png') center center no-repeat;
    }

    #categoriesMenu {
        position: relative;
        display: none;
    }

    #mobileSearch {
        display: block;
    }

    .navbar-default .navbar-nav {
        margin: 0;
    }

    .navbar-default .navbar-nav .search {
        display: none;
    }

    .navbar-default .navbar-nav li.navbar-main .breadcrumb {
        background-color: #0096DB;
    }

    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a {
        color: #fff;
        text-decoration: none;
    }
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active,
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active:active,
    .navbar-default .navbar-nav li.navbar-main .breadcrumb > li a.router-link-exact-active:visited {
        color: #005479;
    }
    .navbar-default .navbar-nav li.navbar-main .breadcrumb>li+li:before {
        color: #fff;
    }

    .navbar-default .navbar-nav li.navbar-main .breadcrumb:after {
        padding: 0 0 0 10px;
        color: #fff;
        content: "/\00a0";
    }

        #site-wrapper.heb .navbar-default .navbar-nav li.navbar-main .breadcrumb:after {
            padding: 0 8px 0 0;
        }

    .navbar-default .navbar-nav > li.language-select ol {
        background: #0096DB;
        width: 50px;
        border: none;
    }
    .navbar-default .navbar-nav > li.language-select ol li {
        padding-left: 5px;
        padding-right: 6px;
        color: #fff;
    }
        #site-wrapper.heb .navbar-default .navbar-nav > li.language-select ol li {
            padding-left: 6px;
            padding-right: 5px;
        }
    .navbar-default .navbar-nav > li.language-select ol li:first-child {
        color: #fff;
    }
    .navbar-default .navbar-nav > li.language-select ol li a {
        color: #fff;
    }
}

@media (min-width: 541px) {
    #categoriesMenu {
        display: block !important;
    }
    
    .navbar-default .navbar-nav {
        float: left;
        margin: 0;
    }
        #site-wrapper.heb .navbar-default .navbar-nav {
            float: right;
        }
    .navbar-default .navbar-nav.navbar-right {
        float: right!important;
        margin-right: 0;
    }
        #site-wrapper.heb .navbar-default .navbar-nav.navbar-right {
            float: left!important;
            margin-right: 0;
            margin-left: 0;
        }
    
    .navbar-default .navbar-nav.navbar-right > li {
        float: left;
    }
        #site-wrapper.heb .navbar-default .navbar-nav.navbar-right > li {
            float: right;
        }
}
</style>
