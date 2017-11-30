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
                         <router-link :to="{ name: 'Parts', params: { id: topPromotion.category }}">
                            <img :src="topPromotion.image" width="100%" />
                            <span>{{topPromotion["name_" + lang]}}</span>
                         </router-link>
                     </div>
                     <div class="bottom-promo">
                        <div class="b-promo-1">
                            <router-link :to="{ name: 'Parts', params: { id: bottomLeftPromotion.category }}">
                                <img :src="bottomLeftPromotion.image" width="100%" />
                                <span>{{bottomLeftPromotion["name_" + lang]}}</span>
                            </router-link>
                        </div>
                         <div class="b-promo-2">
                            <router-link :to="{ name: 'Parts', params: { id: bottomCenterPromotion.category }}">
                                <img :src="bottomCenterPromotion.image" width="100%" />
                                <span>{{bottomCenterPromotion["name_" + lang]}}</span>
                            </router-link></div>
                         <div class="b-promo-3">
                             <router-link :to="{ name: 'Parts', params: { id: bottomRightPromotion.category }}">
                                <img :src="bottomRightPromotion.image" width="100%" />
                                <span>{{bottomRightPromotion["name_" + lang]}}</span>
                            </router-link>
                         </div>
                     </div>
                 </div>
                 <div class="col-md-4 top-sellers">
                    <h3 class="topsellers-title"><span>{{$t('topSellers')}}</span></h3>
                    <div class="topsellers-carousel">
                        <part v-if="topsellers.length > 0" v-bind:data="currentTopSeller" :topseller="true"></part>
                        <div v-if="topsellers.length > 1" class="topsellers-carousel-nav">
                            <button class="carousel-bw" :class="{ 'disabled': isFirstTopSeller }" @click="getNextTopSeller(-1)"></button><button class="carousel-fw" :class="{ 'disabled': isLastTopSeller }" @click="getNextTopSeller(1)"></button>
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
        console.log(this.promotions.top);
        console.log(this.promotions.top.length);
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
                return;

            if(direction == 1 && this.topSellersIndex == this.topsellers.length - 1)
                return;
            else if(direction == -1 && this.topSellersIndex == 0)
                return;
            
            this.topSellersIndex += direction;

            this.currentTopSeller = this.topsellers[this.topSellersIndex];
        }
    },
    computed: {
        lang: function () {
            return this.$i18n.locale();
        },
        isFirstTopSeller: function () {
            return this.topsellers.length == 1 || this.topSellersIndex == 0;
        },
        isLastTopSeller: function () {
            return this.topsellers.length == 1 || this.topSellersIndex == this.topsellers.length - 1;
        },
        topPromotion: function() {
            return this.promotions.top[Math.floor(Math.random() * this.promotions.top.length)];
        },
        bottomLeftPromotion: function() {
            return this.promotions.bottom.left[Math.floor(Math.random() * this.promotions.bottom.left.length)];
        },
        bottomCenterPromotion: function() {
            return this.promotions.bottom.center[Math.floor(Math.random() * this.promotions.bottom.center.length)];
        },
        bottomRightPromotion: function() {
            return this.promotions.bottom.right[Math.floor(Math.random() * this.promotions.bottom.right.length)];
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
    #site-wrapper.heb .home-page .promotions .promo-categories .top-promo img {
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
    left: 0;
    top: 0;
    bottom: 0;
    width: 35%;
    font-size: 2.4em;
    line-height: 1;
    text-transform: uppercase;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
}
    #site-wrapper.heb .home-page .promotions .promo-categories .top-promo span {
        left: auto;
        right: 0;
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
    right: 0;
    top: 50%;
    margin-top: -1.2em;
    text-align: center;
    display: block;
    font-size: 2.4em;
    line-height: 2.4em;
    text-transform: uppercase;
    color: #000;
}

.home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span,
.home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    text-align: center;
    font-size: 1.6em;
    line-height: 1.1;
    text-transform: uppercase;
    color: #000;
    height: 30%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
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
    .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button:focus {
        outline: none;
    }
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw {
    background-image: url('/static/images/arr_right.png');
}
    .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw.disabled,
    .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw.disabled:hover {
        background-image: url('/static/images/arr_right_noactive.png');
        cursor: default;
    }
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw:hover {
    background-image: url('/static/images/arr_right_active.png');
}
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw {
    background-image: url('/static/images/arr_left.png');
}
    .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw.disabled,
    .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw.disabled:hover {
        background-image: url('/static/images/arr_left_noactive.png');
        cursor: default;
    }
.home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw:hover {
    background-image: url('/static/images/arr_left_active.png');
}

    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw {
        background-image: url('/static/images/arr_left.png');
    }
        #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw.disabled,
        #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw.disabled:hover {
            background-image: url('/static/images/arr_left_noactive.png');
        }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-fw:hover {
        background-image: url('/static/images/arr_left_active.png');
    }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw {
        background-image: url('/static/images/arr_right.png');
    }
        #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw.disabled,
        #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw.disabled:hover {
            background-image: url('/static/images/arr_right_noactive.png');
        }
    #site-wrapper.heb .home-page .promotions .top-sellers .topsellers-carousel .topsellers-carousel-nav button.carousel-bw:hover {
        background-image: url('/static/images/arr_right_active.png');
    }

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper {
    height: 381px;
    margin: 0 -15px;
    background-color: #CFD7DA;
    text-align: center;
    position: relative;
    cursor: pointer;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-info {
    padding: 20px 30px;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image {
    height: 240px;
    padding: 5px 30px 30px;
    background-color: #fff;
}
.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image img {
    max-width: 100%;
    max-height: 100%;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper h4 {
    font-size: 1.4em;
    font-weight: 500;
    margin: 0 0 5px;
}

.home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-name {
    height: 45px;
    font-size: 1.2em;
    font-weight: 400;
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

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span,
    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
        font-size: 1.4em;
        line-height: 1.1;
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

    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-2 span,
    .home-page .promotions .promo-categories .bottom-promo > div.b-promo-3 span {
        font-size: 1.4em;
        line-height: 1.1;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper {
        height: 300px;
    }
    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-info {
        padding: 15px 30px;
    }
    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-image {
        height: 180px;
        padding: 0 30px 25px;
    }
    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper h4 {
        font-size: 1.2em;
        margin: 0 0 5px;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-name {
        height: 40px;
        font-size: 1.1em;
        color: #333;
    }

    .home-page .promotions .top-sellers .topsellers-carousel .part-wrapper .part-price {
        margin-top: 10px;
        font-size: 1.2em;
    }
}
</style>
