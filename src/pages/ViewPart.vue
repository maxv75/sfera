<template>
    <div class="part-page container">
        <div v-if="info && !loading" class="content">
            <h3 class="page-title"><span><template v-if="info.top_cat_id">{{ info.top_cat_name }} - </template>{{ info.cat_name }}</span></h3>
            <div class="row viewpart-container">
                <div class="col-md-4 viewpart-image">
                    <img id="partImage" v-if="info.image" v-bind:src="PicturesFolder + info.image">
                    <img v-if="!info.img_tmb_medium" src="https://www.sfera.co.il/images/noPicture.gif">
                    <div v-if="info.image"><a id="btnZoom" @click.prevent="zoomImage" v-bind:href="PicturesFolder + info.image" class="btn"><i class="glyphicon glyphicon-zoom-in"></i> <span>{{$t('part.zoom')}}</span></a></div>
                </div>
                <div class="col-md-8">
                    <div class="clearfix"><button type="button" @click="goBack" class="btn btn-primary" v-bind:class="{ 'pull-right': lang != 'he', 'pull-left': lang == 'he' }">{{$t('part.back')}}</button></div>
                    <div class="clearfix">
                        <h4>{{info.name}}</h4>
                        <div class="viewpart-price">{{ info.is_sale == '1' ? info.sale_price : info.price }} &#8362;</div>
                    </div>
                    <p v-if="info.short_descr" v-html="info.short_descr"></p>
                    <p v-if="info.descr" v-html="info.descr"></p>
                    <div v-if="info.warranty" class="viewpart-warranty">{{ $t('part.warranty', { 'warranty': info.warranty }, parseInt(info.warranty)) }}</div>
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
            let vm = this;
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
<<style scoped>
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
}
.viewpart-container .viewpart-image img {
    max-width: 220px;
    max-height: 220px;
}
.viewpart-container .viewpart-image div {
    margin-top: 40px;
}
.viewpart-container .viewpart-image div a {
    background-color: #fff;
    color: #0096DB;
    border: 1px solid #0096DB;
    border-radius: 0;
}
.viewpart-container .viewpart-image div a i {
    vertical-align: middle;
    font-size: 1.5em;
}
.viewpart-container .viewpart-image div a span {
    vertical-align: middle;
    font-size: 1em;
    line-height: 1.5em;
}
.viewpart-container p {
    margin: 0;
    padding: 20px 0;
    border-top: 1px solid #e4e4e4;
}
.viewpart-container .viewpart-warranty {
    padding: 20px 0;
    border-top: 1px solid #e4e4e4;
}
</style>
