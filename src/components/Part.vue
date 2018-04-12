<template>
    <div class="part-wrapper" @click="viewDetails(data.id)">
        <div class="part-image">
            <img v-if="data.img_tmb_medium" :src="PicturesFolder + (isTopseller ? data.image : data.img_tmb_medium)">
            <img v-if="!data.img_tmb_medium" src="/static/images/noimage.png">
        </div>
        <div class="part-info">
            <h4>{{ data.firm }}</h4>
            <div class="part-name">{{ data.name }}</div>
            <div class="part-price"><span class="sale-price" v-if="isSale || data.is_sale == 1">{{ data.sale_price }} &#8362;</span><span :class="{ 'sale': isSale || data.is_sale == 1 }">{{ data.price }} &#8362;</span></div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['data', 'sale', 'topseller'],
        methods: {
            viewDetails (id) {
                this.$router.push({ name: 'ViewPart', params: { id }});
            }
        },
        computed: {
            PicturesFolder: function() {
                return this.$config.PicturesUrl;
            },
            isSale: function() {
                return !!this.sale === true;
            },
            isTopseller: function() {
                return !!this.topseller === true;
            }
        },
    }
</script>
