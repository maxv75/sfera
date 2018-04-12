<template>
    <div class="part-page container">
        <div v-if="info && !loading" class="content">
            <h3 class="page-title"><span><template v-if="info.top_cat_id">{{ info.top_cat_name }} - </template>{{ info.cat_name }}</span></h3>
            <div class="row viewpart-container">
                <div class="col-md-4 viewpart-image">
                    <img id="partImage" v-if="info.image" @click="zoomImage" :src="PicturesFolder + info.image">
                    <img v-if="!info.img_tmb_medium" src="/static/images/noimage.png">
                    <div v-if="info.image"><a id="btnZoom" @click.prevent="zoomImage" :href="PicturesFolder + info.image">{{$t('part.zoom')}}</a></div>
                </div>
                <div class="col-md-8">
                    <div class="back-btn-wrapper clearfix"><button type="button" @click="goBack" class="btn btn-primary" :class="backButtonClass">{{$t('part.back')}}</button></div>
                    <div class="clearfix">
                        <h4>{{info.name}}</h4>
                        <div class="viewpart-price">{{ info.is_sale == '1' ? info.sale_price : info.price }} &#8362;</div>
                    </div>
                    <p class="viewpart-description" v-if="info.short_descr" v-html="info.short_descr"></p>
                    <p class="viewpart-description" v-if="info.descr" v-html="info.descr"></p>
                    <div class="viewpart-warranty-wrapper">
                        <div v-if="info.warranty" class="viewpart-warranty" :class="{ 'separator': info.link }">{{ $t('part.warranty', { 'warranty': info.warranty }, parseInt(info.warranty)) }}</div>
                        <div v-if="info.link" class="viewpart-link" :class="{ 'no-padding': !info.warranty }"><a :href="info.link" target="_blank">{{$t('part.link')}}</a></div>
                    </div>
                    <div class="back-btn-wrapper-mobile"><button type="button" @click="goBack" class="btn btn-primary">{{$t('part.back')}}</button></div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
    import fancyBox from '@fancyapps/fancybox';

    export default {
        name: 'ViewPart',
        data () {
            return {
                loading: false,
                info: null,
                catId: null,
                referrer: null
            }
        },
        created () {
            this.fetchData();
        },
        mounted () {
           
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                // Save referrer page for back action
                vm.referrer = from.name;
            });
        },
        beforeRouteUpdate (to, from, next) {
            if(!to.params || !to.params.id || isNaN(to.params.id)) {
                next(false);
            } else {
                next();
            }
        },
        computed: {
            currentId: function() {
                return this.$route.params.id;
            },
            lang: function () {
                return this.$i18n.locale();
            },
            PicturesFolder: function() {
                return this.$config.PicturesUrl;
            },
            backButtonClass: function() {
                return this.lang == 'he' ? 'pull-left' : 'pull-right';
            }
        },
        methods: {
            fetchData () {
                this.$http.get('api/parts/' + this.currentId).then(response => {
                    this.loading = false;
                    this.info = response.data;
                    this.catId = this.info && this.info.cat_id ? this.info.cat_id : null;
                }, response => {
                    this.$router.replace('/404');
                });
            },
            goBack () {
                if(this.referrer != 'Parts' && this.referrer != 'Home' && this.referrer != 'SearchPage' && this.catId) {
                    this.$router.push({ name: 'Parts', params: { id: this.catId }});
                } else {
                    this.$router.go(-1);
                }
            },
            zoomImage () {
                $.fancybox.open($("#btnZoom"), {
                    animationEffect : "zoom",
                    buttons : [
                        'close'
                    ]
                });
            }
        },
        watch: {
            '$route': 'fetchData',
            lang: function (ln) {
                this.fetchData();
            }
        }
    }
</script>
<style lang="scss" scoped>
.viewpart-container {
    margin-bottom: 40px;
}
.viewpart-container h4 {
    color: #0096DB;
    font-size: 1.3em;
    font-weight: 500;
    line-height: 1.1;
    margin: 30px 0 20px;
    float: left;
}
    #site-wrapper.heb .viewpart-container h4 {
        float: right;
    }

.viewpart-container .viewpart-price {
    margin: 30px 0 20px;
    font-size: 1.3em;
    font-weight: 500;
    line-height: 1.1;
    float: right;
}
    #site-wrapper.heb .viewpart-container .viewpart-price {
        float: left;
    }

