<template>
    <div class="about-page">
        <div class="contact-us-container">
            <div class="container">
                <div class="col-md-6 contact-us-wrapper">
                    <h4>
                        <i></i>
                        <span>{{$t('about.contactUs.title')}}</span>
                        <i></i>
                    </h4>
                    <form>
                        <div class="form-group subject">
                            <input type="text" class="form-control" id="txtSubject" v-model="form.subject">
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="txtName" v-model.trim="form.name" v-bind:placeholder="$t('about.contactUs.name')">
                        </div>
                        <div class="form-group phone">
                            <input type="tel" class="form-control" id="txtPhone" v-model.trim="form.phone" v-bind:placeholder="$t('about.contactUs.phone')">
                        </div>
                        <div class="form-group email">
                            <input type="email" class="form-control" id="txtEmail" v-model.trim="form.email" v-bind:placeholder="$t('about.contactUs.email')">
                        </div>
                        <div class="form-group message">
                            <textarea class="form-control" rows="3" id="txtMessage" v-model.trim="form.message" v-bind:placeholder="$t('about.contactUs.message')"></textarea>
                        </div>
                        <span class="mandatory">{{ $t('about.contactUs.mandatory') }}</span>
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
                     <div class="info-item center-block clearfix">
                        <div class="info-item-icon hours"></div>
                        <div class="info-item-data hours">
                            <h5>{{ $t('about.shopInfo.hoursTitle') }}</h5>
                            <p v-html="$t('about.shopInfo.hours')"></p>
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

        <modal ref="msgBox" :type="msgBox.type" :title="msgBox.title" :show-as-list="msgBox.showAsList" :header="msgBox.header" :footer="msgBox.footer" :messages="msgBox.messages" :is-header-close="false" :is-footer="true"></modal>
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
                },
                msgBox: {
                    type: "error",
                    messages: [],
                    title: "",
                    header: "",
                    footer: "",
                    showAsList: false
                },
                isSending: false
            }
        },
        mounted () {
            
        },
        methods: {
            send () {
                if(this.isSending) {
                    return;
                }

                this.isSending = true;

                if(!this.validateForm()) {
                    this.isSending = false;
                    return;
                }

                let vm = this;
                this.$http.post('api/sendmail', this.form).then(response => {
                    let data = response.data;
                    if(data.success === true) {
                        // Reset form
                        for (var field in this.form) {
                            this.form[field] = '';
                        }
                        // Send analytics event
                        this.$ga.event({
                            eventCategory: 'ContactUs',
                            eventAction: 'sendform',
                            eventLabel: 'success',
                            eventValue: 1
                        });
                        this.showSuccess();
                    } else if(data.errors.length > 0) {
                        let errors = [];
                        data.errors.forEach(function(error) {
                            errors.push(vm.$t('about.contactUs.validation.' + error));
                        });

                        // Send analytics event
                        this.$ga.event({
                            eventCategory: 'ContactUs',
                            eventAction: 'sendform',
                            eventLabel: 'success',
                            eventValue: 0
                        });

                        vm.showErrors(vm.$t('about.contactUs.validation.header'), vm.$t('about.contactUs.validation.footer'), errors, true);
                    } else {
                        // General send mail error
                        this.showErrors('', '', [vm.$t('about.contactUs.generalError')], false);
                    }

                    this.isSending = false;
                }, response => {
                    this.showErrors('','', [vm.$t('about.contactUs.generalError')], false);
                    this.isSending = false;
                });
            },
            showErrors (header, footer, errors, showAsList) {
                this.msgBox.type = 'error';
                this.msgBox.title = this.$t('about.contactUs.validation.alertTitle');
                this.msgBox.header = header;
                this.msgBox.footer = footer;
                this.msgBox.messages = errors;
                this.msgBox.showAsList = showAsList;
                this.$refs.msgBox.open();
            },
            showSuccess () {
                this.msgBox.type = 'success';
                this.msgBox.title = this.$t('about.contactUs.successTitle');
                this.msgBox.header = '';
                this.msgBox.footer = '';
                this.msgBox.messages = [this.$t('about.contactUs.successMessage')];
                this.msgBox.showAsList = false;
                this.$refs.msgBox.open();
            },
            validateForm () {
                let errors = [];
                if(this.form.name == '')
                    errors.push(this.$t('about.contactUs.validation.name_empty'));
                if(this.form.phone == '')
                    errors.push(this.$t('about.contactUs.validation.phone_empty'));
                if(this.form.email == '')
                    errors.push(this.$t('about.contactUs.validation.email_empty'));
                if(this.form.message == '')
                    errors.push(this.$t('about.contactUs.validation.message_empty'));

                if(errors.length > 0) {
                    this.showErrors(this.$t('about.contactUs.validation.header'), this.$t('about.contactUs.validation.footer'), errors, true);
                    return false;
                }

                return true;
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
    padding-top: 50px;
    height: 420px;
}

.about-page .address-wrapper .info-item {
    margin: 0 15%;
    display: flex;
    margin-top: 20px;
}
.about-page .address-wrapper .info-item:first-child {
    margin-top: 0;
}

.about-page .address-wrapper .info-item .info-item-icon {
    background-color: #0096DB;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    width: 90px;
    height: 90px;
    text-align: center;
}
    .about-page .address-wrapper .info-item .info-item-icon.map {
        background-image: url('/static/images/about-address.png');
    }
    .about-page .address-wrapper .info-item .info-item-icon.phone {
        background-image: url('/static/images/about-phone.png');
    }
    .about-page .address-wrapper .info-item .info-item-icon.hours {
        background-image: url('/static/images/about-hours.png');
    }

.about-page .address-wrapper .info-item .info-item-data {
    background-color: #fff;
    height: 90px;
    text-align: center;
    padding-top: 22px;
    flex-grow: 1;
}
    .about-page .address-wrapper .info-item .info-item-data.hours {
        padding-top: 12px;
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

.about-page .contact-us-wrapper h4 { 
    font-size: 1.75em;
    font-weight: 400;
    text-align: center; 
    margin: 10px 0 40px;
    color: #fff;
    display: flex;
    align-items: center;
}
    .about-page .contact-us-wrapper h4 i {
        display: block;
        flex: 1 1 auto;
        height: 1px;
        background-color: #a9a9a9;
    }
    .about-page .contact-us-wrapper h4 span {
        display: block;
        flex: 0 0 auto;
        margin: 0 40px;
    }

.about-page .contact-us-wrapper .mandatory {
    margin-top: 5px;
    margin-left: 5px;
    display: inline-block;
    color: #fff;
    font-weight: 300;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.75);
}
#site-wrapper.heb .about-page .contact-us-wrapper .mandatory {
    margin-left: 0;
    margin-right: 5px;
    text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.75);
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

