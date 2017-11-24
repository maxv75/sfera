<template>
    <div class="about-page">
        <div class="contact-us-container">
            <div class="container">
                <div class="col-md-6 contact-us-wrapper">
                    <h4><span>{{$t('about.contactUs.title')}}</span></h4>
                    <form>
                        <div class="form-group subject">
                            <input type="text" class="form-control" id="txtSubject" v-model="form.subject">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="txtName" v-model="form.name" v-bind:placeholder="$t('about.contactUs.name')">
                        </div>
                        <div class="form-group phone">
                            <input type="tel" class="form-control" id="txtPhone" v-model="form.phone" v-bind:placeholder="$t('about.contactUs.phone')">
                        </div>
                        <div class="form-group email">
                            <input type="email" class="form-control" id="txtEmail" v-model="form.email" v-bind:placeholder="$t('about.contactUs.email')">
                        </div>
                        <div class="form-group message">
                            <textarea class="form-control" rows="3" id="txtMessage" v-model="form.message" v-bind:placeholder="$t('about.contactUs.message')"></textarea>
                        </div>
                        <button type="button" class="btn btn-primary" v-bind:class="{ 'pull-right': lang != 'he', 'pull-left': lang == 'he' }" @click="send">{{$t('about.contactUs.send')}}</button>
                    </form>
                </div>
                <div class="col-md-6 address-wrapper">
                    <div class="info-item center-block clearfix">
                        <div class="info-item-icon map"></div>
                        <div class="info-item-data">
                            <h5>{{ $t('about.shopInfo.addressTitle') }}</h5>
                            <p>{{ $t('about.shopInfo.address') }}</p>
                        </div>
                    </div>
                    <div class="info-item center-block clearfix">
                        <div class="info-item-icon phone"></div>
                        <div class="info-item-data">
                            <h5>{{ $t('about.shopInfo.phone') }}</h5>
                            <p>03-5042253</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <h3 class="page-title"><span>{{$t('about.mapTitle')}}</span></h3>
        </div>
        <div>
            <iframe v-bind:src="mapUrl" width="100%" frameborder="0" style="border:0"></iframe>
        </div>

        <modal ref="msgError" :message="$t('about.contactUs.validation.alertClose')" :is-footer="true"></modal>
    </div>
</template>

<script>
    import Modal from '@/components/Modal.vue';

    export default {
        name: 'about',
        components: { Modal },
        data () {
            return {
                form: {
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    subject: ''
                }
            }
        },
        mounted () {
            
        },
        methods: {
            send () {
                let vm = this;
                this.$http.post('api/sendmail', this.form).then(response => {
                    let data = response.data;
                    if(data.success === true) {
                        // Reset form
                        for (var field in this.form) {
                            this.form[field] = '';
                        }
                    } else if(data.errors.length > 0) {
                        this.$refs.msgError.open();
                        //this.showErrors(data.errors);
                        /*
                        let $_ul = $('#msgBox .modal-body ul');
                        $_ul.empty();
                        let messages = [];
                        data.errors.forEach(function(error) {
                            $_ul.append('<li>' + vm.$t('about.contactUs.validation.' + error) + '</li>');
                            messages.push(vm.$t('about.contactUs.validation.' + error));
                        });
                        $('#msgBox').modal('show');
                        //alert(messages.join('\n'));
                        */
                    } else {
                        // General send mail error
                        this.showErrors(['There was an error. Please try again later']);
                    }
                }, response => {
                    this.showErrors(['There was an error. Please try again later']);
                });
            },
            showErrors (message, errors) {
                let vm = this;
                let $_ul = $('#msgBox .modal-body ul');
                $_ul.empty();

                errors.forEach(function(error) {
                    $_ul.append('<li>' + vm.$t('about.contactUs.validation.' + error) + '</li>');
                });

                $('#msgBox').modal('show');
            }
        },
        computed: {
            lang: function () {
                return this.$i18n.locale();
            },
            mapUrl: function () {
                return this.$config.StoreMapUrl + this.lang;
            }
        }
    }
</script>

<style>
.about-page h3.page-title {
    margin: 70px 0 50px;
    color:#0096DB;
}
.about-page form .subject {
    display: none;
}
.about-page .contact-us-container {
    background-image: url(/static/images/about-bg.jpg);
    background-position: 50% 70%;
    background-repeat: no-repeat;
    background-size: 100% auto; 
    padding: 0;
}

@media (max-width: 768px) {
    .about-page .contact-us-container {
        background-image: url(/static/images/about-bg-splited-vertical.jpg);
        background-position: 50% 50%;
        background-size: auto; 
    }

    .about-page .contact-us-container .container {
        padding: 0;
    }
}

@media (min-width: 768px) {
    .about-page .contact-us-container {
        background-image: url(/static/images/about-bg-splited-vertical.jpg);
        background-position: 50% 50%;
        background-size: 100% auto; 
    }

    .about-page .contact-us-container .container {
        padding: 0;
    }
}

@media (min-width: 992px) {
    .about-page .contact-us-container {
        background-image: url(/static/images/about-bg-splited.jpg);
        background-position: 50% 70%;
        background-size: 100% auto; 
    }

    .about-page .contact-us-container .container {
        padding: 0 15px;
    }
}

.about-page .contact-us-wrapper {
    padding: 30px 40px 40px;
    /* background-color: rgba(0, 0, 0, 0.6); */
    height: 420px;
}
    .about-page .contact-us-wrapper textarea {
        resize: none;
    }
.about-page .address-wrapper {
    /* background-color: rgba(0, 0, 0, 0.4); */
    padding-top: 100px;
    height: 420px;
}

.about-page .address-wrapper .info-item {
    margin: 0 15%;
    display: flex;
}
.about-page .address-wrapper .info-item:first-child {
    margin-bottom: 20px;
}

.about-page .address-wrapper .info-item .info-item-icon {
    background-color: #0096DB;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 40%;
    width: 100px;
    height: 100px;
    text-align: center;
}
    .about-page .address-wrapper .info-item .info-item-icon.map {
        background-image: url('/static/images/address_ico.png');
    }
    .about-page .address-wrapper .info-item .info-item-icon.phone {
        background-image: url('/static/images/callUs_ico.png');
    }

.about-page .address-wrapper .info-item .info-item-data {
    background-color: #fff;
    height: 100px;
    text-align: center;
    padding-top: 26px;
    flex-grow: 1;
}

.about-page .address-wrapper .info-item .info-item-data h5 {
    margin: 0 0 5px;
    padding: 0;
    color: #0096DB;
    font-size: 1.5em;
    font-weight: 400;
    text-transform: uppercase;
}
.about-page .address-wrapper .info-item .info-item-data p {
    margin: 0;
    padding: 0;
    font-size: 1em;
    font-weight: 400;
}

.about-page h4 { 
    font-size: 1.75em;
    font-weight: 400;
    text-align: center; 
    margin: 10px 0 40px;
    color: #fff;
    position: relative;
}
</style>