.viewpart-container .viewpart-image {
    text-align: center;
    padding-top: 60px;

    img {
        max-width: 220px;
        max-height: 220px;
        cursor: pointer;
    }

    div {
        margin-top: 40px;

        a {
            color: #777;
            background: #fff url('/static/images/zoom.png') 0 50% no-repeat;
            padding-left: 32px;
            text-decoration: underline;
            height: 25px;
            display: inline-block;
            font-size: 1.2em;
            line-height: 1.5;
        }
    }
}

    #site-wrapper.heb .viewpart-container .viewpart-image div a {
        background-position: 100% 50%;
        padding-left: 0;
        padding-right: 34px;
    }

.viewpart-container .viewpart-image div a i {
    vertical-align: middle;
    font-size: 1.5em;
}
.viewpart-container .viewpart-image div a span {
    vertical-align: middle;
    font-size: 1em;
    line-height: 1.7em;
}
    
.viewpart-container .viewpart-warranty-wrapper {
    padding: 15px 0 20px;
    border-top: 1px solid #dcdcdc;
    color: #555;
}
.viewpart-container .viewpart-warranty {
    padding: 5px 30px 5px 0;
    display: inline-block;
}
    .viewpart-container .viewpart-warranty.separator {
        border-right: 1px solid #dcdcdc;
    }
    #site-wrapper.heb .viewpart-container .viewpart-warranty {
        padding: 5px 0 5px 30px;
        display: inline-block;
    }
        #site-wrapper.heb .viewpart-container .viewpart-warranty.separator {
            border-right: none;
            border-left: 1px solid #dcdcdc;
        } 
.viewpart-container .viewpart-link {
    padding-left: 30px;
    display: inline-block;
}
    .viewpart-container .viewpart-link.no-padding {
        padding-left: 0;
    }
    #site-wrapper.heb .viewpart-container .viewpart-link {
        padding-left: 0;
        padding-right: 30px;
    }
        #site-wrapper.heb .viewpart-container .viewpart-link.no-padding {
            padding-right: 0;
        }
.viewpart-container .viewpart-link a {
    color: #555;
    text-decoration: underline;
    padding-left: 35px;
    display: inline-block;
    position: relative;
}
    #site-wrapper.heb .viewpart-container .viewpart-link a {
        padding-left: 0;
        padding-right: 35px;
    }
    .viewpart-container .viewpart-link a:before
    {
        content: '';
        width: 29px;
        height: 29px;
        top: -7px;
        left: 0;
        position: absolute;
        background: url('/static/images/site-link.png') 0 0 no-repeat;
    }
        #site-wrapper.heb .viewpart-container .viewpart-link a:before
        {
            left: auto;
            right: 0;
        }

    .viewpart-container .back-btn-wrapper-mobile {
        display: none;
        text-align: center;
        padding-top: 30px;
    }

@media (max-width: 540px) {
    .viewpart-container {
        margin-bottom: 30px;
    }
    
    .viewpart-container .viewpart-image {
        padding-top: 20px;
    }
    .viewpart-container .viewpart-image img {
        max-width: 75%;
    }
    .viewpart-container .viewpart-image div {
        display: none;
    }

    .viewpart-container h4 {
        margin-top: 40px;
        float: none;
    }
        #site-wrapper.heb .viewpart-container h4 {
            float: none;
        }

    .viewpart-container .viewpart-price {
        margin-top: 15px;
        margin-bottom: 25px;
        float: none;
    }
        #site-wrapper.heb .viewpart-container .viewpart-price {
            float: none;
        }

    .viewpart-container .viewpart-warranty {
        padding-right: 0;
        display: block;
        margin-bottom: 8px;
    }
        .viewpart-container .viewpart-warranty.separator {
            border-right: none;
        }
        #site-wrapper.heb .viewpart-container .viewpart-warranty {
            padding-left: 0;
            display: block;
        }
            #site-wrapper.heb .viewpart-container .viewpart-warranty.separator {
                border-right: none;
                border-left: none;
            } 

    .viewpart-container .viewpart-link {
        padding-left: 0;
        display: block;
    }
        #site-wrapper.heb .viewpart-container .viewpart-link {
            padding-left: 0;
            padding-right: 0;
        }

    .viewpart-container .back-btn-wrapper {
        display: none;
    }
    .viewpart-container .back-btn-wrapper-mobile {
        display: block;
    }
}
</style>

