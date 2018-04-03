<template>
  <div class="sales">
    <div v-if="parts && !loading" class="content">
        <div id="sales" class="parts-container clearfix">
            <div id="salesWrapper" class="clearfix">
                <template v-for="part in parts">
                    <part :data="part" :sale="true" :key="part.id"></part>
                </template>
            </div>
        </div>
        <div class="sales-open">
            <button class="btn" @click="toggleSales" :class="{ 'opened': isOpened }">
                <i></i><span>{{ isOpened ? $t('sales.btnCollapse') : $t('sales.btnShowAll') }}</span>
            </button>
        </div>
    </div>
  </div>
</template>

<script>
    import Part from '@/components/Part.vue';
    import { mapGetters } from 'vuex';
    import DataLoader from '@/modules/DataLoader'

    export default {
        name: 'Sales',
        components: { Part },
        data () {
            return {
                loading: false,
                parts: null,
                isOpened: false,
                lineHeight: 0,
                fullHeight: 0,
                isLoaded: false,
                isAnalyticsSent: false
            }
        },
        created () {
            this.fetchData();
        },
        mounted () {
            $(window).on('resize', this.setHeight);
        },
        beforeDestroy () {
            $(window).off('resize', this.setHeight);
        },
        updated () {
            if(!this.isLoaded) {
                this.setHeight();
            }

            this.isLoaded = true;
        },
        methods: {
            fetchData () {
                this.loading = true;

                DataLoader.GetSales().then(response => {
                    this.loading = false;
                    this.parts = response;
                })
                
            },
            setHeight () {
                this.lineHeight = $('#salesWrapper .part-wrapper').outerHeight(true);
                this.fullHeight = $('#salesWrapper').height();

                if(this.isOpened) {
                    $('#sales').height(this.fullHeight);
                } else {
                    $('#sales').height(this.lineHeight);
                }
            },
            toggleSales () {
                let vm = this;
                if(this.isOpened) {
                    $('#sales').animate({'height': this.lineHeight }, 500, function() {
                        vm.isOpened = false;
                    });
                } else {
                    $('#sales').animate({'height': this.fullHeight }, 500, function() {
                        vm.isOpened = true;

                        if(!vm.isAnalyticsSent) {
                            vm.$ga.event({
                                eventCategory: 'Sales',
                                eventAction: 'open',
                                eventLabel: 'HomePage Sales',
                                eventValue: 1
                            });
                            vm.isAnalyticsSent = true;
                        }
                    });
                }
            }
        },
        computed: {
            PicturesFolder: function() {
                return this.$config.PicturesUrl;
            },
        },
    }
</script>
<<style scoped>
.sales .parts-container {
    -webkit-transition: max-height 1s; 
    -moz-transition: max-height 1s; 
    -ms-transition: max-height 1s; 
    -o-transition: max-height 1s; 
    transition: max-height 1s;  
    overflow: hidden;
    height: 370px;
    padding-bottom: 10px;
}

.sales .sales-open {
    text-align: center;
    padding: 30px 0 50px;
}
.sales .sales-open button {
    background: #fff;
    color: #0096DB;
    border: 1px solid #0096DB;
    border-radius: 0;
    padding-left: 10px;
    font-size: 1.2em;
    font-weight: 400;
}
    #site-wrapper.heb .sales .sales-open button {
        padding-left: 12px;
        padding-right: 10px;
    }

    .sales .sales-open button i {
        background: url('/static/images/arr-down.jpg') 0 0 no-repeat;
        width: 16px;
        height: 12px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 8px;
    }
    .sales .sales-open button span {
        vertical-align: middle;
    }
    #site-wrapper.heb .sales .sales-open button i {
        margin-right: 0;
        margin-left: 8px;
    }
    .sales .sales-open button.opened i {
        background-image: url('/static/images/arr-up.jpg');
    }

@media (max-width: 540px) {
    .sales .sales-open {
        padding: 30px 0 40px;
    }
}
</style>