@media (max-width: 540px) {
    .about-page h3.page-title {
        margin: 50px 0;
    }
    
    .about-page .contact-us-wrapper {
        padding: 15px 30px 40px;
    }

    .about-page .contact-us-wrapper h4 { 
        margin-bottom: 25px;
    }

    .about-page .contact-us-wrapper h4 span {
        margin: 0 25px;
    }
    
    .about-page .address-wrapper {
        padding-top: 50px;
        height: 405px;
    }

    .about-page .address-wrapper .info-item {
        margin: 0 3%;
        margin-top: 20px;
    }

    .about-page .address-wrapper .info-item .info-item-icon {
        width: 85px;
        height: 85px;
    }

    .about-page .address-wrapper .info-item .info-item-data {
        height: 85px;
        padding-top: 19px;
    }
        .about-page .address-wrapper .info-item .info-item-data.hours {
            padding-top: 10px;
        }

    .about-page .contact-us-wrapper .mandatory {
        margin-top: 0;
        margin-bottom: 13px;
    }
}

@media (max-width: 380px) {
    .about-page .address-wrapper {
        padding-top: 60px;
        height: 390px;
    }
    
    .about-page .address-wrapper .info-item .info-item-icon {
        width: 70px;
        height: 70px;
    }

    .about-page .address-wrapper .info-item .info-item-data {
        height: 70px;
        padding-top: 16px;
    }
        .about-page .address-wrapper .info-item .info-item-data.hours {
            padding-top: 8px;
        }

        .about-page .address-wrapper .info-item {
            margin: 0 3%;
            margin-top: 20px;
        }

    .about-page .address-wrapper .info-item .info-item-data h5 {
        margin: 0 0 3px;
        font-size: 1.4em;
    }
    .about-page .address-wrapper .info-item .info-item-data p {
        font-size: 0.9em;
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
</style>