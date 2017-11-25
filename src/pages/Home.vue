<template>
    <div class="home-page">
        <div class="container">
            <h3 class="page-title"><span>{{$t('sales.title')}}</span></h3>
            <sales></sales>
        </div>
        <div class="promotions">
             <div class="container">
                 <div class="col-md-8 promo-categories">
                     <div class="top-promo">
                         <router-link :to="{ name: 'Parts', params: { id: promotions.top.category }}">
                            <img :src="promotions.top.image" width="100%" />
                            <span>{{promotions.top["name_" + lang]}}</span>
                         </router-link>
                     </div>
                     <div class="bottom-promo">
                        <div class="b-promo-1">
                            <router-link :to="{ name: 'Parts', params: { id: promotions.bottom.left.category }}">
                                <img :src="promotions.bottom.left.image" width="100%" />
                                <span>{{promotions.bottom.left["name_" + lang]}}</span>
                            </router-link>
                        </div>
                         <div class="b-promo-2">
                            <router-link :to="{ name: 'Parts', params: { id: promotions.bottom.center.category }}">
                                <img :src="promotions.bottom.center.image" width="100%" />
                                <span>{{promotions.bottom.center["name_" + lang]}}</span>
                            </router-link></div>
                         <div class="b-promo-3">
                             <router-link :to="{ name: 'Parts', params: { id: promotions.bottom.right.category }}">
                                <img :src="promotions.bottom.right.image" width="100%" />
                                <span>{{promotions.bottom.right["name_" + lang]}}</span>
                            </router-link>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 top-sellers">
                    <h3 class="topsellers-title"><span>{{$t('topSellers')}}</span></h3>
                    <div class="topsellers-carousel">
                        <part v-if="topsellers.length > 0" v-bind:data="currentTopSeller" :topseller="true"></part>
                        <div class="topsellers-carousel-nav">
                            <button class="carousel-bw" @click="getNextTopSeller(-1)"></button><button class="carousel-fw" @click="getNextTopSeller(1)"></button>
                        </div>
                    </div>
                 </div>
             </div>
        </div>
    </div>
</template>

<script>
import Sales from '@/components/Sales.vue'
import Part from '@/components/Part.vue';
export default {
    components: { 'sales': Sales, 'part': Part },
    name: 'Home',
    data () {
        return {
            loading: false,
            topSellersIndex: 0,
            topsellers: [],
            currentTopSeller: null,
            promotions: null
        }
    },
    created () {
        this.promotions = this.$config.promotions;
        this.getTopSellers();
    },
    methods: {
        getTopSellers () {
            this.loading = true;

            this.$http.get('api/parts/topsellers').then(response => {
                this.loading = false;
                this.topsellers = response.data;
                if(this.topsellers.length > 0) {
                    this.currentTopSeller = this.topsellers[0];
                }
            }, response => {
                this.topsellers = [];
            });
        },
        getNextTopSeller (direction) {
            if(this.topsellers.length == 0)
                return null;

            this.topSellersIndex += direction;

            if(direction == 1 && this.topSellersIndex == this.topsellers.length) {
                this.topSellersIndex = 0;
            } else if(direction == -1 && this.topSellersIndex < 0) {
                this.topSellersIndex = this.topsellers.length - 1;
            }

            this.currentTopSeller = this.topsellers[this.topSellersIndex];
        }
    },
    computed: {
        lang: function () {
            return this.$i18n.locale();
        }
    },
    watch: {
        lang: function (ln) {
            //console.log('Locale changed: ' + ln);
        }
    }   
}
</script>

<style>
.home-page .promotions {
    padding: 50px 0 50px;
    background-color: #f4f4f4;
}
.home-page .promotions .promo-categories {
    padding-left: 0;
}
    #site-wrapper.heb .home-page .promotions .promo-categories {
        padding-left: 15px;
        padding-right: 0;
    }
    #site-wrapper.heb .home-page .promotions .promo-categories img {
        -moz-transform: scaleX(-1);
        -o-transform: scaleX(-1);
        -webkit-transform: scaleX(-1);
        transform: scaleX(-1);
        filter: FlipH;
        -ms-filter: "FlipH";
    }

.home-page .promotions .promo-categories .top-promo {
    position: relative;
}
.home-page .promotions .promo-categories .top-promo span {
    position: absolute;
    left: 8%;
    top: 20%;
    font-size: 2.5em;
    text-transform: uppercase;
    color: #fff;
}
    #site-wrapper.heb .home-page .promotions .promo-categories .top-promo span {
        left: auto;
        right: 8%;
    }

.home-page .promotions .promo-categories .bottom-promo {
    display: flex;
    margin: 12px -6px 0;
}


.home-page .promotions .promo-categories .bottom-promo > div {
    flex: 1 1 auto;
    padding: 0 6px;
    position: relative;
}

