<template>
    <div id="menu-wrapper" class="container">
        <ul class="level1 clearfix">
            <li v-for="cat in categories" :key="cat.id" v-bind:class="{ 'expandable': cat.subcats.length > 0, 'link-active': isLinkActive(cat.id, cat.subcats) }">
                <template>
                    <router-link :to="{ name: 'Parts', params: { id: cat.id }}">{{ cat['name_' + lang] }}</router-link>
                    <ul class="level2" v-if="cat.subcats.length > 0">
                        <li v-for="subcat in cat.subcats" :key="subcat.id">
                            <router-link :to="{ name: 'Parts', params: { id: subcat.id, parent: subcat.parent_id }}">{{ subcat['name_' + lang] }}</router-link>
                        </li>
                    </ul>
                </template>
            </li>
        </ul>
        <div id="closeMenu" @click="toggleMenu(true)"><span>{{closeMenuText}}</span><span v-bind:class="{ 'glyphicon-chevron-down': closed, 'glyphicon-chevron-up': !closed }" class="glyphicon"></span>{{$t('categories.menu')}}</div>
    </div>
</template>

<script>
    export default {
        name: 'Categories',
        data () {
            return {
                categories: [],
                closed: false,
                isInitialized: false,
                isClosedByUser: false
            }
        },
        created () {
            // fetch the data when the view is created and the data is
            // already being observed
            this.fetchData();
        },
        updated () {
            if(!this.isInitialized) {
                // Save categories menu height on component data loaded
                this.$parent.menuHeight = $('#categoriesMenu').outerHeight(true);
                this.isInitialized = true;
            }
        },
        methods: {
            fetchData () {
                this.$http.get('api/categories').then(response => {
                    this.categories = response.data;
                });
            },
            toggleMenu (isUserAction) {
                let vm = this;

                this.isClosedByUser = isUserAction && isUserAction === true;

                if(this.$parent.isMenuFixed) {
                    let targetHeight = vm.closed ? this.$parent.menuHeight : $('#closeMenu').outerHeight(true);
                    $('#catMenuPlaceholder').animate({'height': targetHeight }, 250);
                }

                $('.level1').slideToggle(250, function() {
                    vm.closed = !vm.closed;
                    vm.$parent.menuHeight = $('#categoriesMenu').outerHeight(true);
                });
                
            },
            isLinkActive (id, subcats) {
                if (id == this.$route.params.id) {
                    return true;
                }

                let parent = this.$route.params.parent;
                return subcats.length > 0 && parent && subcats.some(function (subcat) {
                    return subcat.parent_id === parent;
                });
            }
        },
        computed: {
            lang: function () { return this.$i18n.locale() },
            closeMenuText: function () { return this.closed ? this.$t('categories.open') : this.$t('categories.close') },
            parentid: function () {
                return this.$route.params.parent;
            } 
        },
        watch: {
            lang: function (ln) {
                //console.log('Locale changed: ' + ln);
            }
        }   
    }
</script>
<<style scoped>
a.router-link-active {
    text-decoration: none;
}
#menu-wrapper {
    
}
#closeMenu {
    padding: 5px 0;
    text-align: center;
    color: #004264;
    cursor: pointer;
    line-height: 1.5;
}
#closeMenu .glyphicon {
    margin: 0 6px;
    font-size: 0.8em;
}

ul.level1 {
    margin: 0;
    padding: 0;
    list-style: none;
    color: #fff;
    padding: 30px 0 0;
    text-align: center;
}
ul.level1 > li {
    padding: 5px 10px;
    position: relative;
    margin-bottom: 5px;
    display: inline-block;
    text-align: left;
}

    #site-wrapper.heb ul.level1 > li {
        text-align: right;
    }

ul.level1 > li.expandable {
    padding-left: 19px;
}
    #site-wrapper.heb ul.level1 > li.expandable {
        padding-left: 10px;
        padding-right: 20px;
    }

ul.level1 > li.expandable:before {
    content: "\e114";
    font-family: 'Glyphicons Halflings';
    font-size: 8px;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    position: absolute;
    left: 7px;
    top: 50%;
    margin-top: -4px;
    -webkit-font-smoothing: antialiased;
}
    #site-wrapper.heb ul.level1 > li.expandable:before {
        left: 0;
        right: 6px;
    }

ul > li a {
    color: #fff;
    font-size: 1em;
    line-height: 1.2em;
    white-space: nowrap;
}
ul > li a:active {
    color: #fff;
    font-size: 1em;
    line-height: 1.2em;
}
ul > li a:hover {
    text-decoration: none;
}

ul > li.link-active,
ul > li.link-active > a {
    color: #014266;
}
ul > li a.router-link-exact-active {
    color: #014266;
}

ul.level2 {
    margin: 0;
    padding: 0;
    list-style: none;
    min-width: 100%;
    background-color: #55aae3;
    color: #fff;
    position: absolute;
    top: 30px;
    left: 0;
    z-index: 9;
    max-height:0px;
    -webkit-transition:max-height, 0.1s linear;
    -moz-transition: max-height, 0.1s linear;
    -ms-transition: max-height, 0.1s linear;
    -o-transition: max-height, 0.1s linear;
    transition: max-height, 0.1s linear;
    overflow: hidden;
}
    #site-wrapper.heb ul.level2 {
        right: 0;
        left: auto;
    }

ul.level2 li {
    padding: 5px 20px;
}
ul.level2 li a {
    display: block;
}
ul.level1 > li.expandable:hover {
    -webkit-box-shadow: 1px 1px 0px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 1px 1px 0px 0px rgba(0,0,0,0.2);
    box-shadow: 1px 1px 0px 0px rgba(0,0,0,0.2);
}
    #site-wrapper.heb ul.level1 > li.expandable:hover {
        -webkit-box-shadow: -1px 1px 0px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: -1px 1px 0px 0px rgba(0,0,0,0.2);
        box-shadow: -1px 1px 0px 0px rgba(0,0,0,0.2);
    }

ul.level1 li:hover {
    background-color: #55aae3;
}
ul.level1 li:hover ul.level2 {
    max-height: 120px;
    -webkit-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.2);
    -moz-box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.2);
    box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.2);
}
    #site-wrapper.heb ul.level1 li:hover ul.level2 {
        -webkit-box-shadow: -1px 1px 1px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: -1px 1px 1px 0px rgba(0,0,0,0.2);
        box-shadow: -1px 1px 1px 0px rgba(0,0,0,0.2);
    }

ul.level1 > li:hover ul.level2 li:hover {
    background-color: #0f8cd4;
}
</style>