.home-page .promotions .promo-categories .bottom-promo > div.b-promo-1 span {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    margin-top: -1.2em;
    text-align: center;
    display: block;
    font-size: 2.4em;
    line-height: 2.4em;
    text-transform: uppercase;
    color: #000;
}

.home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span {
    position: absolute;
    left: 0;
    top: 10%;
    width: 100%;
    text-align: center;
    display: block;
    font-size: 1.6em;
    line-height: 1.6em;
    text-transform: uppercase;
    color: #000;
}

.home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
    position: absolute;
    left: 0;
    top: 10%;
    width: calc(100% - 12px);
    text-align: center;
    display: block;
    font-size: 1.6em;
    line-height: 1.6em;
    text-transform: uppercase;
    color: #fff;
    background-color: rgba(0,0,0, 0.5);
    margin: 0 6px;
    padding: 5px 10px;
}

.home-page .promotions .top-sellers {
    border: 1px solid #dcdcdc;
    background-color: #fff;
    padding-top: 15px;
}

.home-page .promotions .top-sellers .topsellers-title span {
    background:#fff; 
    padding:0 20px; 
}

.home-page .promotions .top-sellers .topsellers-carousel {
    position: relative;
}

.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav {
    position: absolute;
    bottom: -21px;
    right: 0;
}
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav {
        position: absolute;
        bottom: -21px;
        right: auto;
        left: 0;
    }

.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button {
    width: 30px;
    height: 30px;
    border: none;
    background-repeat: no-repeat;
    background-position: 0 0;
    padding: 0;
}
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw {
    background-image: url('/static/images/arr_right.png');
}
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw:hover {
    background-image: url('/static/images/arr_right_active.png');
}
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw {
    background-image: url('/static/images/arr_left.png');
}
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw:hover {
    background-image: url('/static/images/arr_left_active.png');
}

    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw {
        background-image: url('/static/images/arr_left.png');
    }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw:hover {
        background-image: url('/static/images/arr_left_active.png');
    }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw {
        background-image: url('/static/images/arr_right.png');
    }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw:hover {
        background-image: url('/static/images/arr_right_active.png');
    }

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper {
    height: 381px;
    padding: 10px 30px 20px;
    text-align: center;
    position: relative;
    cursor: pointer;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image {
    height: 180px;
    margin-bottom: 20px;
}
.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image img {
    max-width: 100%;
    max-height: 100%;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper h4 {
    font-size: 1.4em;
    font-weight: 500;
    margin: 0 0 10px;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-name {
    height: 80px;
    font-size: 1.2em;
    font-weight: 300;
    color: #333;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price {
    margin-top: 10px;
    font-size: 1.3em;
    font-weight: 500;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price .sale-price {
    color: #f00;
    margin-right: 20px;
    display: inline-block;
}
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price .sale-price {
        margin-right: 0;
        margin-left: 20px;
    }

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price .sale {
    color: #a5a5a5;
    text-decoration: line-through;
    display: inline-block;
}

@media (max-width: 992px) {
    .home-page .promotions .promo-categories .top-promo span {
        left: 6%;
        top: 15%;
        font-size: 1.5em;
    }
        #site-wrapper.heb .home-page .promotions .promo-categories .top-promo span {
            left: auto;
            right: 6%;
        }
    .home-page .promotions .promo-categories {
        padding-left: 0;
        padding-right: 0;
        margin-bottom: 15px;
    }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-1 span {
        margin-top: -1.1em;
        font-size: 2.2em;
        line-height: 2.2em;
    }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span {
        font-size: 1.4em;
        line-height: 1.4em;
    }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
        font-size: 1.4em;
        line-height: 1.4em;
    }
}

@media (max-width: 1200px) {
    .home-page .promotions .promo-categories .top-promo span {
        left: 7%;
        top: 18%;
        font-size: 2em;
    }
        #site-wrapper.heb .home-page .promotions .promo-categories .top-promo span {
            left: auto;
            right: 7%;
        }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-1 span {
        margin-top: -1.1em;
        font-size: 2.2em;
        line-height: 2.2em;
    }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span {
        font-size: 1.4em;
        line-height: 1.4em;
    }

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
        font-size: 1.4em;
        line-height: 1.4em;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper {
        height: 300px;
        padding: 10px 30px 20px;
    }
    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image {
        height: 130px;
        margin-bottom: 15px;
    }
    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper h4 {
        font-size: 1.2em;
        font-weight: 500;
        margin: 0 0 10px;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-name {
        height: 60px;
        font-size: 1.1em;
        font-weight: 300;
        color: #333;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price {
        margin-top: 10px;
        font-size: 1.2em;
        font-weight: 500;
    }
}
</style>
